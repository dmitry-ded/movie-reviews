import { useParams } from 'react-router-dom'
import { useGetFilmByIdQuery } from '../../services/FilmService';
import styles from "./fullReviewsMovieCard.module.css"
import icon from "../../assets/react.svg"
import ReviewsCard from '../reviewsCard/ReviewsCard';

const FullReviewsMovieCard: React.FC = () => {

  const { id } = useParams();
  const numberId = id ? parseInt(id, 10) : 1; 
  const { data, error, isLoading } = useGetFilmByIdQuery(numberId);


  return (
    <section className={styles.mainFullCard}>
      <div className={styles.fullCardBody}>
        <div className={styles.fullCardMovieAndReviews}>
          <div className={styles.nameMovie}>
            <h1>{data?.title} ({data?.date}) - Отзывы</h1>
          </div>
          <div className={styles.fullCardMovie}>
            <div className={styles.movieImageAndRating}>
              <div className={styles.image}>
                <img className={styles.img} src={icon} alt="" />
              </div>
              <div className={styles.rating}>
                <div style={{display: "flex", gap: ".5rem"}}>
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
              <button className={styles.button}>Добавить отзыв</button>
            </div>
          </div>
        </div>
        <div className={styles.countReviews}>
          <div style={{display: "flex", alignItems: "center"}}>
            <h3>Отзывы</h3>
            <span className={styles.count}>{data?.reviews.length}</span>
          </div>
          <h3 className={styles.description}>Описание</h3>
        </div>
        <div className={styles.fullCardReview}>
          {
            data?.reviews && data.reviews.map((el) => (
              <ReviewsCard key={el.id} review={el} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default FullReviewsMovieCard
