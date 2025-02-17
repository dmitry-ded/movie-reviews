import React from 'react'
import styles from "./movieDescription.module.css"
import { Link, useParams } from 'react-router-dom';
import { useGetFilmByIdQuery } from '../../services/FilmService';
import FullCardMovie from '../fullCardMovie/FullCardMovie';

const MovieDescription = () => {

  const { id } = useParams();
  const numberId = id ? parseInt(id, 10) : 1; 
  const { data, error, isLoading } = useGetFilmByIdQuery(numberId);

  return (
    <div className={styles.mainMovieDescription}>
      <div className={styles.bodyMovieDescription}>
        <div className={styles.headerMovie}>
          <h2>{data?.title} ({data?.date})</h2>
        </div>
        <div className={styles.fullCard}>
          <FullCardMovie />
        </div>
        <div className={styles.countReviews}>
          <div style={{display: "flex", alignItems: "center"}}>
            <Link to={`/product/${data?.id}`}>
              <h3 className={styles.review}>Отзывы</h3>
            </Link>
            <span className={styles.count}>{data?.reviews.length}</span>
          </div>
          <h3 className={styles.description}>Описание</h3>
        </div>
        <div style={{paddingBottom: "1rem"}}>
          <div className={styles.movieInfo}>
            <div className={styles.titleBlock}>
              <h4>Основные Параметры</h4>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Год выпуска</td>
                  <td>2023</td>
                </tr>
                <tr>
                  <td>Возрастной рейтинг</td>
                  <td>16+ (от 16 лет)</td>
                </tr>
                <tr>
                  <td>Жанр</td>
                  <td>Комедия</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDescription
