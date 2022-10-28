import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    selectSetupCorrectAnswer,
    selectSetupQuestions,
    selectSetupShowModalEndedModal,
    setModalEnded,
    setShow,
} from "../setupForm/setupFormSlice";
import "./modalEnded.scss";

const ModalEnded = () => {
    const dispatch = useAppDispatch();
    const endedModal = useAppSelector(selectSetupShowModalEndedModal);
    const data = useAppSelector(selectSetupQuestions);
    const correctAnswer = useAppSelector(selectSetupCorrectAnswer);

    const correctPercent = (correctAnswer * 100) / data.length;

    const playAgain = () => {
        dispatch(setModalEnded(false));
        dispatch(setShow(false));
    };

    const content = endedModal ? (
        <div className="modal-container isOpen">
            <div className="modal-content">
                <h2>congrats</h2>
                <p>You answered {correctPercent}% of questions correct</p>
                <button className="try-again" onClick={playAgain}>
                    Play again
                </button>
            </div>
        </div>
    ) : null;

    return content;
};

export default ModalEnded;
