
import { Player } from '@lottiefiles/react-lottie-player';
import style from './style.module.css'

const src = 'https://assets5.lottiefiles.com/packages/lf20_pojzngga.json '

export const ContentModal = () => {
    return (
        <div className={style.container}>
            <h2 className={style.title}>Upps!</h2>
            <Player
                autoplay
                loop
                src={src}
                className={style.video}
            />
            <p className={style.msg}>
            Points of interest not found, please try another <span>location</span> or <span>filter</span>.
            </p>
        </div>
    )
}