import './App.css';
import Dictionary from "./Dictionary"



function App() {
  return (
    <div className="App">
      <header className="container">
      <h1>📖 Dictionary App🔎</h1>
      </header>
      <main>
        <Dictionary defaultKeyword="Jazz"/>
      </main>
      <footer>Coded by Jazmine Outerbridge</footer>
    </div>
  );
}

export default App;
