export interface IFilm {
  id: string,
  title: string,
  date: string,
  rating: number,
  ageRating: number,
  genre: string,
  category: string,
  reviews: Reviews[],
}

export interface Reviews {
  id: number,
  filmId: number,
  date: string,
  personalRating: string,
  reviewFull: string,
  reviewMinus: string,
  reviewPlus: string,
  username: string,
  titleReview: string,
}