import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import setupeQuizReducer from "../components/setupQuiz/setupQuizeSlice";
import setupFormReducer from "../components/answerQuiz/AnswerQuizSlice";

export const store = configureStore({
    reducer: {
        categoryList: setupeQuizReducer,
        setupForm: setupFormReducer
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