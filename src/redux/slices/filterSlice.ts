import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortEnumProperty {
  RATING_DESC = "-rating", 
  RATING_ASC = "rating",   
  REVIEW_DESC = "-reviews", 
  REVIEW_ASC = "reviews"    
}

export type Sort = {
  name: string,
  sortProperty: SortEnumProperty;
}

export interface FilterSliceState {
  searchValue: string,
  category: string,
  ratingReview: string,
  sortType: Sort,
}

const initialState: FilterSliceState = {
  searchValue: "",
  category: "Фильм",
  ratingReview: "1-Ужасно",
  sortType: {
    name: "рейтингу (5⟶1)",
    sortProperty: SortEnumProperty.RATING_DESC,
  },
}

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, actions: PayloadAction<string>) {
      state.searchValue = actions.payload;
    },
    setSortType(state, actions: PayloadAction<Sort>) {
      state.sortType = actions.payload;
    },
    setCategory(state, actions: PayloadAction<string>) {
      state.category = actions.payload;
    },
    setRatingReview(state, actions: PayloadAction<string>) {
      state.ratingReview = actions.payload;
    }
  }
})

export const { setSearchValue, setSortType, setCategory, setRatingReview } = filterSlice.actions;

export default filterSlice.reducer;