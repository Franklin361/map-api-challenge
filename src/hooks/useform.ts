import { filterStore } from "../stores";
import { useState, useEffect } from 'react';
import { FilterOpts } from "../interfaces";

interface FormState {
    search: FilterOpts,
    radius: number
}



const opt: { [K in FilterOpts]: FilterOpts; } = {
    alcohol: 'alcohol',
    park: 'park',
    restaurant: 'restaurant'
}

export const useform = () => {
    const setFilter = filterStore(state => state.setFilter);

    const [isShowBar, setIsShowBar] = useState(false);
    const [form, setForm] = useState<FormState>({
        search: 'restaurant',
        radius: 10
    })

    const handleShowBar = () => setIsShowBar(!isShowBar);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = name === 'search' ? e.target.id : +e.target.value
        console.log({ value })
        setForm(prev => ({
            ...prev,
            [name]: value
        }))

    }

    useEffect(() => {
        setFilter(form.search, form.radius);
    }, [form])

    return {
        opt,
        handleChange,
        handleShowBar,
        isShowBar,
        ...form
    }
}