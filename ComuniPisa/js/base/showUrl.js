//See URL constantly update "Lat","Lon" and "Zoom"
  function updateUrl() {

    var center = map.getCenter();
    var lat = center.lat.toFixed(5);
    var lon = center.lng.toFixed(5);

    var zoom = map.getZoom();

    var view = lat + ',' + lon + ',' + zoom;

    document.location.hash = view;

  }
  map.on('move', updateUrl);
  map.on('zoom', updateUrl);
