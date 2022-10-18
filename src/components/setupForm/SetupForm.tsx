 
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Spinner from '../Spinner/Spinner'
import { fetchQuestions, selectSetupLoading, selectSetupQuestions, selectSetupShow, nextQuestion, selectSetupIndex } from './setupFormSlice'
import { _AllCategories } from '../../service/QuizService'
import { selectCategoriesListDataSettings } from '../setupQuiz/setupQuizeSlice'

import './setupForm.scss'


const SetupForm = () => {   


    const dispatch = useAppDispatch()

    const data = useAppSelector(selectSetupQuestions)
    const dataSettings = useAppSelector(selectCategoriesListDataSettings)
    const index = useAppSelector(selectSetupIndex)
    const loading = useAppSelector(selectSetupLoading)
    const show = useAppSelector(selectSetupShow)

    const {amountQuestion, category, difficulty} = dataSettings

    useEffect(() => { 
        dispatch(fetchQuestions())
    }, [])


    if(data.length === 0) { 
        return <Spinner/>
    }
    console.log(index)   
    const {question, correct_answer, incorrect_answers} = data[index]
    const allAnswers = [correct_answer, ...incorrect_answers]

  

    const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => { 
        // const { value} = (e.target as HTMLButtonElement)
        const target = e.currentTarget.value
        if(target === correct_answer) {
            dispatch(nextQuestion())
                   
        }else { 

        }
    }

    const renderButtonsAnswers = (AnswersArray:string[]) => { 
        return AnswersArray.map((answer, index) => { 
            return ( 
                <button 
                    key={index} 
                    value={answer}
                    className='answer-btn'
                    onClick={e => checkAnswer(e)}
                    dangerouslySetInnerHTML={{__html:answer}}>
                </button>
            )
        })
    }
    const buttonsAnswers = renderButtonsAnswers(allAnswers)

    return ( 
        <div>
            <section className='quiz'> 
                <p>Correct Answers {} </p>
                <article className='container'>
                    <h2 dangerouslySetInnerHTML={{__html:question}}></h2>
                    <div className='btn-container'>
                        {buttonsAnswers}
                    </div>
                </article>
                <button
                    className='next-question'>Next</button>
            </section>
        </div>
        
    )

}

export default SetupForm