import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { filmsAPI } from "../services/FilmService";
import filterSlice from "../redux/slices/filterSlice"

export const store = configureStore({
  reducer: {
    [filmsAPI.reducerPath]: filmsAPI.reducer,
    filterSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmsAPI.middleware)
}) 

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();