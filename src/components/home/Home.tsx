import styles from "./home.module.css"
import Sort from '../sort/Sort'
import MovieCard from '../movieCard/MovieCard'
import { useGetFilmsQuery } from '../../services/FilmService'

const Home = () => {

  const { data, error, isLoading } = useGetFilmsQuery(20);

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
          <Sort />
        </div>
        <div className={styles.movie}>
          <h4 className={styles.countMovie}>Найдено {data?.length} фильма</h4>
          { 
            data && data.map((el: any) => (
              <MovieCard key={el.id} film={el} />
            ))
          }
        </div>
      </div>
      <div className={styles.pagination}>
        1 2 3 4 5 6 7 
      </div>
    </div>
  )
}

export default Home
