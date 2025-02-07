
interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({onStart}) =>{
    return(
        <div className="start-screen">
            <h1>Welcome to the Quiz Game</h1>
            <button onClick={onStart}>Start Quiz</button>
        </div>
    )
}

export default StartScreen;