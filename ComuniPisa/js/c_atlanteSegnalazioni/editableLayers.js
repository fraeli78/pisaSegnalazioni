// => EditableLayers
// Link => https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
// Link => http://www.d3noob.org/2014/01/using-leafletdraw-plugin-for-leafletjs.html

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

map.on('draw:created', function(e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === 'marker') {
    layer.bindPopup('A popup!');
  }

  editableLayers.addLayer(layer);
});
