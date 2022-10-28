import ModalEnded from "../modalEnded/ModalEnded";
import SetupForm from "../setupForm/SetupForm";
import { selectSetupShow } from "../setupForm/setupFormSlice";
import SetupQuiz from "../setupQuiz/SetupQuiz";

import { useAppSelector } from "./hooks";
import "./app.scss";

function App() {
    const show = useAppSelector(selectSetupShow);
    const content = show ? <SetupForm /> : <SetupQuiz />;

    return (
        <div className="App">
            <main>
                {content}
                <ModalEnded />
            </main>
        </div>
    );
}

export default App;
