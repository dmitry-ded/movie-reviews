import React from 'react'
import styles from './search.module.css'
import { IoSearch } from "react-icons/io5";


const Search = () => {
  return (
    <div className={styles.searchBlock}>
      <div className={styles.inputBlock}>
        <input type="text" placeholder="Введите фильм или сериал" />
        <IoSearch className={styles.searchIcon} />
      </div>
    </div>
  )
}

export default Search
