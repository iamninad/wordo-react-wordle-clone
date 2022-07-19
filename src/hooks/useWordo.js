import { useState } from "react"

const useWordo = (solution) => {

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
        let solutionArr = [...solution];
        let guessArr = [...currentGuess].map((m)=>{
            return {key: m, color: 'grey'}
        });
        
        // green letters
        guessArr.forEach((m, i) => {
            if(solutionArr[i] === m.key) {
                guessArr[i].color = 'green';
                solutionArr[i] = null;
            }
        });

        // yellow letters
        guessArr.forEach((m, i) => {
            if(solutionArr.includes(m.key) && m.color !== 'green'){
                guessArr[i].color = 'yellow';
                solutionArr[solutionArr.indexOf(m.key)] = null;
            }
        })

        return guessArr;
    }

    const addNewGuess = (formatted) => {

        if(currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prev) => {
            let newGuesses = [...prev];
            newGuesses[turn] = formatted;
            return newGuesses;
        })
        setHistory((prev) => {
            return [...prev, currentGuess];
        })
        setTurn((prev) => {
            return prev + 1;
        })
        setCurrentGuess('');

    }

    const handleKeyUp = ({ key }) => {

        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0,-1);
            })
        }

        if(key === 'Enter'){
            if(turn > 5){
                console.log("you used all of your turns!");
            }
            if(history.includes(currentGuess)){
                console.log("you already tried this word!");
            }
            if(currentGuess.length !== 5){
                console.log("word must be 5 letters long");
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if(/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}

}

export default useWordo;