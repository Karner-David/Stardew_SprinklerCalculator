import './App.css';
import SDVLogo from './images/SDVLogo.png';
import Aside from './components/aside/Aside';

function App() {
  return (
    <main>
      <a href="/" className="title">
        <picture><img src={SDVLogo} className="sdv-logo" alt="" /></picture>Stardew Valley Sprinkler Placement
      </a>

      <Aside />
    </main>
  );
}

export default App;
