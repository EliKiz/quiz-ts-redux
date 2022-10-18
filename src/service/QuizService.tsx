

export const _AllCategories = 'https://opentdb.com/api_category.php'
export const _baseUrl = "https://opentdb.com/api.php?"
export const _BaseAmount = '5'
export const _BaseCategory = '9'
export const _BaseDifficulity = 'easy'


export type RequestCategories = { 
    id: string,
    name: string
}

export type GetQuiz = { 
    url: string
    amount: string
    category: string
    difficulty: string
}

export type QuestionData = { 
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

const QuizeService = () => { 

    const getQuiz = async (url = "https://opentdb.com/api.php?", amount = "5", category = "9", difficulty = "easy" ):Promise<QuestionData[]> => { 
        const res = await fetch(`${url}amount=${amount}&category=${category}&difficulty=${difficulty}`)
            .then((res) => res.json())
            .then((res) => res.results)
        return res 
    }

    const getAllcategoryList = async ():Promise<RequestCategories[]> => { 
        const res = await fetch(`${_AllCategories}`)
            .then((res) => res.json())
            .then((res) => res.trivia_categories)
        return res
    }


    return {getQuiz, getAllcategoryList}

}

export default QuizeService