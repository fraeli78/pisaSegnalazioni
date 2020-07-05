// Showing Mouse Coordinates on the Map
var div = document.createElement('div');
div.id = 'coordsDiv';
div.style.position = 'absolute';
div.style.bottom = '10px';
div.style.left = '10px';
div.style.padding = '10px';
div.style.border = '2px solid #c2bfba';
div.style.zIndex = '999';
div.style.background ='white';
document.getElementById('map').appendChild(div);

map.on('mousemove', function(e) {
    var lat = e.latlng.lat.toFixed(5);
    var lon = e.latlng.lng.toFixed(5);
    document.getElementById('coordsDiv').innerHTML = lat + ', ' + lon;
});
