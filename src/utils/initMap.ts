import { Map } from 'mapbox-gl';
import { token } from './';

interface Props {
    userLocation: [number, number];
    container: string | HTMLElement
}

export const initMap = ({ container, userLocation }: Props): null | Map => {
    if (!userLocation) return null;
    
    const initMap: Map = new Map({
        container,
        style: 'mapbox://styles/mapbox/dark-v10',
        pitchWithRotate: false,
        center: userLocation,
        zoom: 11,
        accessToken: token,
        doubleClickZoom: false
    });

    return initMap

}