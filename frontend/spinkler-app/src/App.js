import './App.css';
import { useState } from 'react';
import SDVLogo from './images/SDVLogo.png';
import Aside from './components/aside/Aside';
import MapTile from './components/map-tile/map-tile.jsx'
import Content from './components/content.jsx';
import Wilderness from './images/Wilderness-No-Builds.svg'

function App() {
  const [currentMapPath, setCurrentMapPath] = useState("/maps/standard-all.svg");

  return (
    <main className='main-layout'>
      <a href="/" className="title">
        <picture><img src={SDVLogo} className="sdv-logo" alt="" /></picture>Stardew Valley Sprinkler Placement
      </a>

      <Content/>
    </main>
  );
}

export default App;
