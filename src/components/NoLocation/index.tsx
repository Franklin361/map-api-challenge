import style from './style.module.css';
import { Player } from '@lottiefiles/react-lottie-player';

export const NoLocation = () => {
  return (
    <div className={style.container}>

      <Player
        autoplay
        loop
        src="https://assets8.lottiefiles.com/packages/lf20_jif9vljs.json"
        className={style.lottiefile}
      />

      <p className={style.text}> Your location is <span className={style.special}>required</span> to use the app.</p>
    </div>
  )
}