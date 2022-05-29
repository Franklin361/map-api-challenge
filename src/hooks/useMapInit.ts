import { useEffect, useLayoutEffect, useRef } from 'react';
import { createSearchRadiusLayer, generateNewMarkes, initMap, initMarkersByFilter } from '../utils';
import { useMapStore, useFilterStore } from './';

export const useMapInit = () => {
    const {
        map, userLocation, markerUser, reload,
        setMap, setMarkers, setUserLocation, setRealod
    } = useMapStore();

    const { filter, radius } = useFilterStore()

    const mapDiv = useRef<HTMLDivElement>(null);

    const showMarkersOnRadius = async(location: [number, number], createUserMarkerAgain: boolean) => {
        if(!map) return;
        const features = await initMarkersByFilter({ filter, location, map, markerUser, radius, createUserMarkerAgain });
        const markers = generateNewMarkes({ features, location, map });
        setMarkers(markers)
    }

    const createLayerForDrawRadius = () => {
        createSearchRadiusLayer(map!);
        showMarkersOnRadius(userLocation!, true);
    }

    const onDbClickOnMap = ({ lngLat: { lat, lng } }: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        setUserLocation([lng, lat])
        showMarkersOnRadius([lng, lat], true);
    }

    useLayoutEffect(() => {
        if (mapDiv.current && userLocation) {
            const mapInit = initMap({ container: mapDiv.current!, userLocation });
            mapInit && setMap(mapInit);
        }
    }, [mapDiv]);

    useEffect(() => {

        if (reload) {
            createLayerForDrawRadius();
            setRealod(false);
        }

        map && map.on('load', createLayerForDrawRadius)

        return () => { map?.off('load', createLayerForDrawRadius) }
    }, [map, reload])

    useEffect(() => {
        map && map.on('dblclick', onDbClickOnMap);

        return () => { map?.off('dblclick', onDbClickOnMap) }
    }, [map, radius, filter])

    useEffect(() => {
        if (userLocation && map) showMarkersOnRadius(userLocation, false)
    }, [radius, filter])

    return mapDiv
}