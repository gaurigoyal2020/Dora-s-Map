const socket = io();
console.log("hey")

//navigator is our windows object
if(navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const {latitude, longitude } = position.coords;
        socket.emit("send-location", {latitude, longitude});
        },
        (error) => {
            // Only alert if user denied permission (important to know)
            if (error.code === error.PERMISSION_DENIED) {
                alert("Location access denied. Please enable location services.");
            } else {
                console.log("Location error:", error.message);
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 5000, //after how long will the coordinaes should renew
            maximumAge: 0, //with this our tracker won't cache
        }
    );
}

//We are asking for location, setting coordinaes to [0,0], zoom = 10 {1-15}
const map = L.map("map").setView([0,0], 15); //L.map returns a map and setView are view proerties of the map

//tileLayer gives us the tiles in the map; s, z, x, y are dynmic variables; the url below is fixed
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {attribution: "Haru"}).addTo(map);

const markers = {};

socket.on("receive-location", (data)=> {
    const {id, latitude, longitude} = data;
    map.setView( [latitude, longitude]);
    if(markers[id]) /*If marker of Id already exists, put it in new loc*/ {
        markers[id].setLatLng( [latitude, longitude]); 
    }
    else {
        markers[id] = L.marker([latitude, longitude])
            .bindPopup(`Device: ${id.substring(0, 8)}`)  // Shows device ID on click
            .addTo(map);
    }
});

//to remove the marker if we disconnect
socket.on("user-disconnected", (id) => {
    if(markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
    