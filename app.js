const express = require("express");
const http = require("http"); //we need http to use socketio
const socketio = require("socket.io");
const path = require("path");
const fileURLToPath = require("url");

const app = express();

//socketio config
const server = http.createServer(app);
const io = socketio(server);

//ejs setup
app.set("view engine", "ejs");
/*
View engines use template files (like .ejs) that 
contain HTML mixed with placeholders or special syntax.
These placeholders or syntax are used to insert dynamic
content into the HTML before it's sent to the client.
*/
app.use(express.static(path.join(__dirname, "public")));



io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        io.emit("receive-location", {id: socket.id, ...data })
    });
    console.log("Connected");

    socket.on("disconnected", function() {
        io.emit("user-disconneted", socket.id);
    })
});


app.get("/", (req, res) => {
    res.render("index") //see this line
});

const PORT = process.env.PORT || 8001
server.listen(PORT, () => {
    console.log("I see it! I see it!");
});
