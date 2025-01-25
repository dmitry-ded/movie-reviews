import styles from "./movieCard.module.css"
import icon from "../../assets/react.svg"
import { IFilm } from "../../models/IFilm"
import { Link } from "react-router-dom";
import starImg from "../../assets/star.svg"

interface FilmItemProps {
  film: IFilm,
}

const MovieCard: React.FC<FilmItemProps> = ( { film } ) => {
  

  console.log(film.reviews.length);
  

  return (
    <div className={styles.movieCard}>
      <img src={icon} alt="" className={styles.image} />
      <div className={styles.descriptionAndReviews}>
        <div className={styles.descriptionMovie}>
          <Link to={`/product/${film.id}`} style={{color: "black"}}>
            <h2>{`${film.title} (${film.date})`}</h2>
          </Link>
          <Link to={`/postReview`} style={{color: "black"}}>
            <span style={{fontWeight: "550"}}>Добавить отзыв <strong>{">"}</strong></span>
          </Link>
        </div>
        <div className={styles.countReviews}>
          <div className={styles.icons}>
            <img src={starImg} alt="" />
            <span>{film.rating}</span>
          </div>
          <span>Отзывы: {film.reviews.length}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
