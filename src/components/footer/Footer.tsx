import React from 'react'
import styles from "./footer.module.css"
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.svg"
import liru from "../../assets/liru.jpg"
import iosLogo from "../../assets/iOS-app.svg"


const Footer: React.FC = () => {
  return (
    <div className={styles.mainFooter}>
      <div className={styles.footerBlock}>
        <div className={styles.footerLogo}>
          <Link to={`/`}>
          <img src={logo} alt="" />
          </Link>
          <p>Сайт отзывов, где миллионы людей</p>
          <p>обмениваются полезным опытом.</p>
        </div>
        <div className={styles.footerItem}>
          <p className={styles.link}>Правила сервиса</p>
          <p className={styles.link}>Помощь</p>
          <p className={styles.link}>Обратная связь</p>
          <p className={styles.link}>Партнерам</p>
        </div>
        <div className={styles.footerItem}>
          <p className={styles.link}>Пользовательское соглашение</p>
          <p className={styles.link}>Политика конфиденциальности</p>
          <p className={styles.link}>О компании</p>
        </div>
        <div className={styles.iosApp}>
          <div className={styles.iosAppText}>
            <div style={{display: "flex", flexDirection: "column"}}>
              <p>Приложение для</p>
              <p>iOS</p>
            </div>
            <img src={iosLogo} alt="" />
          </div>
        </div>
      </div>
        <div className={styles.footerCredits}>
          <p>Movie Reviews © 2025-2025</p>
          <div className={styles.liruAgeLimit}>
            <img src={liru} alt="" />
            <p>18+</p>
          </div>
        </div>
    </div>
  )
}

export default Footer