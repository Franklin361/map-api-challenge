import create from "zustand";
import { FilterOpts } from "../interfaces";



interface FilterState {
    filter: FilterOpts;
    setFilter: (filter: FilterOpts, radius: number) => void;
    radius: number;

}


export const filterStore = create<FilterState>((set) => ({
    filter: 'restaurant',
    radius: 10,
    setFilter: (filter: FilterOpts, radius:number) => set ( state => ({...state, filter, radius }) )
}));