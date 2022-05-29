import { Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces';
import { getRouteBetweenRoutes, token} from './';

interface Props {
    features: Feature[];
    location: [number, number];
    map: Map;
}

export const generateNewMarkes = ({ features, location, map }:Props): Marker[]  => {

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
            getRouteBetweenRoutes({
                start: [location[0], location[1]],
                end: [placePosition[0], placePosition[1]],
                map
            })
        });

        newMarkers.push(markerGenerate);
    }

    // setMarkers(newMarkers)

    return newMarkers 
}