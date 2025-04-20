import './App.css';
import SDVLogo from './images/SDVLogo.png';


function App() {
  return (
    <main>
      <a href="/" className="title">
        <picture><img src={SDVLogo} className="sdv-logo" alt="" /></picture>Stardew Valley Sprinkler Placement
      </a>
    </main>
  );
}

export default App;
