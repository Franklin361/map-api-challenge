import { Map } from "mapbox-gl";

export const createSearchRadiusLayer =  ( map:Map ) => {
    if(!map.getLayer('search-radius')){
        map.addLayer({
            id: 'search-radius',
           source: {
                type: 'geojson',
                data: { "type": "FeatureCollection", "features": [] }
            },
            type: 'fill',
            paint: {
                'fill-color': '#6a5acd',
                'fill-opacity': 0.1,
            }
        });
    }

}