import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from "./sortPopup.module.css"
import { RootState, useAppDispatch } from '../../redux/store';
import { setSortType, Sort, SortEnumProperty } from '../../redux/slices/filterSlice';
import { useSelector } from 'react-redux';

const popupCategory = [
  {name: 'рейтингу (5⟶1)', sortProperty: SortEnumProperty.RATING_DESC},
  {name: 'рейтингу (1⟶5)', sortProperty: SortEnumProperty.RATING_ASC},
  {name: 'отзывам: (Больше⟶Меньше)', sortProperty: SortEnumProperty.REVIEW_DESC},
  {name: 'отзывам: (Меньше⟶Больше)', sortProperty: SortEnumProperty.REVIEW_ASC},
  ];

const SortPopup: React.FC = ( ) => {

  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const sortName = useSelector((state: RootState) => (state.filterSlice.sortType));

  const dispatch = useAppDispatch();

  const hidePopup = (i: Sort) => {
    dispatch(setSortType(i));
    setIsVisible(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.selectionOfSorting}>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sortName.name}</span>
      </div>
      {
        isVisible && (
          <div className={styles.sortPopup}>
            <ul>
              {
                popupCategory.map((el, index) => {
                  return (
                    <li key={index} onClick={() => hidePopup(el)}>
                      {el.name}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default SortPopup
