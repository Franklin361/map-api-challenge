import { GeoJSONSource, Map, Marker, Popup } from "mapbox-gl";
import create from "zustand";
import { makeRadius } from "../utils";

interface MapState {
    userLocation: [number, number] | null;
    isMapReady: boolean;
    map?: Map;
    markers: Marker[] | [];
    markerUser: Marker;
    reload: boolean;
    setRealod: (reload: boolean) => void;
    setMap: (map: Map) => void;
    setMarkers: (markers: Marker[]) => void;
    setUserLocation: (userLocation: [number, number]) => void;
    backToMyLocation: (userLocation: [number, number], radius: number) => void;
}


export const mapStore = create<MapState>((set, get) => ({
    userLocation: null,
    isMapReady: false,
    markers: [],
    markerUser: new Marker({ color: '#63df29', scale: 1.5 }),
    reload:false,

    setRealod: (reload: boolean) => set(state => ({ ...state, reload })),

    setMap: (map: Map) => set(state => ({ ...state, map, isMapReady: true })),

    setUserLocation: (userLocation: [number, number]) => set(state => ({ ...state, userLocation })),

    setMarkers: (markers: Marker[]) => set(state => {
        get().markers.forEach(marker => marker.remove());
        return {
            ...state,
            markers: [...markers]
        }
    }),

    backToMyLocation: (userLocation: [number, number]) => set(state => {
        
        const map = get().map;

        if(!map) return {...state};
        
        get().markers.forEach(marker => marker.remove());

        if (map.getLayer('route')) {
            map.removeLayer('route');
            map.removeSource('route');
        }

        map.flyTo({ center: userLocation, zoom: 11 });

        return {
            ...state,
            markers: [],
            userLocation,
            reload: true
        }
    })
}));