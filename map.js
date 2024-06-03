require([
    "esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Home",
    "esri/widgets/LayerList",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Directions",
    "esri/layers/RouteLayer"
], function(
    esriConfig,
    WebMap,
    MapView,
    Home,
    LayerList,
    BasemapGallery,
    Directions,
    RouteLayer
) {
    esriConfig.apiKey = "AAPK77ebc8a134de4074a160da0e32d0d877onv_cK6xV7_3fD5hbgt8oYIPGcwHVf3SZVZkhweY7eONVEXqwdhRAkgphMmXCg9x";
    
    const routeLayer = new RouteLayer();

    const webmap = new WebMap({
        portalItem: {
            id: "da597a65c23a48c58d3278c1d8bf78e5"
        },
        basemap: "topo-vector"
    });
    
    webmap.layers.add(routeLayer);
    
    const view = new MapView({
        container: "viewDiv",
        map: webmap,
        ui: {
            components: ["zoom", "compass", "attribution"]
        }
    });

    const directionsWidget = new Directions({
        layer: routeLayer,
        apiKey: esriConfig.apiKey,
        view: view
    });

    view.ui.add(directionsWidget, {position: "bottom-left"});
    
    const homeBtn = new Home({
        view: view
    });

    view.ui.add(homeBtn, "top-left");

    const layerList = new LayerList({
        view: view
    });

    const layerListDiv = document.createElement("div");
    layerListDiv.className = "esri-layer-list";
    layerListDiv.style.display = "none";
    document.body.appendChild(layerListDiv);
    layerList.container = layerListDiv;

    const basemapGallery = new BasemapGallery({
        view: view
    });

    const basemapGalleryDiv = document.createElement("div");
    basemapGalleryDiv.className = "esri-basemap-gallery";
    basemapGalleryDiv.style.display = "none";
    document.body.appendChild(basemapGalleryDiv);
    basemapGallery.container = basemapGalleryDiv;

    document.getElementById("layer-list-btn").addEventListener("click", function () {
        toggleElement(layerListDiv);
    });

    document.getElementById("basemap-gallery-btn").addEventListener("click", function () {
        toggleElement(basemapGalleryDiv);
    });

    function toggleElement(element) {
        const currentDisplay = window.getComputedStyle(element).getPropertyValue("display");
        element.style.display = currentDisplay === "none" ? "block" : "none";
    }
});
