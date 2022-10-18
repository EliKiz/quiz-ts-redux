import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import QuizeService from "../../service/QuizService"
import { QuestionData } from "../../service/QuizService"
import { RootState } from "../../store"
import {_AllCategories} from '../../service/QuizService'

type initialStateQuestion = { 
    questions: QuestionData[],
    status: 'idle' | 'loading' | 'error',
    loading: boolean,
    show: boolean,
    index: number
}

const initialState:initialStateQuestion = { 
    questions: [],
    status: 'idle',
    loading: false,
    show: false,
    index: 0
}

export const fetchQuestions = createAsyncThunk(
    'question/fetchQuestion',
    async () => { 
        const {getQuiz} = QuizeService()
        console.log('thunk')
        return await getQuiz()
    }
)

const setupFormSlice = createSlice({ 
    name: 'setupForm',
    initialState,
    reducers:  {
        setLoading: (state, action) => { 
            state.loading = action.payload
        },
        setShow: (state) => { 
            state.show = true
        },
        setUnShow: (state) => { 
            state.show = false
        },
        nextQuestion: (state) => { 
            console.log(state.index)
            state.index = state.index + 1
        }

    },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchQuestions.pending, (state) => { 
                state.status = 'loading'
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => { 
                state.questions = action.payload
            })
            .addCase(fetchQuestions.rejected, (state) => { 
                state.status = 'error'
            })
            .addDefaultCase(() => {})
    }
})

export const {setLoading, setShow, nextQuestion} = setupFormSlice.actions

export const selectSetupQuestions = (state:RootState ) => state.setupForm.questions
export const selectSetupIndex = (state:RootState ) => state.setupForm.index
export const selectSetupLoading = (state:RootState ) => state.setupForm.loading
export const selectSetupShow = (state:RootState ) => state.setupForm.show

export default setupFormSlice.reducer