import { useCallback, useEffect, useState } from 'react';

import { mapStore } from '../stores';
import { getUserLocation } from '../utils';


export const useUserLocation = () => {

    const setUserLocation = mapStore(state => state.setUserLocation);

    const [existLocation, setexistUserLocation] = useState({
        loading: true,
        existLocation: false
    });

    const locationPermission = useCallback(
        async () => {
            setexistUserLocation(prev => ({ ...prev, loading: true }));
            try {
                const lnglat = await getUserLocation();
                setUserLocation(lnglat);
                sessionStorage.setItem('original-location', JSON.stringify(lnglat));
                setexistUserLocation({ existLocation: true, loading: false })
            } catch (error) {
                setexistUserLocation(({ existLocation: false, loading: false }));
            }
        }
        ,[]
    )

    useEffect(() => {
        locationPermission()
    }, [])

    return {
        ...existLocation
    }

}