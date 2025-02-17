import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './sortByCategory.module.css'
import { RootState, useAppDispatch } from '../../redux/store';
import { setCategory } from '../../redux/slices/filterSlice';
import { useSelector } from 'react-redux';

const popupCategory = [
  {name: "Фильм"},
  {name: "Сериал"},
]

const SortByCategory: React.FC = () => {

  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const category = useSelector((state: RootState) => state.filterSlice.category);
  
  const [isVisible, setIsVisible] = useState(false);
  
  const hidePopup = (i: string) => {
    dispatch(setCategory(i));
    setIsVisible(false);
  };
    
  const handleClickOutside = useCallback((event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }, []);
    
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.movieSortBlock}>
      <h2>Фильмы-отзывы</h2>
      <div ref={sortRef} className={styles.sortPopup}>
        <div onClick={() => setIsVisible(!isVisible)} className={styles.selectionOfSorting}>
          <b>По категориям:</b> 
          <span style={{display: "flex", alignItems: "center"}}>
            {category}
            {
              isVisible ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 15L12 8L5 15" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 9L12 16L19 9" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            }
          </span>
        </div>
        {
          isVisible && (
            <>
              <div className={styles.popupArrow}></div>
              <div className={styles.popup}>
                <ul className={styles.list}>
                  {
                    popupCategory.map((el, index) => (
                      <li key={index} onClick={() => hidePopup(el.name)} className={styles.item}>{el.name}</li>
                    ))
                  }
                </ul>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default SortByCategory
