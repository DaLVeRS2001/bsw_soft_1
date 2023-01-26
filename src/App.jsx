import './App.scss';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const getHandler = (e) => {
    e.preventDefault();

    axios
      .get('https://sheet.best/api/sheets/8abed0bc-fec0-42f2-8edc-8260b3433f8d')
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(()=> {
    
  })

  return (
    <div className="App">
      <header>header</header>
      <main>main</main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
