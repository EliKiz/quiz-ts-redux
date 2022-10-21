
import ModalEnded from '../modalEnded/ModalEnded';
import SetupForm from '../setupForm/SetupForm';
import { selectSetupLoading, selectSetupShow, selectSetupShowModalEndedModal } from '../setupForm/setupFormSlice';
import SetupQuiz from '../setupQuiz/SetupQuiz';
import Spinner from '../Spinner/Spinner';

import './app.scss';
import { useAppSelector } from './hooks';


function App() {
    const show = useAppSelector(selectSetupShow)
    const endedModal = useAppSelector(selectSetupShowModalEndedModal)
    const content = show ? <SetupForm/> : <SetupQuiz/>
    const modal = endedModal ? <ModalEnded/> : null

    // console.log(show)

    return (
        <div className="App">
            <main>
                {content}
                <ModalEnded/>
            </main>
        </div>
    );
}

export default App;
