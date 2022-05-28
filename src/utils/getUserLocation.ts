

export const getUserLocation = async(): Promise<[number, number]> => {
    return new  Promise( (resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(
            ({ coords:{ latitude, longitude } }) => {
                resolve([longitude, latitude]);
            },
            (err)=>{
                
                alert('No location permised')

                console.log(err)
                reject();
            }
        )
    })
};