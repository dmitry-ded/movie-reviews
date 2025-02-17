import { Link, useParams } from 'react-router-dom'
import { useGetFilmByIdQuery } from '../../services/FilmService';
import styles from "./fullReviewsMovieCard.module.css"
import ReviewsCard from '../reviewsCard/ReviewsCard';
import FullCardMovie from '../fullCardMovie/FullCardMovie';

const FullReviewsMovieCard: React.FC = () => {

  const { id } = useParams();
  const numberId = id ? parseInt(id, 10) : 1; 
  const { data } = useGetFilmByIdQuery(numberId); 

  return (
    <section className={styles.mainFullCard}>
      <div className={styles.fullCardBody}>
        <div className={styles.fullCardMovieAndReviews}>
          <div className={styles.nameMovie}>
            <h2>{data?.title} ({data?.date}) - Отзывы</h2>
          </div>
          <FullCardMovie />
        </div>
        <div className={styles.countReviews}>
          <div style={{display: "flex", alignItems: "center"}}>
            <h3 style={{color: "#000"}}>Отзывы</h3>
            <span className={styles.count}>{data?.reviews.length}</span>
          </div>
          <Link to={`/moviedescription/${data?.id}`}>
            <h3 className={styles.description}>Описание</h3>
          </Link>
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
