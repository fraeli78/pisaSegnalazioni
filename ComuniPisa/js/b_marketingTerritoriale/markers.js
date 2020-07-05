// Creates a red marker with the coffee icon
// link => https://github.com/lvoogdt/Leaflet.awesome-markers

var redMarker =  L.AwesomeMarkers.icon({
  icon: 'coffee',
  markerColor: 'red',
  prefix: 'fa',
  iconColor: 'black'
});



//L.marker([43.66854,10.75242], {icon: L.AwesomeMarkers.icon({icon: 'spinner', prefix: 'fa', markerColor: 'red', spin:true}) }).addTo(map);
L.marker([43.64855,10.74895], {icon: L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'}) }).addTo(map);
L.marker([43.65755,10.75895], {icon: L.AwesomeMarkers.icon({icon: 'cog', prefix: 'fa', markerColor: 'purple', iconColor: 'black'}) }).addTo(map);
L.marker([43.66431,10.74068,], {icon: L.AwesomeMarkers.icon({icon: 'glass', prefix: 'fa', markerColor: 'green'}) }).addTo(map);
L.marker([43.67457,10.73725], {icon: L.AwesomeMarkers.icon({icon: 'shopping-cart', prefix: 'fa', markerColor: 'blue'}) }).addTo(map);
L.marker([43.67355,10.75895], {icon: L.AwesomeMarkers.icon({icon: 'info', prefix: 'fa', markerColor: 'orange'}) }).addTo(map);

L.marker([43.66776,10.70547], {icon: L.AwesomeMarkers.icon({icon: 'group', prefix: 'fa', markerColor: 'darkred'}) }).addTo(map);
L.marker([43.66776,10.70547], {icon: L.AwesomeMarkers.icon({icon: 'arrow-right', prefix: 'fa', markerColor: 'darkblue'}) }).addTo(map);
L.marker([43.68670,10.72620], {icon: L.AwesomeMarkers.icon({icon: 'twitter', prefix: 'fa', markerColor: 'cadetblue'}) }).addTo(map);
L.marker([43.65880,10.71849], {icon: L.AwesomeMarkers.icon({icon: 'phone', prefix: 'fa', markerColor: 'darkpurple'}) }).addTo(map);
L.marker([43.65421,10.74377], {icon: L.AwesomeMarkers.icon({icon: 'ambulance', prefix: 'fa', markerColor: 'darkgreen'}) }).addTo(map);
L.marker([43.65042,10.76990], {icon: L.AwesomeMarkers.icon({icon: 'medkit', prefix: 'fa', markerColor: 'darkblue'}) }).addTo(map);




var municipio = L.marker([43.668745, 10.760550], {icon: L.AwesomeMarkers.icon({icon: 'spinner', markerColor: 'red', prefix: 'fa', spin:true}) }).addTo(map);

var popupContent = "<b>Montopoli in Val D'Arno</b>";
//popupContent += '<br />';
//popupContent += "Montopoli in Val D'Arno";
popupContent += '<br />';
popupContent += '<img src= "../css/images/logoComuni/montopoli_municipio.jpg" width="132">';

//popupContent += '<b>Comment</b>: ';
//popupContent += '<i>if you like hops this place is for you!</i>';

municipio.bindPopup(popupContent).openPopup();

municipio.addTo(map);

