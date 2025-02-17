import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFilm, Reviews } from "../models/IFilm";
import { SortEnumProperty } from "../redux/slices/filterSlice";


export const filmsAPI = createApi({
  reducerPath: "filmsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Films"],
  endpoints: (builder) => ({
    getFilms: builder.query<{ films: IFilm[], totalCount: number },  { page?: number; perPage?: number; searchValue?: string; sortProperty?: SortEnumProperty, category: string }>({
      query: ({ page = 1, perPage = 10, searchValue = "", sortProperty = SortEnumProperty.RATING_DESC, category = "Фильм" }) => {
        const searchParam = searchValue ? `&title=${encodeURIComponent(searchValue)}` : "";

        const sortOrder = sortProperty.startsWith("-") ? "desc" : "asc";
        const sortParam = `&_sort=${sortProperty.replace("-", "")}&_order=${sortOrder}`;
        const sortCategory = `&_category=${encodeURIComponent(category)}`
        
        const query = `/films?_page=${page}&_limit=${perPage}${searchParam}${sortParam}${sortCategory}`;

        return query;
      },
      providesTags: ["Films"],
      transformResponse: (response: IFilm[], meta) => {
        const totalCount = meta?.response?.headers.get('X-Total-Count') || response.length;
        return {
          films: response,
          totalCount: Number(totalCount),
        };
      },
    }),
    getFilmById: builder.query<IFilm, number>({
      query: (id) => (`films?id=${id}`),
      transformResponse: (response: IFilm[]) => response[0],
      providesTags: (id) => [{ type: "Films", id: id?.toString() || "1" }],
    }),
    createPostReview: builder.mutation<Reviews, Reviews>({
      query: (post) => ({
        url: `/films/${post.filmId}/review`,
        
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Films"],
    }),
    deletePostReview: builder.mutation<Reviews, Reviews>({
      query: (post) => ({
        url: `/films/${post.filmId}/review/${post.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Films"],
    })
  })
})

export const { useGetFilmsQuery, useGetFilmByIdQuery, useCreatePostReviewMutation, useDeletePostReviewMutation } = filmsAPI;