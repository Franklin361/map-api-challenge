import { useMapInit } from '../../hooks'
import mapStyle from './style.module.css'

export const MapView = () => {

    const mapDiv = useMapInit();

    return (
        <div
            ref={mapDiv}
            className={mapStyle.container_map}
        />
    )
}