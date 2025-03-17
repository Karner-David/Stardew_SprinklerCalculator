import SDVLogo from '../images/SDVLogo.png';

export default function NavBar() {
  return (
    <div style = {
        {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'red',
        }
    }>

    <header style = {
        {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'green',
        }
    }>
        <a href="/" title="Home" className="title">
            <picture>
                <img src={SDVLogo} className="sdv-logo" alt="" />
            </picture>
        Stardew Valley Sprinkler Placement</a>
        <nav>
            <menu>
                <button className='farm-type-button'>Farm Type</button>
                <div className = "dropdown">
                    <li>
                        <button>
                            <a href="/Standard">Standard Farm</a>
                        </button>
                    </li>
                    <li>
                        <button>
                            <a href="/Riverland">Riverland Farm</a>
                        </button>
                    </li>
                    <li>
                        <button>
                            <a href="/Forest">Forest Farm</a>
                        </button>
                    </li>
                    <li>
                        <button>
                            <a href="/Hill-top">Hill-top Farm</a>
                        </button>
                    </li>
                    <li>
                        <button>
                            <a href="/Wilderness">Wilderness Farm</a>
                        </button>
                    </li>
                    <li>
                        <button>
                            <a href="/Four-Corners">Four Corners Farm</a>
                        </button>
                    </li>
                    <li>
                        <button>
                            <a href="/Beach">Beach Farm</a>
                        </button>
                    </li>
                    <li>
                        <button>
                            <a href="/Meadowlands">Meadowlands Farm</a>
                        </button>
                    </li>
                </div>
            </menu>
        </nav>
    </header>

    </div>
  );
}