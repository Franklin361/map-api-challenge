import { Map, Marker } from 'mapbox-gl';
import { FilterOpts } from '../interfaces';
import { deletePolylineOfMap, drawCircleOnMap, createUserMarkerOnMap, getFeaturesFiltered, showAlert } from '.';
import { Feature } from '../interfaces';

interface Props {
    location: [number, number];
    createUserMarkerAgain?: boolean;
    map: Map;
    markerUser: Marker;
    radius: number;
    filter: FilterOpts;
}

export const initMarkersByFilter = async ({
    createUserMarkerAgain = false, filter, location, map,
    markerUser, radius
}: Props): Promise<Feature[]> => {
    

    deletePolylineOfMap(map);

    if (createUserMarkerAgain) createUserMarkerOnMap({ location, map, markerUser });

    const searchRadius = drawCircleOnMap({ location, radius, map });

    const features = await getFeaturesFiltered({ lngLat: location, searchRadius, search: filter });

    if (features.length === 0) showAlert();

    return features;

}
