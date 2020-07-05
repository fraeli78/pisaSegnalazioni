


//Layer
// radom colors
function style(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.3,
        fillColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    };
};


var comuniPisa = 
        L.geoJSON(comuniPisa, {
            style,
            onEachFeature: function (feature, layer) {

          layer.on('mouseover', function () {
              this.setStyle({
                  color: 'red',
                  fillColor: '#4bb762',
                  weight: 1
              });
              this.bringToFront();
              this.bindPopup(
                  feature.properties.COMUNE
              ).openPopup();
          });
          layer.on('mouseout', function () {
              comuniPisa.resetStyle(this);
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
                                  console.log(value);
                   if (i==0) {
                       var wikipedia = "https://en.wikipedia.org/wiki/";
                       var name = feature.properties.COMUNE;
                       var link = wikipedia.concat(name);
                       $('#sidebar-title').html(feature.properties.COMUNE + " - " + '<a style="color: #ffffff" target="_blank" href=' + link +'>Wikipedia</a>');
                   }
                   $('#sidebar-content').append('<b>'+attribute+'</b>' +": "+ value + "<br>");
                   i++;
               }
              sidebar.open(panelID);
          });

          layer.bindPopup(
             '<h4>' + feature.properties.COMUNE +'</h4>'
          );
        }
        }).addTo(map);



panelID = 'home'


//Basemaps List
map.createPane('labels');

// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 650;

// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';

var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution
}).addTo(map);

var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
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
//    "Countries": comuniPisa
//};
//
////Legend
//L.control.layers(basemaps, overlays, {
//  collapsed: true
//}).addTo(map);
