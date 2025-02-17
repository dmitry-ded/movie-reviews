import icon from "../../assets/5.jpg"
import styles from "./postReview.module.css"
import { Link, useParams } from 'react-router-dom'
import { useCreatePostReviewMutation, useGetFilmByIdQuery } from '../../services/FilmService'
import { useEffect, useRef, useState } from "react"
import { RootState, useAppDispatch } from "../../redux/store"
import { setRatingReview } from "../../redux/slices/filterSlice"
import { useSelector } from "react-redux"

const popupRating = [
  {rating: '1-Ужасно'},
  {rating: '2-Плохо'},
  {rating: '3-Средне'},
  {rating: '4-Хорошо'},
  {rating: '5-Отлично'},
  ];

const PostReview: React.FC = () => {

  const { id } = useParams();
  const numberId = id ? parseInt(id, 10) : 1;
  const { data, error, isLoading } = useGetFilmByIdQuery(numberId);
  const [createPost, {}] = useCreatePostReviewMutation();

  const [titleReview, setTitleReview] = useState('');
  const [textReview, setTextReview] = useState('');
  const [plusReview, setPlusReview] = useState('');
  const [minusReview, setMinusReview] = useState('');

  const sortRef = useRef<HTMLDivElement>(null);

  const [charCount, setCharCount] = useState(0);
  
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useAppDispatch();
  const rating = useSelector((state: RootState) => state.filterSlice.ratingReview);

  const handleInputChangeTitle = (e: any) => {
    setTitleReview(e.target.value);
  };
  const handleInputChangeText = (e: any) => {
    setCharCount(e.target.value.length);
    setTextReview(e.target.value);
  };
  const handleInputChangePlus = (e: any) => {
    setPlusReview(e.target.value);
  };
  const handleInputChangeMinus = (e: any) => {
    setMinusReview(e.target.value);
  };
  
  const hidePopup = (i: string) => {
    dispatch(setRatingReview(i));
    setIsVisible(false);
  };

  const postReview = async () => {

    const userName = prompt("Введите никнейм");

    const isConfirm = confirm("Вы действительно хотите опубликовать?");
    if (!isConfirm || !userName) {
      return;
    }

    const ratingNumber = parseInt(rating, 10);
    const currentDate = new Date().toLocaleDateString();

    const min = 3;
    const max = 100000;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    
    const reviewData = {
      id: randomId,
      filmId: Number(id),
      username: userName,
      date: currentDate,
      titleReview: titleReview,
      reviewFull: textReview,
      reviewPlus: plusReview,
      reviewMinus: minusReview,
      personalRating: String(ratingNumber),
    }
    await createPost(reviewData);

    console.log(reviewData);
    setTitleReview("");
    setTextReview("");
    setPlusReview("");
    setMinusReview("");
  }
    
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
          setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  console.log(rating);
  
  
  return (
    <div className={styles.mainPostRewiews}>
      <div className={styles.postRewiewsBlock}>
        <h2 style={{paddingTop: "1rem"}}>Написать отзыв</h2>
        <div className={styles.movieNameBlock}>
          <Link to={`/product/${id}`}>
            <img src={icon} alt="" />
          </Link>
          <Link to={`/product/${id}`}>
            <h2 className={styles.movieName}>
              {
                isLoading ? ("Загрузка") : (<>{data?.title} ({data?.date})</>)
              }
              </h2>
          </Link>
        </div>
        <div className={styles.mainReviewBlock}>
          <div className={styles.headerPostReview}>
            <h4>Общая оценка: </h4>
            <div ref={sortRef} className={styles.sort} >
              <div className={styles.selectionOfSorting} onClick={() => setIsVisible(!isVisible)}>
                <span>{rating}</span>
                {
                  isVisible ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 15L12 8L5 15" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 9L12 16L19 9" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              </div>
                {
                  isVisible && (
                    <div className={styles.sortPopup}>
                      <ul>
                        {
                          popupRating.map((el, index) => {
                            return (
                              <li key={index} onClick={() => hidePopup(el.rating)}>
                                {el.rating}
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                }
            </div>
          </div>
          <div className={styles.reviewItem}>
            <h4>Ваше общее впечатление: </h4>
            <input value={titleReview} onChange={handleInputChangeTitle} placeholder="Заголовок отзыва от 1 до 15 слов" />
          </div>
          <div className={styles.reviewItem}>
            <div style={{display: "flex", alignItems: "center", gap: ".2rem"}}>
              <h4>Текст отзыва:</h4>
              <span style={{fontSize: "smaller", fontWeight: "300", color: "#8d9399"}}>(20 слов минимум)</span>
            </div>
            <div className={styles.fullReview}>
              <label htmlFor="">
                <textarea className={styles.textareaB} rows={4} cols={40} value={textReview} onChange={handleInputChangeText} name="" id="" />
              </label>
              <div style={{ textAlign: "right", fontSize: "smaller", color: "#777", padding: "0 .5rem .5rem 0"}}>
                Символов: {charCount}
              </div>
            </div>
          </div>
          <div className={styles.reviewItem}>
            <div style={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <h4>Плюсы: </h4>
              <span style={{ fontSize: "smaller", fontWeight: "300", color: "#8d9399" }}>
                (15 слов максимум)
              </span>
            </div>
            <label htmlFor="">
              <textarea 
                name="moviePlus" 
                className={styles.textareaField} 
                rows={2}
                value={plusReview}
                onChange={(e) => {
                  const words = e.target.value.split(/\s+/).filter(Boolean);
                  if (words.length > 15) {
                    e.target.value = words.slice(0, 15).join(" ");
                  }
                  handleInputChangePlus(e)
                }}
              />
            </label>
          </div>
          <div className={styles.reviewItem}>
            <div style={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
              <h4>Минусы: </h4>
              <span style={{ fontSize: "smaller", fontWeight: "300", color: "#8d9399" }}>
                (15 слов максимум)
              </span>
            </div>
            <label htmlFor="">
              <textarea 
                name="movieMinus" 
                className={styles.textareaField} 
                rows={2}
                value={minusReview}
                onChange={(e) => {
                  const words = e.target.value.split(/\s+/).filter(Boolean);
                  if (words.length >= 15) {
                    e.target.value = words.slice(0, 15).join(" ");
                  } 
                  handleInputChangeMinus(e)
                }}
              />
            </label>
          </div>
          <div className={styles.buttonBlock}>
            {/* <button className={styles.button}><img src={pencil}/>Опубликовать</button> */}
            <button onClick={postReview} className={styles.button}>Опубликовать</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostReview
