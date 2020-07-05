// Creates a red marker with the coffee icon
// link => https://github.com/lvoogdt/Leaflet.awesome-markers

var redMarker =  L.AwesomeMarkers.icon({
  icon: 'coffee',
  markerColor: 'red',
  prefix: 'fa',
  iconColor: 'black'
});


L.marker([43.69191,10.74320], {icon: redMarker}).addTo(map);


// Font-Awesome markers
L.marker([43.66854,10.75242], {icon: L.AwesomeMarkers.icon({icon: 'spinner', markerColor: 'red', prefix: 'fa', spin:true}) }).addTo(map);
L.marker([43.64855,10.74895], {icon: L.AwesomeMarkers.icon({icon: 'coffee', markerColor: 'orange', prefix: 'fa', iconColor: 'black'}) }).addTo(map);
L.marker([43.64855,10.74895], {icon: L.AwesomeMarkers.icon({icon: 'cog',  prefix: 'fa', markerColor: 'purple', iconColor: '#6b1d5c' }) }).addTo(map);

// Glyphicons
L.marker([43.66776,10.70547], {icon: L.AwesomeMarkers.icon({icon: 'star',  prefix: 'glyphicon',markerColor: 'green'}) }).addTo(map);
L.marker([43.66776,10.70547], {icon: L.AwesomeMarkers.icon({icon: 'certificate', prefix: 'glyphicon', markerColor: 'blue'}) }).addTo(map);
L.marker([43.68670,10.72620], {icon: L.AwesomeMarkers.icon({icon: 'cog',  prefix: 'glyphicon', markerColor: 'cadetblue'}) }).addTo(map);
