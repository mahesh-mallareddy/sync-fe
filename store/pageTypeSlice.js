import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  pageType: "",
  title: "",
};

const pageTypeSlice = createSlice({
  name: "pageType",
  initialState: intialState,
  reducers: {
    changePageType(state, action) {
      state.pageType = action.payload.type;
      state.title = action.payload.title;
      // state.rightButton = action.payload.rightButton;
    },
  },
});

export const { changePageType } = pageTypeSlice.actions;

export default pageTypeSlice;