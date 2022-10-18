import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuizeService, { RequestCategories,  } from '../../service/QuizService'
import { RootState } from "../../store";
import {SettingData} from '../setupQuiz/SetupQuiz'


type InitialState = { 
    listCategory: RequestCategories[],
    status: 'idle' | 'loading' | 'error',
    dataSettings: SettingData,
    error: string
}

const initialState:InitialState = { 
    listCategory: [],
    status: 'idle',
    dataSettings: {
        amountQuestion: 0,
        category: '',
        difficulty: ''
    },
    error: ''
}

export const fetchcategoryList = createAsyncThunk(
    'categoryList/fetchcategoryList',
    async () => { 
        const {getAllcategoryList} = QuizeService()
        return await getAllcategoryList()
    }
)


const setupQuizSlice = createSlice({ 
    name: 'categoryList',
    initialState,
    reducers: {
        setDataSettings: (state, action) =>  {
            state.dataSettings = action.payload
        }
    },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchcategoryList.pending, (state) => { 
                state.status = 'loading'
            })
            .addCase(fetchcategoryList.fulfilled, (state, action) => { 
                state.listCategory = action.payload
                state.status = 'idle'
                
            })
            .addCase(fetchcategoryList.rejected, (state) => { 
                state.status = 'error'
            })
            .addDefaultCase(() => {} )
    }
})

// const {actions, reducer} = setupQuizSlice

export const { 
    setDataSettings
} = setupQuizSlice.actions

export const selectCategoriesList = (state:RootState ) => state.categoryList.listCategory
export const selectCategoriesListStatus = (state:RootState ) => state.categoryList.status
export const selectCategoriesListDataSettings = (state:RootState ) => state.categoryList.dataSettings


export default setupQuizSlice.reducer