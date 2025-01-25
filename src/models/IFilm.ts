export interface IFilm {
  id: string,
  title: string,
  date: string,
  rating: number,
  reviews: Reviews[],
}

export interface Reviews {
  id: number,
  date: string,
  personalRating: string,
  reviewFull: string,
  reviewMinus: string,
  reviewPlus: string,
  username: string,
  titleReview: string,
}