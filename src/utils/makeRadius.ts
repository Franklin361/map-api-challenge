import * as turf from '@turf/turf'

// HACERLO UN HOOK

export const makeRadius = (lngLatArray: [number, number], radius: number)  => {
    const point = turf.point(lngLatArray);
    const buffered = turf.buffer(point, radius, { units: 'kilometers' });
    return buffered;
}