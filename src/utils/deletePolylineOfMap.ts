import { Map } from 'mapbox-gl';

export const deletePolylineOfMap = (map: Map) => {
    if (map.getLayer('route')) {
        map.removeLayer('route');
        map.removeSource('route');
    }
};