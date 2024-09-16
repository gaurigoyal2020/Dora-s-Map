const socket = io();
console.log("hey")

//navigator is our windows object
if(navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const {latitude, longitude } = position.coords;
        socket.emit("send-location", {latitude, longitude});
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000, //after how long will the coordinaes should renew
            maximumAge: 0, //with this our tracker won't cache
        }
    );
}

//We are asking for location, setting coordinaes to [0,0], zoom = 10 {1-15}
const map = L.map("map").setView([0,0], 10); //L.map returns a map and setView are view proerties of the map

//tileLayer gives us the tiles in the map; s, z, x, y are dynmic variables; the url below is fixed
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {attribution: "Haru"}).addTo(map);

const markers = {};

socket.on("receive-location", (data)=> {
    const {id, latitude, longitude} = data;
    map.setView( [latitude, longitude]);
    if(markers[id]) {
        markers[id].setLatLng( [latitude, longitude]); 
    }
    else {
        markers[id] = L.marker([latitude, longitude]).addTo(map); //we are using leaflet to create a markerand usko locatio deni hoti hai

    }
});

//to remove the marker if we disconnect
socket.on("user-disconnected", (id) => {
    if(markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
    
