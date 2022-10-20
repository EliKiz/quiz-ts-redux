
import { useAppSelector, useAppDispatch } from '../app/hooks'

import getAllCategories, { RequestCategories } from '../../service/QuizService'
import Spinner from '../Spinner/Spinner'
// import * as Yup from 'yup'
import { fetchcategoryList, setDataSettings,selectCategoriesList, selectCategoriesListStatus, selectCategoriesListDataSettings } from './setupQuizeSlice'
import { useEffect, useState } from 'react'

import { selectSetupLoading, selectSetupShow, selectSetupStatus, setLoading, setShow } from '../setupForm/setupFormSlice'

import './setupQuiz.scss'

export type SettingData = { 
    amount:number,
    category: string,
    difficulty: string
}

const SetupQuiz = () => { 

    const [amount, setAmount] = useState<number>(50)
    const [category, setCategory] = useState('9')
    const [difficulty, setDifficulty] = useState('easy')

    const dispatch = useAppDispatch()
    
    useEffect(() => { 
        dispatch(fetchcategoryList())
            // .then((res) => console.log(res.payload))
    }, [])

    const allCategories = useAppSelector(selectCategoriesList)
    const statusLoading = useAppSelector(selectCategoriesListStatus)
    const status = useAppSelector(selectSetupStatus)

    const show = useAppSelector(selectSetupShow)
    const loading = useAppSelector(selectSetupLoading)

    
    if(allCategories.length === 0 ) { 
        return <Spinner/>
    }

    const dataSettings:SettingData = { 
        amount,
        category,
        difficulty
    }


    const submitForm = (e:React.ChangeEvent<HTMLFormElement>) => { 
        e.preventDefault()
        dispatch(setDataSettings(dataSettings))
        dispatch(setShow(true))
    }
    // console.log(show)

    const error = status === 'error' ? <p className='error'>Can't Generate Questions, Please Try Different Options</p> : null

    const optionsValueContent = (arr:RequestCategories[], status:string) => { 
        return arr.map(({id, name}) => { 
            return ( 
                <option 
                key={id} 
                // onClick={(event) => handleClick(event)}
                value={id}>{name}
                </option>
            )
        })
        
    }

    const handleAmountQuestion = (event:React.ChangeEvent<HTMLInputElement>) => { 
        let {value, min, max} = event.target;
        let res = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setAmount(res)
    }   

    const content = optionsValueContent(allCategories, statusLoading )

    return ( 
        <section className='quiz quiz-small'>
            <h1 className='title-quiz'>Setup quiz</h1>
            <form 
                className='setup-form' 
                action=""
                onSubmit={submitForm}>
                <div className='form-control'>
                    <label htmlFor="amountQuestion">number of question (Max. 50) </label>
                    <input 
                        onChange={(event) => handleAmountQuestion(event)}
                        type="number" 
                        id='number'
                        required
                        min='1'
                        max='50'
                        className='form-input' 
                        value={amount} />
                </div>
                <div className='form-control'>
                    <label htmlFor="amountQuestion">Category</label>
                    
                    <select 
                        id='category'
                        name="category" 
                        className='form-input' 
                        onChange={(event) => setCategory(event.target.value) }>
                        {content}
                    </select>                 
                <div/>
                    
                </div>
                <div className='form-control'>
                    <label htmlFor="amountQuestion">Select Difficulty</label>
                    <select 
                        id='difficulty'
                        name="difficulty" 
                        className='form-input' 
                        defaultValue={'hard'}
                        onChange={(event) => {setDifficulty(event.target.value)}}>
                            <option value='easy'>
                                easy
                            </option>
                            <option value='medium'>
                                medium
                            </option>
                            <option value='hard' >
                                hard
                            </option>
                    </select>
                </div>
                <button type='submit' className='submit-btn'>
                    start
                </button>
                {error}
            </form>
        </section>
    )

        

}

export default SetupQuiz