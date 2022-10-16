
import { useAppSelector, useAppDispatch } from '../app/hooks'

import getAllCategories, { RequestCategories } from '../../service/QuizService'
import Spinner from '../Spinner/Spinner'
import * as Yup from 'yup'
import { fetchcategoryList, selectCategoriesList, selectCategoriesListStatus } from './setupQuizeSlice'
import { useEffect, useState } from 'react'

import './setupQuiz.scss'

type SettingData = { 
    amountQuestion:number,
    category: string,
    difficulty: string
}

const SetupQuiz = () => { 

    const [amountQuestion, setAmountQuestion] = useState<number>(5)
    const [category, setCategory] = useState('9')
    const [difficulty, setDifficulty] = useState('easy')

    const dispatch = useAppDispatch()
    
    useEffect(() => { 
        dispatch(fetchcategoryList())
            // .then((res) => console.log(res.payload))
    }, [])

    const allCategories = useAppSelector(selectCategoriesList)
    const statusLoading = useAppSelector(selectCategoriesListStatus)

    if(allCategories.length === 0) { 
        return <Spinner/>
    }

    const submitForm = (e:React.ChangeEvent<HTMLFormElement>) => { 
        e.preventDefault()
        console.log()
    }

    const dataSettings:SettingData = { 
        amountQuestion,
        category,
        difficulty
    }
    
    console.log(dataSettings)

    let schema = Yup.object().shape({ 
        number: Yup.string().required()
    })

    schema
        .isValid(dataSettings)
        .then((res) => console.log(res))
        .catch((e) => console.error(e))

    // const handleClick  = (event:React.MouseEvent<HTMLElement>) => { 
    //     console.log(event.currentTarget.id);
    // }

    // const handleChange = (event:React.ChangeEvent<HTMLElement>) => { 
    //     console.log(event.currentTarget.id)
    // }

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
        
        setAmountQuestion(res)

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
                        value={amountQuestion} />
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
                        onChange={(event) => {setDifficulty(event.target.value)}}>
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