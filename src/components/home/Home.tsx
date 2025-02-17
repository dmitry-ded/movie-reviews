import styles from "./home.module.css"
import SortByCategory from '../sortByCategory/SortByCategory'
import MovieCard from '../movieCard/MovieCard'
import { useGetFilmsQuery } from '../../services/FilmService'
import SortPopup from "../sortPopup/SortPopup"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useEffect, useState } from "react"

const Home = () => {

  const [page, setPage] = useState(1);
  let limit = 10;

  const searchValue = useSelector((state: RootState) => state.filterSlice.searchValue);
  const sortType = useSelector((state: RootState) => state.filterSlice.sortType);
  const category = useSelector((state: RootState) => state.filterSlice.category);

  const { data, error, isLoading } = useGetFilmsQuery({page, perPage: limit, searchValue, sortProperty: sortType.sortProperty, category});
  console.log(data);

  const getItemText = (count: number) => {
    let text;
    if (count === 1) text = "Найден 1 фильм";
    else if (count === 2) text = "Найдено 2 фильма";
    else if (count === 3) text = "Найдено 3 фильма";
    else if (count === 4) text = "Найдено 4 фильма";
    else if (count > 1 && count < 5) text = `Найдено ${count} фильмов`;
    else text = `Найдено ${count} фильмов`;

    const parts = text.split(/(\d+)/);

    return (
      <>
        {parts.map((part, index) =>
          /\d+/.test(part) ? (
            <span key={index} style={{ fontWeight: "800" }}>{part}</span> // Меняем цвет числа
          ) : (
            part
          )
        )}
      </>
    );
  }

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const totalPages = data ? Math.ceil(data.totalCount / limit) : 1;
  const totalItems = data ? data.totalCount : 0;

  if (isLoading) {
    return (<h1>Загрузака, пожалуйста подождите!</h1>)
  }

  if (error || !data) {
    return (<h1>Ошибка! Фильмы не найдены!</h1>)
  }

  return (
    <div className={styles.mainMovieBlock}>
      <div className={styles.movieBlock}>
        <div className={styles.mainMovieSortBlock}>
          <SortByCategory />
        </div>
        <div className={styles.movie}>
          <div className={styles.movieCouAndSort}>
            <span>{getItemText(totalItems)}</span>
            <SortPopup/>
          </div>
          { 
            data && data.films.map((el: any) => (
              <MovieCard key={el.id} film={el} />
            ))
          }
        </div>
        <div className={styles.pagination}>
          <div className={styles.countPage}>
            {
              Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`${styles.filmsPage} ${page === index + 1 ? styles.filmsPageActive : ''}`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))
            }
          </div>
          {/* <div className={styles.lastPage} onClick={() => (1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4L12 12L5 20" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4L19 12L12 20" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div> */}
          <div className={styles.buttonNextPrev}>
            {
              totalItems > 0 && (
                <div className={styles.buttonBlockPage}>
                  <button className={styles.buttonPrev} disabled={page === 1} onClick={handlePrevPage}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 19L8 12L15 5" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Назад
                  </button> 
                  <button className={styles.buttonPrev} disabled={page === totalPages} onClick={handleNextPage}>
                    Далее
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L16 12L9 19" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>  
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
