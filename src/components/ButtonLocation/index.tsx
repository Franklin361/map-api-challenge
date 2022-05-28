import {HiOutlineLocationMarker} from 'react-icons/hi'
import { useMapStore, useFilterStore } from '../../hooks';
import { getUserLocation } from '../../utils'
import style from './style.module.css'

export const MyLocationBtn = () => {

    const { backToMyLocation } = useMapStore();
    const { radius } = useFilterStore();
    
    const handleGoToLocation = async() => {
        let lnglat: [number, number] | null;

        lnglat = JSON.parse(sessionStorage.getItem('original-location')!);

        if(!lnglat) { lnglat = await getUserLocation(); console.log('buscando locacion API...')}

        console.log(lnglat)
        backToMyLocation(lnglat, radius)
    }

    return (
        <button className={style.btn} onClick={handleGoToLocation} title='Go to my location'>
            <HiOutlineLocationMarker className={style.icon} />
        </button>
    )
}