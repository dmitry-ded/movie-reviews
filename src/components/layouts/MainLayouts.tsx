import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import styles from "../home/home.module.css"
import Footer from '../footer/Footer'


const MainLayouts: React.FC = () => {
  return (
    <div className={styles.mainHomeBlock}>
      <div className={styles.headerBlock}>
        <Header />
      </div>
      <div className={styles.homeBlock}>
        <div className={styles.outlet}>
          <Outlet/>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayouts
