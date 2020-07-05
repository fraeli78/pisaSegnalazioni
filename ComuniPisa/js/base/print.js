//leaflet-easyPrint
//https://github.com/rowanwins/leaflet-easyPrint
var printer = L.easyPrint({
      tileLayer: positron,
      sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
      filename: 'myMap',
      exportOnly: false,
      hideControlContainer: true
}).addTo(map);

function manualPrint () {
  printer.printMap('CurrentSize', 'MyManualPrint')
}
