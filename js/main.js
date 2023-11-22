// This Java-Script file contains the script which is responsible for 
// the functionalities and representations of the webmap.

//----------------------------------------
//--- Part 1: Adding a Basemap ----
//----------------------------------------

// L.map instantiates the webmap. The variable 'map' must match the DOM ID of the div element in the HTML document.
// Center and zoom define how the map is displayed when called.  

var map = L.map('map').setView([45.0719824, 7.6426023], 12);


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

//Watercolor basemap (see: https://leaflet-extras.github.io/leaflet-providers/preview/)
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

// Create an object with basemap layer names and their corresponding layers
var basemaps = {
    "OpenStreetMap": osm,
    "Carto Dark": CartoDB_DarkMatter
};

// Set filter and style on data
function strade_senza_alberi(feature) {
  if (feature.properties.Green === "#D7D7D7") return true
};

var no_alberi = {
    "color": "#D7D7D7",
    "weight": 2,
    "opacity": 0.65
};

function strade_con_alberi(feature) {
  if (feature.properties.Green === "#21C12F") return true
};

var alberi = {
    "color": "#21C12F",
    "weight": 4,
    "opacity": 0.90
};

// Add geojson layer and add it to the map


var classificazione_binaria_verdi = L.geoJSON(binaria, {
	filter: strade_con_alberi, 
	style: alberi
	});
	
var classificazione_binaria_no_verdi = L.geoJSON(binaria, {
	filter: strade_senza_alberi,
	style: no_alberi
	});

classificazione_binaria_no_verdi.addTo(map);
classificazione_binaria_verdi.addTo(map);


var overlayMaps = {
    "strade verdi": classificazione_binaria_verdi,
	"strade non verdi": classificazione_binaria_no_verdi
};

// Add a control to switch between basemaps
L.control.layers(basemaps, overlayMaps).addTo(map);














