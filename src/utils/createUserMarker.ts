import { Map, Marker,Popup } from 'mapbox-gl';

interface Props {
    location: [number, number];
    map: Map,
    markerUser: Marker
}

export const createUserMarkerOnMap = ({ location, map, markerUser }: Props) => {
    if (!map) return;

    markerUser.remove();

    const popup = new Popup({ closeButton: false, anchor: 'left', })
        .setHTML(`<div class="popup">You're here currently</div>`)

    markerUser
        .setLngLat(location)
        .setPopup(popup)
        .addTo(map);
}