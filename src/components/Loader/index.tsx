import style from './style.module.css'

export const Loading = () => {
  return (
    <div className={style.container}>
      <div className={style.loadercircle}></div>

      <div className={style.loader}>
        <div className={style.scanner}>
          <h1>Loading ...</h1>
        </div>
      </div>
    </div>
  )
}