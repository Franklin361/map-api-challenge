import { MdDragHandle, MdPark, MdRestaurant } from 'react-icons/md'
import { FaGlassMartiniAlt } from 'react-icons/fa'
import { useform } from '../../hooks';

import style from './style.module.css';

export const FilterBar = () => {

  const { handleChange, handleShowBar, isShowBar, opt, radius } = useform()
  
  return (
    <aside className={`${style.containerFilter} ${isShowBar ? style.showCompleteBar : ''}`}  >

      <div onMouseDown={handleShowBar} className={style.draggable}>
        <MdDragHandle className={style.icon} />
      </div>
      <h2 className={style.title}>FIND YOUR PLACE</h2>
      <p className={style.descAside}>Findyourplace, allows you to quickly search for restaurants, parks and bars so you can relax or work away from home.</p>

      <hr className={style.separator} />

      <div className={style.contentAside}>

        <h4 className={style.subtitle}>Highlights</h4>
        <p className={style.descAside}>Select some of the default bookmarks that we have selected for you</p>

        <div className={style.containerButtons}>
          <div>
            <input
              className={style.radio}
              type="radio"
              name="search"
              id={opt.restaurant}
              onChange={handleChange}
              defaultChecked
            />
            <label className={style.item} htmlFor={opt.restaurant}>
              <MdRestaurant className={style.icon_item} />
              Restaurants
            </label>
          </div>
          <div>
            <input
              className={style.radio}
              type="radio"
              name="search"
              id={opt.park}
              onChange={handleChange}
            />
            <label className={style.item} htmlFor={opt.park}>
              <MdPark className={style.icon_item} />
              Parks and outdoor sites
            </label>
          </div>
          <div>
            <input
              className={style.radio}
              type="radio"
              name="search"
              id={opt.alcohol}
              onChange={handleChange}
            />
            <label className={style.item} htmlFor={opt.alcohol}>
              <FaGlassMartiniAlt className={style.icon_item} />
              Bars
            </label>
          </div>
        </div>

        <h5 className={style.subtitle}>Distance from my position <br/> 👉 ({radius} km)</h5>
        <div className={style.rangeContent}>
          <span className={style.number}>0</span>
          <input
            min={0}
            max={30}
            type="range" name="radius" id="" className={style.range}
            onChange={handleChange}
            value={radius}
          />
          <span className={style.number}>30</span>
        </div>

      </div>


    </aside>
  )
}