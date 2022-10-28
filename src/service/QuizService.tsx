export const _AllCategories = "https://opentdb.com/api_category.php";
export const _baseUrl = "https://opentdb.com/api.php?";
export const _BaseAmount = "5";
export const _BaseCategory = "9";
export const _BaseDifficulity = "easy";

export type RequestCategories = {
    id: string;
    name: string;
};

export type GetQuiz = {
    amount: number;
    category: string;
    difficulty: string;
};

export type QuestionData = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

const QuizeService = () => {
    const getQuiz = async (
        amount = 5,
        category = "9",
        difficulty = "easy"
    ): Promise<QuestionData[]> => {
        try {
            const res = await fetch(
                `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
            )
                .then((res) => res.json())
                .then((res) => {
                    if (res.response_code === 2) {
                        throw new Error(
                            "Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)"
                        );
                    }
                    if (res.response_code === 1) {
                        throw new Error(
                            "No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)"
                        );
                    }
                    return res;
                });

            return await res.results;
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    const getAllcategoryList = async (): Promise<RequestCategories[]> => {
        const res = await fetch(`${_AllCategories}`)
            .then((res) => res.json())
            .then((res) => res.trivia_categories);
        return res;
    };

    return { getQuiz, getAllcategoryList };
};

export default QuizeService;
