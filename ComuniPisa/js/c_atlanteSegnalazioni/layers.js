
//Layer
//var montopoli = L.geoJSON(montopoli).addTo(map);


var masked = turf.mask(provincia);

var montopoli= L.geoJSON(provincia, {opacity: 1,
                   color: 'blue',
                   dashArray: '10, 12, 5',
                   fillColor: 'grey',
                   fillOpacity: 0.3,
                   weight: 2
                  }
         ).addTo(map);

//Basemaps List
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
  attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
  minZoom: 1,
  maxZoom: 19
});
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var basemaps = {
  "OpenStreetMap Mapnik": OpenStreetMap_Mapnik,
  "Wikimedia": Wikimedia,
  "Esri WorldImagery": Esri_WorldImagery,
  "OpenTopoMap": OpenTopoMap
};

var overlays = {
// "external boundary": lajatico_mask,
"Montopoli boundary": montopoli
};

//Legend
L.control.layers(basemaps, overlays, {
  collapsed: true
}).addTo(map);
