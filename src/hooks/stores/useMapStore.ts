import { mapStore } from "../../stores";
import shallow from 'zustand/shallow';

export const useMapStore = () => {
    
    const props = mapStore((
        { setMap, map, setMarkers, userLocation, setUserLocation, markerUser, reload, setRealod, backToMyLocation, isMapReady, markers }) => (
        { setMap, map, setMarkers, userLocation, setUserLocation, markerUser, reload, setRealod, backToMyLocation, isMapReady, markers }
    ), shallow);

    return{
        ...props
    }
}