import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import QuizeService, { GetQuiz } from "../../service/QuizService"
import { QuestionData } from "../../service/QuizService"
import { RootState } from "../../store"
import {_AllCategories} from '../../service/QuizService'

type initialStateQuestion = { 
    questions: QuestionData[],
    status: 'idle' | 'loading' | 'error',
    loading: boolean,
    show: boolean,
    showEndedModal: boolean,
    index: number,
    correctAnswer: number
}

const initialState:initialStateQuestion = { 
    questions: [],
    status: 'idle',
    loading: false,
    show: false,
    showEndedModal: false,
    index: 0,
    correctAnswer: 0
}
// export const fetchQuestions = createAsyncThunk<
//     GetQuiz, GetQuiz, {rejectValue: string}
// >('question/fetchQuestion', async ({url, amount}) => { 
//         const {getQuiz} = QuizeService()
//         const res = await getQuiz()
//         return res
//     }
   
// )

export const fetchQuestions = createAsyncThunk
    ('question/fetchQuestion', async ({amount, category, difficulty}:GetQuiz) => { 
        const {getQuiz} = QuizeService()
        const res = await getQuiz(amount, category, difficulty )
        return res
    }
    
)

// export const fetchQuestions = createAsyncThunk<
//     QuestionData[],
//     GetQuiz,
//     { rejectValue: string }
//     >   
//     ('question/fetchQuestion', async (settings, { rejectWithValue }) => { 
//         const {amount, category, difficulty} = settings
//         const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
//             const questions = await res.json()
//             console.log(questions.results.length)
//             if(questions.results.length < 1 ) { 
//                 console.log('awdawdaw')
//                 return rejectWithValue('error questions')
//             }
//             return questions.results
        //     .then((res:any) => res.json())
        //     .then((res) =>  {
        //         if(res.response_code === 2) { 
        //             throw new Error(`Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)`)
        //         }
        //         if(res.response_code === 1) { 
        //             throw new Error(`No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)`)
        //         }
        //         return res
        //     })
        //     .catch((err) => console.error(err))

        // return await res.results
//     }
    
// )

const setupFormSlice = createSlice({ 
    name: 'setupForm',
    initialState,
    reducers:  {
        setLoading: (state, action) => { 
            state.loading = action.payload
        },
        setShow: (state, action) => { 
            state.show = action.payload
            console.log(state.show)
        },
        nextQuestion: (state) => { 
            state.index = state.index + 1
            if( state.index > state.questions.length - 1) { 
                state.showEndedModal = true
                state.index = 0
                
            }
        },
        checkAnswerBtn: (state) => { 
            state.correctAnswer = state.correctAnswer + 1
        },
        setModalEnded: (state, action) => { 
            state.showEndedModal = action.payload
        }

    },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchQuestions.pending, (state) => { 
                state.status = 'loading'
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => { 
                state.questions = action.payload
                state.status = 'idle'
                console.log(action.payload)
            })
            .addCase(fetchQuestions.rejected, (state) => { 
                state.status = 'error'
                console.log(state.status)
            })
            .addDefaultCase(() => {})
    }
})

export const {setLoading, setShow, nextQuestion, checkAnswerBtn, setModalEnded} = setupFormSlice.actions

export const selectSetupQuestions = (state:RootState ) => state.setupForm.questions
export const selectSetupIndex = (state:RootState ) => state.setupForm.index
export const selectSetupCorrectAnswer = (state:RootState ) => state.setupForm.correctAnswer
export const selectSetupLoading = (state:RootState ) => state.setupForm.loading
export const selectSetupShow = (state:RootState ) => state.setupForm.show
export const selectSetupShowModalEndedModal = (state:RootState ) => state.setupForm.showEndedModal
export const selectSetupStatus = (state:RootState ) => state.setupForm.status

export default setupFormSlice.reducer