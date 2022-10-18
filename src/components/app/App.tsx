
import SetupForm from '../setupForm/SetupForm';
import { selectSetupLoading, selectSetupShow } from '../setupForm/setupFormSlice';
import SetupQuiz from '../setupQuiz/SetupQuiz';
import Spinner from '../Spinner/Spinner';

import './app.scss';
import { useAppSelector } from './hooks';


function App() {
    const show = useAppSelector(selectSetupShow)

    const content = show ? <SetupForm/> : <SetupQuiz/>
    
    return (
        <div className="App">
            <main>
                {content}
            </main>
        </div>
    );
}

export default App;
