import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../Spinner/Spinner";
import {
    fetchQuestions,
    selectSetupQuestions,
    nextQuestion,
    selectSetupIndex,
    selectSetupCorrectAnswer,
    checkAnswerBtn,
    selectSetupStatus,
    setShow,
    resetEror,
} from "./AnswerQuizSlice";
import { selectCategoriesListDataSettings } from "../setupQuiz/setupQuizeSlice";

import "./AnswerQuiz.scss";

const SetupForm = () => {
    const dispatch = useAppDispatch();

    const data = useAppSelector(selectSetupQuestions);
    const dataSettings = useAppSelector(selectCategoriesListDataSettings);
    const index = useAppSelector(selectSetupIndex);
    const correctAnswer = useAppSelector(selectSetupCorrectAnswer);
    const status = useAppSelector(selectSetupStatus);

    const { amount, category, difficulty } = dataSettings;

    useEffect(() => {
        dispatch(fetchQuestions({ amount, category, difficulty }));
    }, []);

    useEffect(() => {
        if (status === "error") {
            dispatch(setShow(false));
            dispatch(resetEror("idle"));
        }
    }, [status]);

    if (data.length === 0) {
        return <Spinner />;
    }

    const { question, correct_answer, incorrect_answers } = data[index];
    const allAnswers = [correct_answer, ...incorrect_answers].sort(() =>
        Math.random() > 0.5 ? 1 : -1
    );

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.value;
        dispatch(nextQuestion());
        if (target === correct_answer) {
            dispatch(checkAnswerBtn());
        }
    };
    const nextClick = () => {
        dispatch(nextQuestion());
    };

    const renderButtonsAnswers = (answers: string[]) => {
        return answers.map((answer, index) => {
            return (
                <button
                    key={index}
                    value={answer}
                    className="answer-btn"
                    onClick={(e) => checkAnswer(e)}
                    dangerouslySetInnerHTML={{ __html: answer }}></button>
            );
        });
    };
    const buttonsAnswers = renderButtonsAnswers(allAnswers);

    return (
        <div>
            <section className="quiz">
                <p>
                    Correct Answers {correctAnswer}/{index}{" "}
                </p>
                <article className="container">
                    <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
                    <div className="btn-container">{buttonsAnswers}</div>
                </article>
                <button className="next-question" onClick={nextClick}>
                    Next
                </button>
            </section>
        </div>
    );
};

export default SetupForm;
