const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Security: Helmet (adds security headers)
app.use(helmet({
    contentSecurityPolicy: false // Leaflet and Socket.IO need this disabled
}));

// Security: Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: "Too many requests, please try again later."
});
app.use(limiter);

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'change-this-to-a-random-string-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Body parser for form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Socket.IO config
const server = http.createServer(app);
const io = socketio(server);

// EJS setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const ADMIN_PASSWORD_HASH = bcrypt.hashSync('SwiperNoSwiping!', 10);

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login - Dora's Map</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .login-container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                    width: 90%;
                    max-width: 400px;
                }
                h1 {
                    color: #667eea;
                    margin-bottom: 10px;
                    text-align: center;
                }
                p {
                    color: #666;
                    text-align: center;
                    margin-bottom: 30px;
                }
                input[type="password"] {
                    width: 100%;
                    padding: 15px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    margin-bottom: 20px;
                    transition: border-color 0.3s;
                }
                input[type="password"]:focus {
                    outline: none;
                    border-color: #667eea;
                }
                button {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                button:hover {
                    transform: translateY(-2px);
                }
                .error {
                    color: #e74c3c;
                    text-align: center;
                    margin-top: 15px;
                    display: ${req.query.error ? 'block' : 'none'};
                }
            </style>
        </head>
        <body>
            <div class="login-container">
                <h1>🗺️ Dora's Map</h1>
                <p>Enter password to access tracker</p>
                <form method="POST" action="/login">
                    <input type="password" name="password" placeholder="Password" required autofocus>
                    <button type="submit">🔓 Unlock Map</button>
                </form>
                <div class="error">❌ Incorrect password</div>
            </div>
        </body>
        </html>
    `);
});

app.post('/login', (req, res) => {
    if (bcrypt.compareSync(req.body.password, ADMIN_PASSWORD_HASH)) {
        req.session.authenticated = true;
        res.redirect('/');
    } else {
        res.redirect('/login?error=1');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Protected main route
app.get("/", requireAuth, (req, res) => {
    res.render("index");
});

// Socket.IO connection
io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        io.emit("receive-location", {id: socket.id, ...data });
    });
    console.log("User connected:", socket.id);

    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
        console.log("User disconnected:", socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
    console.log(`🗺️  Dora's Map is running on port ${PORT}`);
    console.log(`🔒 Login with password: dora123 (CHANGE THIS!)`);
});