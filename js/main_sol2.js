// This Java-Script file contains the script which is responsible for 
// the functionalities and representations of the webmap.

//----------------------------------------
//--- Part 1: Adding a Basemap ----
//----------------------------------------

// L.map instantiates the webmap. The variable 'map' must match the DOM ID of the div element in the HTML document.
// Center and zoom define how the map is displayed when called.  

var map = L.map('map').setView([45.0719824, 7.6426023], 13);


// Basemaps are instantiated with L.tileLayer. Attributation is important to show where the basemap comes from.
// Minzoom and maxzoom are useful to set the minimum and maximum zoom level for the user.  

// Open Street map
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.tileLayer(osmUrl, {
	minZoom: 12, 
	maxZoom: 17, 
	attribution: osmAttrib
}).addTo(map);

//Watercolor basemap
var waterColorUrl = 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
var waterColorAttrib = '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
var Watercolor = L.tileLayer( waterColorUrl, {
	minZoom: 12,
	maxZoom: 17,
	attribution: waterColorAttrib
});

// Create an object with basemap layer names and their corresponding layers
var basemaps = {
    "OpenStreetMap": osm,
    "WaterColor": Watercolor
};



// Add geojson
// define icon styles


var icon9 = L.icon({
    iconUrl: 'css/Images/bus-stop-9.png',
    iconSize: [30,30],

});

var icon33 = L.icon({
    iconUrl: 'css/Images/bus-stop-33.png',
    iconSize: [30,30],

});

var icon9_33 = L.icon({
    iconUrl: 'css/Images/bus-stop-9-33.png',
    iconSize: [30,30],

});

// Create a GeoJSON layer and add it to the map


// without filter using different icons
var stop_turin = L.geoJSON(bus_stops, {
    pointToLayer: function (feature, latlng) {
        // Use the custom icon for each point based on routes
		if (feature.properties["bus lines"] === '9') {
			return L.marker(latlng, { icon: icon9 })
		} else if (feature.properties["bus lines"] === '33') {
			return L.marker(latlng, { icon: icon33 })
		} else {
			return L.marker(latlng, { icon: icon9_33 })
		};
    },
    onEachFeature: function (feature, layer) {
        // Add a popup displaying the properties of each point
        if (feature.properties) {
            layer.bindPopup(
                "<strong>Fermata:</strong> " + feature.properties.Name + "<br>" +
				"<strong>Indirizzo:</strong> " + feature.properties.Address + "<br>" +
                "<strong>Linea:</strong> " + feature.properties["bus lines"] 
            );
        }
    }
})
stop_turin.addTo(map);



var overlayMaps = {
    "fermate": stop_turin
};

// Add a control to switch between basemaps
L.control.layers(basemaps, overlayMaps).addTo(map);





L.control.scale().addTo(map);

        map.on('click', 
          function(e){
            var coord = e.latlng.toString().split(',');
            var lat = coord[0].split('(');
            var lng = coord[1].split(')');
            console.log("You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]);

          map.flyTo([lat[1], lng[0]], 16, {
            animate: true,
            duration: 2 // in seconds
          });

        });












