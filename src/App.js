import { useEffect, useState } from 'react';
import Wordo from './components/Wordo';

function App() {

  const [solution, setSolution] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:3001/solutions')
    .then(res=>res.json())
    .then(json => {
      // random int between 0-size of json array
      const randomSol = json[Math.floor(Math.random()*json.length)];
      setSolution(randomSol.word);
    })
  }, [setSolution]);

  return (
    <div className="App">
      <h1>{solution}</h1>
      {solution && <Wordo solution={solution} />}
    </div>
  );
}

export default App;
