import React, { useEffect } from 'react'
import useWordo from '../hooks/useWordo'
import Grid from './Grid';

const Wordo = ({ solution }) => {

    const {currentGuess, handleKeyUp, guesses, isCorrect, turn } = useWordo(solution);

    useEffect(()=>{
        window.addEventListener('keyup',handleKeyUp);

        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [handleKeyUp])

    useEffect(() => {
        console.log(guesses, turn, isCorrect);
    }, [guesses, turn, isCorrect]);

  return (
      <div>
        <div>Solution - {solution}</div>
        <div>Currentguess - {currentGuess}</div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
      </div>
      
  )
}

export default Wordo