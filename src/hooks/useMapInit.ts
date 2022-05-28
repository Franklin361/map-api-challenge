import { useEffect, useLayoutEffect, useRef } from 'react';
import { Map, Popup, Marker, GeoJSONSource, LngLatBounds, AnySourceData } from 'mapbox-gl';
import { Feature } from '../interfaces';
import { getFeaturesFiltered, makeRadius } from '../utils';
import { useMapStore, useFilterStore } from './';

const token = import.meta.env.VITE_APP_TOKEN_MAPBOX as string;

export const useMapInit = () => {
    const { 
        map, userLocation, markerUser,reload, 
        setMap, setMarkers, setUserLocation,setRealod
    } = useMapStore();

    const { filter, radius } = useFilterStore()

    const mapDiv = useRef<HTMLDivElement>(null);

    const createMarkerOnMap = (lngLatArray: [number, number]) => {
        if (!map) return;

        markerUser.remove();

        const popup = new Popup({ closeButton: false, anchor: 'left', })
            .setHTML(`<div class="popup">You're here currently</div>`)

        markerUser
            .setLngLat(lngLatArray)
            .setPopup(popup)
            .addTo(map);
    }

    const initMap = async () => {
        if (!userLocation) return;

        const initMap: Map = new Map({
            container: mapDiv.current!,
            style: 'mapbox://styles/mapbox/dark-v10',
            pitchWithRotate: false,
            center: userLocation,
            zoom: 11,
            accessToken: token,
            doubleClickZoom: false
        });

        setMap(initMap);

    }

    const createLayerForDrawRadius = async() => {
        if (!map) return;

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
        
        
        const searchRadius = makeRadius(userLocation!, radius); //esto nos trae las cordenadas
        createMarkerOnMap(userLocation!);
        (map.getSource('search-radius') as GeoJSONSource).setData(searchRadius);
        const features = await getFeaturesFiltered({ lngLat: userLocation!, searchRadius, search: filter}); // get places into circle

        generateNewMarkes(features, userLocation!);
    }

    const deletePolylineOfMap = () => {
        if (map?.getLayer('route')) {
            map?.removeLayer('route');
            map?.removeSource('route');
        }
    };

    const getRouteBetweenRoutes = async (start: [number, number], end: [number, number]) => {

        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]}%2C${start[1]}%3B${end[0]}%2C${end[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${token}`

        const response = await fetch(url)
        const data = await response.json();
        console.log(data)

        if (data.routes.length === 0) {
            alert('no ruta')
            return;
        }

        const { distance, duration, geometry } = data.routes[0];

        if (distance === 0) return;

        const { coordinates } = geometry

        const bounds = new LngLatBounds(start, start);

        for (const coord of coordinates) {
            const newCors: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCors);
        }

        map?.fitBounds(bounds, {
            padding: 80,
        });

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates
                        }
                    }
                ]
            },
        };

        deletePolylineOfMap();

        map?.addSource('route', sourceData);
        map?.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#7a63e0',
                'line-width': 5
            }
        })

        // distancia en metros - duration en segundos
        const newDistance = +(distance / 1000).toFixed(2)
        const newDuration = +(duration / 60).toFixed(2)

    };

    const generateNewMarkes = (features: Feature[], newPositionUser: [number, number]) => {
        if (!map) return;

        const newMarkers: Marker[] = [];

        for (const place of features) {
            const placePosition = place.center;
            const popUp = new Popup({ closeButton: false })
                .setHTML(` 
                    <div class="popup">
                        <h5 class="text-lg">${place.place_name}</h5>
                        <p>${place.text}</p>
                    </div>
                `)


            const markerGenerate = new Marker({ color: '#c2367c' })
                .setPopup(popUp)
                .setLngLat([placePosition[0], placePosition[1]])
                .addTo(map)

            markerGenerate.getElement().addEventListener('click', e => {
                getRouteBetweenRoutes([newPositionUser[0], newPositionUser[1]], [placePosition[0], placePosition[1]])
            });

            newMarkers.push(markerGenerate);

        }

        setMarkers(newMarkers)
    }

    const onDbClickOnMap =   async  ({ lngLat: { lat, lng } }: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
                
        setUserLocation([lng,lat]) // Send new user location to store

        deletePolylineOfMap(); // delete polylines created 

        createMarkerOnMap([lng, lat]); // get position the user marker on the new location
        
        const searchRadius = makeRadius([lng, lat], radius); // get coordenates

        (map!.getSource('search-radius') as GeoJSONSource).setData(searchRadius); // show circle radius
        
        const features = await getFeaturesFiltered({ lngLat: [lng, lat], searchRadius, search: filter}); // get places into circle

        generateNewMarkes(features, [lng, lat]); // show marckers' places
    }

    // Iniialize map
    useLayoutEffect(() => {
        if (mapDiv.current) initMap();
    }, [mapDiv]);

    // OnLoad map
    useEffect(() => {

        if(reload){
            createLayerForDrawRadius()
            setRealod(false);
        }

        if (map) map.on('load', createLayerForDrawRadius)

        return () => {
            map?.off('load', createLayerForDrawRadius)
        }
    }, [map, reload])

    // Event double click on map
    useLayoutEffect(() => {
        
        if (map) map.on('dblclick', onDbClickOnMap);

        return () => {
            map?.off('dblclick', onDbClickOnMap)
        }
    }, [map, radius, filter])


    const changeRadius = async () => {
        if (!map) return;
        if (!userLocation) return;
        if(!map.getSource('search-radius')) return;
        
        deletePolylineOfMap();
        
        const searchRadius = makeRadius(userLocation, radius); // get coordenates

        (map.getSource('search-radius') as GeoJSONSource).setData(searchRadius); // show circle radius
        console.log('cambia radio-search')
        const features = await getFeaturesFiltered({ lngLat: userLocation, searchRadius, search: filter }); // get places into circle

        generateNewMarkes(features, userLocation);
    }
    //Change radius or POI 
    useEffect(() => {
        changeRadius();
    }, [radius, filter])

    return mapDiv
}

