import { useState } from 'react'
import styles from './sort.module.css'

const Sort = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.movieSortBlock}>
      <h1>Фильмы-отзывы</h1>
      <div className={styles.sortPopup}>
        <button className={styles.button} onClick={togglePopup}>
          По категориям: {`${"Фильмы"}`}
        </button>
        {isOpen && (
          <>
            <div className={styles.popupArrow}></div>
            <div className={styles.popup}>
              <ul className={styles.list}>
                <li className={styles.item}>Фильмы</li>
                <li className={styles.item}>Сериалы</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Sort
