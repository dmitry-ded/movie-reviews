import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFilm } from "../models/IFilm";


export const filmsAPI = createApi({
  reducerPath: "filmsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Films"],
  endpoints: (builder) => ({
    getFilms: builder.query<IFilm[], number>({
      query: (limit: number = 5) => (`films?_limit=${limit}`),
      providesTags: (result) => ["Films"],
    }),
    getFilmById: builder.query<IFilm, number>({
      query: (id) => (`films?id=${id}`),
      transformResponse: (response: IFilm[]) => response[0],
      providesTags: (result, error, id) => [{ type: "Films", id }],
    }),
  })
})

export const { useGetFilmsQuery, useGetFilmByIdQuery } = filmsAPI;