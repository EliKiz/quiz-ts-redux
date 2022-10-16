

const _AllCategories = 'https://opentdb.com/api_category.php'
const _baseUrl = "https://opentdb.com/api.php?"
const _BaseAmount = 'amount=10'
const _BaseCategory = '&category=25'
const _BaseDifficulity = '&difficulty=easy'


export type RequestCategories = { 
    id: string,
    name: string
}

const QuizeService = () => { 

    const getQuiz = async () => { 
        const res = await fetch(`${_baseUrl}${_BaseAmount}${_BaseCategory}${_BaseDifficulity}`)
        return res.json()
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