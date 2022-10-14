import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import setupeQuizReducer from '../components/setupQuiz/setupQuizeSlice'


export const store = configureStore({
  reducer: {
    categoryList: setupeQuizReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;