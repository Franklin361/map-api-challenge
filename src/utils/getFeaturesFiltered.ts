import * as turf from '@turf/turf'
import { MapBoxResponse, FilterOpts } from '../interfaces';
import { token } from "./";

interface Props {
    lngLat: [number, number];
    searchRadius: turf.helpers.Feature<turf.helpers.Polygon, turf.helpers.Properties>;
    search: FilterOpts
}

export const getFeaturesFiltered = async ({ lngLat: [lng, lat], searchRadius, search }: Props) => {
    
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?&types=poi&limit=10&proximity=${lng}%2C${lat}&access_token=${token}`


        const res = await fetch(url);
        const data: MapBoxResponse = await res.json();

        return data.features.filter((feat) => turf.booleanPointInPolygon(feat, searchRadius));
    } catch (error) {
        console.log(error)
        return []
    }
}