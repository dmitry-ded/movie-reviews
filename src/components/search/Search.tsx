import React, { useCallback, useRef, useState } from 'react'
import styles from './search.module.css'
import { IoSearch } from "react-icons/io5";
import { useAppDispatch } from '../../redux/store';
import debounce from "lodash/debounce";
import { setSearchValue } from '../../redux/slices/filterSlice';


const Search: React.FC = () => {

  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value))
    }, 500),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  }

  return (
    <div className={styles.searchBlock}>
      <div className={styles.inputBlock}>
        <input ref={inputRef} onChange={onChangeInput} value={value} type="text" placeholder="Введите фильм или сериал" />
        <IoSearch className={styles.searchIcon} />
      </div>
    </div>
  )
}

export default Search
