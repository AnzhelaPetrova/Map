require([
    "esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Home",
    "esri/widgets/LayerList",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Directions",
    "esri/layers/RouteLayer"
] ),
    function(
        esriConfig,
        WebMap,
        MapView,
        Home,
        LayerList,
        BasemapGallery,
        Directions,
        RouteLayer
    ) {
        esriConfig.apiKey = "AAPK77ebc8a134de4074a160da0e32d0d877onv_cK6xV7_3fD5hbgt8oYIPGcwHVf3SZVZkhweY7eONVEXqwdhRAkgphMmXCg9x"
        
        const routeLayer = new RouteLayer();

        const webmap = new WebMap({
            portalItem:{
               id: "741d62a7615f464c999d1d1d7bc3a200"
            },
        });
        
        webmap.layers.add(routeLayer);
        
        const view = new MapView ({
            container: "viewDiv",
            map: webmap,
        });
    
        const directionsWidget = new Directions({
            layer: routeLayer,
            apiKey: esriConfig.apiKey,
            view
        })

        view.ui.add(directionsWidget,{position:"bottom-left"});
        
        //const homeBtn = new Home({
        //});

        view.ui.add(homeBtn,"top-left");
        const layerList = new LayerList({
        });

        view.ui.add("layer-list-btn", "top-right");
        view.ui.add(layerList,"top-right");
        view.ui.add("basemap-gallery-btn", "top-right")

        const basemapGallery = new BasemapGallery({
            view
        });

        view.ui.add(basemapGallery, "top-right");

        document.getElementById("layer-list-btn").addEventListener("click", function (){
            toggleButton("layerList");
        });

        document.getElementById("basemap-gallery-btn").addEventListener("click", function(){
            toggleButton("gallery");
        });

        function toggleButton(element) {
            if (element == "layerList") {
                const layerListEl = document.getElementsByClassName("esri-layer-list")[0];
                const currentProp = layerListEl.computedStyleMap.getPropertyValue("display");
                layerListEl.style.setProperty("display", currentProp == "name" ? "block" : "none");
            } else if (element == "gallery") {
            const galleryEl = document.getElementsByClassName("esri-basemap-gallery"[0]);
            const currentPropGallery = galleryEl.style.getPropertyValue("display");
            galleryEl.style.setProperty("display", currentPropGallery == "none" ? "block" : "none");
        }
    }
}
    