import styles from './app.module.css'
import { Route, Routes } from 'react-router-dom'
import MainLayouts from './components/layouts/MainLayouts'
import Home from './components/home/Home'
import FullReviewsMovieCard from './components/fullReviewsMovie/FullReviewsMovieCard'
import PostReview from './components/postReview/PostReview'

function App() {

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<MainLayouts />} >
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<FullReviewsMovieCard />}/>
          <Route path='/postReview' element={<PostReview />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
