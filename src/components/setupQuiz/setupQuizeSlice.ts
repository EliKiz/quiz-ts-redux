import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuizeService, { RequestCategories,  } from '../../service/QuizService'
import { RootState } from "../../store";



type InitialState = { 
    list: RequestCategories[],
    status: 'idle' | 'loading' | 'error' 
    difficulty: 'easy' | 'noraml' | 'hard'
}

const initialState:InitialState = { 
    list: [],
    status: 'idle',
    difficulty: 'easy',
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
    reducers: { },
    extraReducers: (builder) => { 
        builder
            .addCase(fetchcategoryList.pending, (state) => { 
                state.status = 'loading'
            })
            .addCase(fetchcategoryList.fulfilled, (state, action) => { 
                state.list = action.payload
                state.status = 'idle'
                
            })
            .addCase(fetchcategoryList.rejected, (state) => { 
                state.status = 'error'
            })
    }
})

// const {actions, reducer} = setupQuizSlice

// export const { 

// } = actions

export const selectCategoriesList = (state:RootState ) => state.categoryList.list
export const selectCategoriesListStatus = (state:RootState ) => state.categoryList.status
export const selectCategoriesListDifficulty = (state:RootState ) => state.categoryList.difficulty


export default setupQuizSlice.reducer