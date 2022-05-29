import { useCallback, useEffect, useState } from 'react';

import { getUserLocation } from '../utils';
import { useMapStore } from './stores';


export const useUserLocation = () => {

    const { setUserLocation } = useMapStore();

    const [existLocation, setExistUserLocation] = useState({
        loading: true,
        existLocation: false
    });

    const locationPermission = useCallback(
        async () => {
            setExistUserLocation(prev => ({ ...prev, loading: true }));
            try {
                const lnglat = await getUserLocation();
                setUserLocation(lnglat);
                sessionStorage.setItem('original-location', JSON.stringify(lnglat));
                setExistUserLocation({ existLocation: true, loading: false })
            } catch (error) {
                setExistUserLocation(({ existLocation: false, loading: false }));
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