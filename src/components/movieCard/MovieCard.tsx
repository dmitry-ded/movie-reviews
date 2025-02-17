import styles from "./movieCard.module.css"
import { IFilm } from "../../models/IFilm"
import { Link } from "react-router-dom";
import starImg from "../../assets/star.svg"
import img5 from "../../assets/5.jpg"

interface FilmItemProps {
  film: IFilm,
}

const MovieCard: React.FC<FilmItemProps> = ( { film } ) => {
  
  return (
    <div className={styles.movieCard}>
      <div className={styles.imgBlock}>
        <Link to={`/product/${film.id}`} style={{color: "black"}}>
          <img src={img5} alt="" className={styles.image} />
        </Link>
      </div>
      <div className={styles.descriptionAndReviews}>
        <div className={styles.descriptionMovie}>
          <Link to={`/product/${film.id}`}>
            <h2 className={styles.titleMovie} >{`${film.title} (${film.date})`}</h2>
          </Link>
          <Link to={`/postreview/${film.id}`} style={{color: "black"}}>
            <span className={styles.addReview}>Добавить отзыв <strong>{">"}</strong></span>
          </Link>
        </div>
        <div className={styles.countReviews}>
          <div className={styles.icons}>
            <img src={starImg} alt="" />
            <span className={styles.rating}>{film.rating}</span>
          </div>
          <Link to={`/product/${film.id}`} style={{color: "black"}}>
            <span className={styles.reviewsCou}>Отзывы: {film.reviews.length}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
