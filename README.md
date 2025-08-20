# 🗺️ Dora's Map

<img width="1915" height="933" alt="image" src="https://github.com/user-attachments/assets/e366936c-63ed-4e37-a3c6-79cb99d68edd" />


https://github.com/user-attachments/assets/d040e6f1-143e-4bd1-8ace-48374aca8033



A **Proof of Concept** real-time device tracker website to easily monitor, manage, and locate devices anywhere in the world. Built with security in mind to minimize the risk of loss or theft.

*Just like Dora the Explorer's Map, but for your devices!* 🎒



## ✨ Features

- **Real-time Location Tracking**: Live updates of device locations using GPS
- **Multi-device Support**: Track multiple devices simultaneously on a single map
- **Interactive Map Interface**: Powered by Leaflet.js with OpenStreetMap tiles
- **WebSocket Communication**: Instant location updates via Socket.IO
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **High Accuracy Tracking**: Utilizes device GPS for precise location data
- **Auto-disconnect Handling**: Automatic cleanup when devices go offline

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with geolocation support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doras-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm run start
   ```

4. **Open your browser**
   Navigate to `http://localhost:8001`

5. **Allow location access**
   Grant permission when prompted to enable device tracking

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Frontend**: Vanilla JavaScript, EJS templating
- **Mapping**: Leaflet.js with OpenStreetMap
- **Styling**: Pure CSS

## 📁 Project Structure

```
doras-map/
├── app.js                 # Main server file
├── package.json          # Dependencies and scripts
├── public/               # Static assets
│   ├── CSS/
│   │   └── style.css    # Styling
│   └── JavaScript/
│       └── script.js    # Client-side logic
├── views/
│   └── index.ejs        # Main template
└── README.md           # This file
```

## 🔧 Configuration

### Environment Variables

- `PORT`: Server port (default: 8001)

### Geolocation Settings

The app uses the following geolocation options:
- **enableHighAccuracy**: `true` - Uses GPS for better precision
- **timeout**: `5000ms` - Location request timeout
- **maximumAge**: `0` - Prevents caching for real-time updates

## 🌐 API Events

### Client → Server
- `send-location`: Broadcasts device location data

### Server → Client
- `receive-location`: Receives location updates for all connected devices
- `user-disconnected`: Notifies when a device goes offline

## 🔒 Security Considerations

- Location data is transmitted in real-time but not permanently stored
- Each device is identified by a unique socket ID
- Consider implementing authentication for production use
- HTTPS recommended for secure location transmission

## 📱 Usage

1. **Open the application** in your web browser
2. **Grant location permissions** when prompted
3. **View your location** on the interactive map
4. **Share the URL** with other devices to track multiple locations
5. **Monitor in real-time** as devices move around

## 🚨 Browser Compatibility

- Chrome 5+
- Firefox 3.5+
- Safari 5+
- Edge 12+
- Mobile browsers with geolocation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Todo / Future Enhancements

- [ ] User authentication system
- [ ] Location history and tracking logs
- [ ] Geofencing and alerts
- [ ] Device naming and management
- [ ] Mobile app development
- [ ] Database integration for persistent storage
- [ ] Admin dashboard
- [ ] Location sharing controls

## ⚠️ Disclaimer

This is a **Proof of Concept** application. For production use, consider:
- Implementing proper authentication
- Adding data encryption
- Following privacy regulations (GDPR, CCPA)
- Adding rate limiting and security headers
- Using HTTPS in production

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Inspiration

Named after Dora the Explorer's trusty map that helps find anything, anywhere! Just like how Dora's map would unfold and show the path, this application helps you keep track of your devices no matter where they wander.

---

**Made with ❤️ for device security and peace of mind**

*"I'm the map, I'm the map, I'm the map!"* 🗺️
