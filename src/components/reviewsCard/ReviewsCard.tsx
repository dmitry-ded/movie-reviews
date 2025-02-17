import React from 'react'
import styles from "./reviewsCard.module.css"
import { Reviews } from '../../models/IFilm'
import icon from "../../assets/avatar.jpg"
import { useDeletePostReviewMutation } from '../../services/FilmService';

interface reviewCardProps {
  review: Reviews;
}

const ReviewsCard: React.FC<reviewCardProps> = ( { review } ) => {
  
  const [deletePost, {}] = useDeletePostReviewMutation();

  const handleDelete = async (post: Reviews) => {

    try {
      await deletePost(post)
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  }

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAvatar}>
          <img src={icon} alt="Avatar" />
        </div>
        <div className={styles.reviewUserInfo}>
          <strong>{review.username}</strong>
        </div>
        <div className={styles.reviewRating}>
          <div className={styles.ratingBadge}>{review.personalRating}</div>
          <span className={styles.reviewDate}>{review.date}</span>
        </div>
      </div>

      <div className={styles.reviewBody}>
        <h3 className={styles.reviewTitle}>{review.titleReview}</h3>
        <p style={{fontSize: "17px"}}>
          {review.reviewFull}
        </p>
        <p><strong>Достоинства:</strong> <strong style={{fontSize: "17px", fontWeight: "400"}}>{review.reviewPlus}</strong></p>
        <p><strong>Недостатки:</strong> <strong style={{fontSize: "17px", fontWeight: "400"}}>{review.reviewMinus}</strong></p>
      </div>
      <div className={styles.deletePostBlock}>
        <button className={styles.deletePost} onClick={() => handleDelete(review)}>Удалить</button>
      </div>
    </div>
  )
}

export default ReviewsCard
