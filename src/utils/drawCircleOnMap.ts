import * as turf from '@turf/turf'
import { Map, GeoJSONSource } from 'mapbox-gl';

interface Props {
    location: [number, number];
    radius: number;
    map: Map;
}

export const drawCircleOnMap = ({ location, map, radius }:Props)  => {
    const point = turf.point(location);
    
    const buffered = turf.buffer(point, radius, { units: 'kilometers' });
    
    (map.getSource('search-radius') as GeoJSONSource).setData(buffered);
    return buffered;
}