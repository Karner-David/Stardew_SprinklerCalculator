import SDVLogo from '../images/SDVLogo.png';
import React, {useState} from 'react';

export default function NavBar() {
    const [isHidden, setIsHidden] = useState(true);

  return (
    <header style = {
        {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'green',
            width: '100vw',
            justifyContent: 'space-between',
            position: 'relative', /* Ensures dropdown is positioned relative to header */
        }
    }>

        <a href="/" title="Home" className="title">
            <picture><img src={SDVLogo} className="sdv-logo" alt="" /></picture>
        Stardew Valley Sprinkler Placement</a>
        <div className="ham-menu" style={ {width: 'auto',} }>
            <button id='ham-button' className='farm-type-button' onClick={() => setIsHidden(!isHidden)}>Farm Type</button>
            <nav className={isHidden ? 'hidden' : 'nav-visible'}>
                <ul className="dropdown">
                    <li> <button><a href="/Standard">Standard Farm</a></button> </li>
                    <li> <button><a href="/Riverland">Riverland Farm</a></button> </li>
                    <li> <button><a href="/Forest">Forest Farm</a></button> </li>
                    <li> <button><a href="/Hill-top">Hill-top Farm</a></button> </li>
                    <li> <button><a href="/Wilderness">Wilderness Farm</a></button> </li>
                    <li> <button><a href="/Four-Corners">Four Corners Farm</a></button> </li>
                    <li> <button><a href="/Beach">Beach Farm</a></button> </li>
                    <li> <button><a href="/Meadowlands">Meadowlands Farm</a></button> </li>
                </ul>
            </nav>
        </div>
    </header>
  );
}