import { useCallback, useEffect, useState } from 'react';

import { getUserLocation } from '../utils';
import { useMapStore } from './stores/useMapStore';


export const useUserLocation = () => {

    const { setUserLocation } = useMapStore();

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