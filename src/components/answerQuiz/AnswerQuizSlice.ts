import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuizeService, { GetQuiz } from "../../service/QuizService";
import { QuestionData } from "../../service/QuizService";
import { RootState } from "../../store";

type initialStateQuestion = { 
    questions: QuestionData[],
    status: "idle" | "loading" | "error",
    loading: boolean,
    show: boolean,
    showEndedModal: boolean,
    index: number,
    correctAnswer: number
}

const initialState:initialStateQuestion = { 
    questions: [],
    status: "idle",
    loading: false,
    show: false,
    showEndedModal: false,
    index: 0,
    correctAnswer: 0
};

export const fetchQuestions = 
createAsyncThunk("question/fetchQuestion", async ({amount, category, difficulty}:GetQuiz) => { 
    const {getQuiz} = QuizeService();
    const res = await getQuiz(amount, category, difficulty );
    return res;
}
);

const setupFormSlice = createSlice({ 
    name: "setupForm",
    initialState,
    reducers:  {
        setLoading: (state, action) => { 
            state.loading = action.payload;
        },
        setShow: (state, action) => { 
            state.show = action.payload;
        },
        nextQuestion: (state) => { 
            state.index = state.index + 1;
            if( state.index > state.questions.length - 1) { 
                state.showEndedModal = true;
                state.index = 0;
                
            }
        },
        checkAnswerBtn: (state) => { 
            state.correctAnswer = state.correctAnswer + 1;
        },
        setModalEnded: (state, action) => { 
            state.showEndedModal = action.payload;
        },
        resetEror: (state, action) => { 
            state.status = action.payload;
        }

    },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchQuestions.pending, (state) => { 
                state.status = "loading";
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => { 
                if(action.payload) { 
                    state.questions = action.payload;
                    state.status = "idle";
                }
            })
            .addCase(fetchQuestions.rejected, (state) => { 
                state.status = "error";
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .addDefaultCase(() => {});
    }
});

export const {setLoading, setShow, nextQuestion, checkAnswerBtn, setModalEnded, resetEror} = setupFormSlice.actions;

export const selectSetupQuestions = (state:RootState ) => state.setupForm.questions;
export const selectSetupIndex = (state:RootState ) => state.setupForm.index;
export const selectSetupCorrectAnswer = (state:RootState ) => state.setupForm.correctAnswer;
export const selectSetupLoading = (state:RootState ) => state.setupForm.loading;
export const selectSetupShow = (state:RootState ) => state.setupForm.show;
export const selectSetupShowModalEndedModal = (state:RootState ) => state.setupForm.showEndedModal;
export const selectSetupStatus = (state:RootState ) => state.setupForm.status;

export default setupFormSlice.reducer;