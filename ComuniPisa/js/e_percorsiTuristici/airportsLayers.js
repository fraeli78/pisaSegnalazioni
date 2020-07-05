
// get color depending on population density value
function getColor(d) {
    return d > 20 ? '#238b45' :
           d > 10  ? '#fd8d3c' :
           d > 0  ? '#e31a1c' :          
            '#df65b0' ;
}

// get radius depending on population density value
function getRadius(r) {
    return r > 20 ? 12 :
           r > 10  ? 6 :
           r > 0  ? 2 :          
            100 ;
}

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

function assignPopup(feature, layer) {
    var name = feature.properties.name;
    layer.bindPopup(name);
}
var ne_10m_airports =
      new L.GeoJSON.AJAX("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson", {
          //Filtering a GeoJSON According to Attributes
          filter: function(feature) {
                if (feature.properties.natlscale === 150) {
                    return true;
                }},
          style,
          pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, style);
          },
          onEachFeature: assignPopup
      }).addTo(map);
///////////////////////////////////////////////////////////////////
//How to match marker and polyline on drag and drop
//https://stackoverflow.com/questions/33513404/leaflet-how-to-match-marker-and-polyline-on-drag-and-drop
//https://codeday.me/en/qa/20190308/3486.html
//Given the following L.Latlng‘s, L.Marker‘s and L.Polyline:
var a = L.latLng(45.486, -122.678);
var b = L.latLng(25.781, -80.223);

var point1 = turf.point([a.lng, a.lat]);
var point2 = turf.point([b.lng, b.lat]);
    
var marker_a = L.marker(a, {draggable: true}).addTo(map);
var marker_b = L.marker(b, {draggable: true}).addTo(map);
    
var polyline = L.polyline([a, b], {
    dashArray: '10, 10',
    color: 'white'
}).addTo(map);


//Lines Versus Great Circles
var gc = turf.greatCircle(
    point1,
    point2
);

var greatCircle = L.geoJSON(gc).addTo(map);

//This uses the Haversine formula to account for global curvature.
//https://turfjs.org/docs/#distance
var distanceCurvature = turf.distance(
    [45.486, -122.678], 
    [25.781, -80.223], 
    {units: 'kilometers'}
).toFixed(2);
//Takes a GeoJSON and measures its length in the specified units.
//https://turfjs.org/docs/#length
var length = turf.length(gc).toFixed(2);

///////Come mai torna diverso???????????????????????
//var distance = turf.distance(
//    [a.lng, a.lat], 
//    [b.lng, b.lat], 
//    {units: 'kilometers'}
//).toFixed(2);
var aLat = polyline.getLatLngs()[0].lat;
var aLon = polyline.getLatLngs()[0].lng;
var bLat = polyline.getLatLngs()[1].lat;
var bLon = polyline.getLatLngs()[1].lng;

addToTextBox(aLat, aLon, bLat, bLon, length, distanceCurvature);

function addToTextBox(aLat, aLon, bLat, bLon, length, distanceCurvature){
    document.getElementById('aLat').innerHTML = aLat;
    document.getElementById('aLon').innerHTML = aLon;
    document.getElementById('bLat').innerHTML = bLat;
    document.getElementById('bLon').innerHTML = bLon;
    document.getElementById('length').innerHTML = length;
    document.getElementById('distanceCurvature').innerHTML = distanceCurvature;
}


// eventlisteners 
marker_a
    .on('dragstart', dragStartHandler)
    .on('drag', dragHandler)
    .on('dragend', dragEndHandler);

marker_b
    .on('dragstart', dragStartHandler)
    .on('drag', dragHandler)
    .on('dragend', dragEndHandler);




//Now on dragstart you’ll need to find the latlng from the polyline which corresponds with your marker’s latlng and store it’s key in your marker instance so you can use it later on:

function dragStartHandler (e) {
    // Get the polyline's latlngs
    var latlngs = polyline.getLatLngs();
        // Get the marker's start latlng
    var latlng = this.getLatLng();

    // Iterate the polyline's latlngs
    for (var i = 0; i < latlngs.length; i++) {
        // Compare each to the marker's latlng
        if (latlng.equals(latlngs[i])) {
            // If equals store key in marker instance
            this.polylineLatlng = i;
        }
    }
}
//Now you know the key of the polyline’s latlng you can change it when dragging the marker on the dragevent:
function dragHandler (e) {
    // Get the polyline's latlngs
    var latlngs = polyline.getLatLngs();
        // Get the marker's current latlng
    var latlng = this.getLatLng();
        var lat = latlng.lat;
        var lon = latlng.lng;
   addToTextBox(lat,lon);
    // Replace the old latlng with the new
    latlngs.splice(this.polylineLatlng, 1, latlng);
//    console.log(latlngs.splice(this.polylineLatlng, 1, latlng)[0].lat);
    // Update the polyline with the new latlngs
    polyline.setLatLngs(latlngs);
//    console.log(polyline.setLatLngs(latlngs)._latlngs[0]);
//    gc.removeFrom(map);
    var gc = turf.greatCircle(
        [polyline.setLatLngs(latlngs)._latlngs[0].lng, 
         polyline.setLatLngs(latlngs)._latlngs[0].lat],
        [polyline.setLatLngs(latlngs)._latlngs[1].lng, 
         polyline.setLatLngs(latlngs)._latlngs[1].lat]
    );
    greatCircle.clearLayers();
    greatCircle = L.geoJSON(gc).addTo(map);
//    console.log(filippo);
    
//    var length = turf.length(line);
//    console.log('The length of the line is:', length);
}

//Just to be clean and tidy remove the stored key on dragend:
function dragEndHandler (e) {
    // Delete key from marker instance
    delete this.polylineLatlng;
}



//var distance = turf.distance(point1, point2, {units: 'kilometers'}).toFixed(2);
//console.log('The distance between the two points is', distance, 'kilometers.');
//var length = turf.length(lineTurf);
//console.log('The length of the line is:', length.toFixed(2));


////////////////////////////////////////////////
//var marker1 = L.marker([45.486, -122.678], {
//    draggable:true
//});
//var marker2 = L.marker([25.781, -80.223], {
//    draggable:true
//});
//
//function addToTextBox(lt,ln){
//    document.getElementById('lat').innerHTML = lt;
//    document.getElementById('lng').innerHTML = ln;
//    
//}
//marker1.on('dragend', function(event){
    //alert('drag ended');
//    var marker = event.target;
//    var location = marker.getLatLng();
//    var lat = location.lat;
//    var lon = location.lng;
//    addToTextBox(lat,lon);
    //alert(lat);
    //retrieved the position
//  });
//marker1.addTo(map);
//
//marker2.on('dragend', function(event){
    //alert('drag ended');
//    var marker = event.target;
//    var location = marker.getLatLng();
//    var lat = location.lat;
//    var lon = location.lng;
//    addToTextBox(lat,lon);
//    alert(lat);
//    retrieved the position
//  });
//marker2.addTo(map);
//
//var point1 = turf.point([45.486, -122.678]);
//var point2 = turf.point([25.781, -80.223]);
//var lineTurf = turf.lineString([
//  [-122.678, 45.486],
//  [-80.22354, 25.781]
//]);

//var gc = turf.greatCircle(
//  [-122.678, 45.486],
//  [-80.22354, 25.781]
//);

//L.geoJSON(polyline, {dashArray: '10, 10'}).addTo(map);
//L.geoJSON(gc).addTo(map);

//var distance = turf.distance(point1, point2, {units: 'kilometers'}).toFixed(2);
//console.log('The distance between the two points is', distance, 'kilometers.');
//var length = turf.length(lineTurf);
//console.log('The length of the line is:', length.toFixed(2));

//select two markers & draw line between them in leaflet
//https://gis.stackexchange.com/questions/53394/select-two-markers-draw-line-between-them-in-leaflet
//var latlngs = [];
//Get latlng from first marker
//latlngs.push(marker1.getLatLng());
//Get latlng from first marker
//latlngs.push(marker2.getLatLng());
//From documentation http://leafletjs.com/reference.html#polyline
// create a red polyline from an arrays of LatLng points
//var polyline = L.polyline(latlngs, {
//    color: 'red', 
//    dashArray: '10, 10'
//}).addTo(map);
//var gc = turf.greatCircle(
//  [-122.678, 45.486],
//  [-80.22354, 25.781]
//);
//L.geoJSON(gc).addTo(map);

//How to store e.latlng into array : leaflet
//https://stackoverflow.com/questions/32564673/how-to-store-e-latlng-into-array-leaflet
////////////////////////////////////////////////
//Leaflet - draggable marker and coordinates display in a field form
//https://gis.stackexchange.com/questions/124285/leaflet-draggable-marker-and-coordinates-display-in-a-field-form





 
///////////////////////////////////////////////////////////////////
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
