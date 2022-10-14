
import { useAppSelector, useAppDispatch } from '../app/hooks'

import getAllCategories, { RequestCategories } from '../../service/QuizService'
import Spinner from '../Spinner/Spinner'
import './setupQuiz.scss'
import { fetchcategoryList, selectCategoriesList, selectCategoriesListStatus } from './setupQuizeSlice'
import { useEffect } from 'react'



const SetupQuiz = () => { 

    const dispatch = useAppDispatch()
    
    useEffect(() => { 
        dispatch(fetchcategoryList())
    }, [])

    const allCategories = useAppSelector(selectCategoriesList)
    const statusLoading = useAppSelector(selectCategoriesListStatus)

    if(allCategories.length === 0) { 
        return <Spinner/>
    }
  
    const optionsValueContent = (arr:RequestCategories[], status:string) => { 
        return arr.map(({id, name}) => { 
            return ( 
                <option key={id} value="name">{name}</option>
            )
        })
        
    }

    const content = optionsValueContent(allCategories, statusLoading )

    return ( 
        <section className='quiz quiz-small'>
            <h1 className='title-quiz'>Setup quiz</h1>

            <form className='setup-form' action="">
                <div className='form-control'>
                    <label htmlFor="amount">number of question</label>
                    <input 
                        type="number" 
                        className='form-input' 
                        min={5} 
                        max={50} 
                        value={5} />
                </div>
                <div className='form-control'>
                    <label htmlFor="amount">Category</label>
                    
                    <select 
                        id='category'
                        name="category" 
                        className='form-input' >
                        {content}
                    </select>                 
                <div/>
                    
                </div>
                <div className='form-control'>
                    <label htmlFor="amount">Select Difficulty</label>
                    <select 
                        id='difficulty'
                        name="difficulty" 
                        className='form-input' >
                            <option value='easy'>
                                easy
                            </option>
                            <option value='medium'>
                                medium
                            </option>
                            <option value='hard'>
                                hard
                            </option>
                    </select>
                </div>
                <button type='submit' className='submit-btn'>
                    start
                </button>
            </form>

        </section>
    )
}

export default SetupQuiz