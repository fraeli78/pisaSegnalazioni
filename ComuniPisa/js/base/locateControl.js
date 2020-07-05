// leaflet-locatecontrol
// https://github.com/domoritz/leaflet-locatecontrol


// add location control to global name space for testing only
// on a production site, omit the "lc = "!
lc = L.control.locate({
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);
