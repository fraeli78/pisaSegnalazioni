
//Layer
//var style = {
//    radius: 5,
//    fillColor: "red",
//    color: "green",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};

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
        radius: getRadius(feature.properties.POP_MAX/1000000),
        weight: 1,
        opacity: 1,
        color: getRadius(feature.properties.POP_MAX/1000000),
//        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.POP_MAX/1000000)
    };
}


var ne_110m_populated_places =
    new L.GeoJSON.AJAX("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_populated_places.geojson", {
        style,
        pointToLayer: function(feature, latlng) {
            var pop_max = feature.properties.POP_MAX/1000000;
            var rating = feature.properties.RANK_MAX;
//            if (rating < 5) {
//                style.fillColor = 'red';
//                style.radius = 5;
//            } else {
//                style.fillColor = 'black';
//            }
            return L.circleMarker(latlng, style);
        },
        onEachFeature: function (feature, layer) {

          layer.on('mouseover', function () {
              this.bindPopup(
                  feature.properties.NAME
              ).openPopup();
          });
          layer.on('mouseout', function () {
//              ne_110m_populated_places.resetStyle(this);
              this.closePopup();
          });
        //                  layer.on({
        //                      click: zoomToClickedPolygon
        //                  });
          layer.on('click', function (e) {
              var feature = e.target.feature,
                  props = feature.properties,
                  attrs = Object.keys(props),
                  attribute, value;
            $('#sidebar-content').html("");
               for (var i = 0; i < attrs.length; i += 1) {
                   attribute = attrs[i];
                   value = props[attribute];
                // use the value to do something...
        //                          console.log(value);
                   if (i==0) {
                       var wikipedia = "https://en.wikipedia.org/wiki/";
                       var name = feature.properties.name;
                       var link = wikipedia.concat(name);
                       $('#sidebar-title').html(feature.properties.NAME);
                   }
                   $('#sidebar-content').append('<b>'+attribute+'</b>' +": "+ value + "<br>");
                   i++;
               }
              sidebar.open(panelID);
          });

          layer.bindPopup(
             '<h4>' + feature.properties.NAME +'</h4>'
          );
        }
    }).addTo(map);
panelID = 'home'


var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        dollar = ' Millions'

        labels.push(
//            '<i style="background:' + getColor(from + 1) + "radius:' + getRadius(from + 1) + '></i> ' +
//            '<i style="radius:' + getRadius(from + 1) + '"></i> ' +
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to  + dollar : '+ Millions'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);



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
