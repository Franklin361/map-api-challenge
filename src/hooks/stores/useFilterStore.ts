import { filterStore } from "../../stores"
import shallow from 'zustand/shallow';

export const useFilterStore = () => {
    const props = filterStore((
        { filter, radius, setFilter }) => 
        ({ filter, radius, setFilter }), shallow)

    return{
        ...props
    }
}