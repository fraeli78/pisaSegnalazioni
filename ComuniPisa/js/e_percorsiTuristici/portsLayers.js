
function style(feature) {
    return {
        radius: 2,
        weight: 1,
        opacity: 1,
        color: '#e31a1c',
//        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: '#e31a1c'
    };
}   


  L.geoJSON(ports, {
          style,
          pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, style);
          }
  }).addTo(map);

var group = L.featureGroup();
group.addTo(map);
//Finding all Markers in a Specified Distance of a Click
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    var clickedPoint = turf.point([lon, lat]);

    var buffer = turf.buffer(clickedPoint, 300); // default unit is kilometers
    group.clearLayers();
    L.geoJSON(buffer, {
        color: 'green', 
        weight: 1}).addTo(group);

    var withinBuffer = turf.pointsWithinPolygon(
        ports,
        buffer
    );

  L.geoJSON(withinBuffer, {
      pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
              color: 'red'
          });
      }
  }).addTo(group);
});


//Basemaps List
map.createPane('labels');

// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 650;

// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';

var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution
}).addTo(map);

var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    pane: 'labels'
}).addTo(map);



////Basemaps List
//var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//  maxZoom: 19,
//  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);
//
//var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//});
//
//var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
//  attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
//  minZoom: 1,
//  maxZoom: 19
//});
//var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//  maxZoom: 17,
//  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//});
//
//var basemaps = {
//  "OpenStreetMap Mapnik": OpenStreetMap_Mapnik,
//  "Wikimedia": Wikimedia,
//  "Esri WorldImagery": Esri_WorldImagery,
//  "OpenTopoMap": OpenTopoMap
//};
//
//var overlays = {
//// "external boundary": lajatico_mask,
//    "Countries": ne_110m_admin_0_countries
//};
//
////Legend
//L.control.layers(basemaps, overlays, {
//  collapsed: true
//}).addTo(map);
