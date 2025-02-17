import styles from "./fullCardMovie.module.css"
import icon from "../../assets/5.jpg"
import { Link, useParams } from 'react-router-dom';
import { useGetFilmByIdQuery } from '../../services/FilmService';

const FullCardMovie = () => {

  const { id } = useParams();
  const numberId = id ? parseInt(id, 10) : 1; 
  const { data, error, isLoading } = useGetFilmByIdQuery(numberId);

  return (
    <div className={styles.fullCardMovie}>
      <div className={styles.movieImageAndRating}>
        <div className={styles.image}>
          <img className={styles.img} src={icon} alt="" />
        </div>
        <div className={styles.rating}>
          <div className={styles.ratingAndSvg}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="30">
              <rect width="100" height="100" rx="15" fill="#D22951" />
              <path d="M50 20 L58 40 L80 40 L62 55 L68 75 L50 62 L32 75 L38 55 L20 40 L42 40 Z" fill="#FFFFFF" />
            </svg>
            <h1>{data?.rating}</h1>
          </div>
          <span>Отзывов: {data?.reviews.length} </span>
        </div>
      </div>
      <div className={styles.buttonBlock}>
        <Link className={styles.button} to={`/postreview/${data?.id}`}>
          <div>Добавить отзыв</div>
        </Link>
      </div>
    </div>
  )
}

export default FullCardMovie

