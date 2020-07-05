// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h5>Residenti </h5>' 
        +  (props ?
            '<h5 style="color:yellow;" >' + props.COMUNE + ' - ' + props.Residenti + '</h5>' 
//                    + props.POP_EST + ' GDP per capita / mi<sup>2</sup>'
//            + '<h6>' +'gdp_md_est / pop_est * 1000000' +'</h6>'
            : 'passa il mouse sopra un Comune');
};

info.addTo(map);


// get color depending on population density value
function getColor(d) {
    return d > 30000  ? '#06d44b' :
           d > 15000  ? '#e39117' :
           d > 10000  ? '#f0ea51' : 
           d > 3000  ? '#1754e3' :  
            '#ff0000' ;
}

function style(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: '#000000',
        dashArray: '3',
        fillOpacity: 0.5,
        fillColor: getColor(feature.properties.Residenti)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

//geojson =
//    new L.GeoJSON.AJAX("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson", {
//        style: style,
//        onEachFeature: onEachFeature
//    }).addTo(map);

geojson = 
 L.geoJSON(comuniPisa, {
     style: style,
     onEachFeature: onEachFeature
 }).addTo(map);

map.attributionControl.addAttribution('Countries data &copy; <a href="https://www.naturalearthdata.com/downloads/10m-cultural-vectors/">Natural Earth</a>');


var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 3000, 10000, 15000, 30000],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        dollar = ''

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to  + dollar : '+'));
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
//    "Countries": ne_110m_admin_0_countries
//};
//
////Legend
//L.control.layers(basemaps, overlays, {
//  collapsed: true
//}).addTo(map);
