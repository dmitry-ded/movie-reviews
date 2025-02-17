import styles from './header.module.css'
import Search from '../search/Search'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.svg"

const Header: React.FC = () => {
  return (
    <div className={styles.mainHeaderBlock}>
      <section className={styles.contentSection}>
        <div className={styles.iconBlock}>
          <Link to={`/`}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={styles.mainSearchBlock} >
          <Search />
        </div>
      </section>
    </div>
  )
}

export default Header
