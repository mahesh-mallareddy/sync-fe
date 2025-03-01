import { configureStore } from "@reduxjs/toolkit";
import pageTypeSlice from "./pageTypeSlice";
import { combineReducers } from "@reduxjs/toolkit";


const reducer = combineReducers({
  pageType: pageTypeSlice.reducer,
});


const store = configureStore({
  reducer: reducer,
});

export default store;