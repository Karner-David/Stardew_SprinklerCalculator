import React, { useState } from 'react';
import MapTile from './map-tile/map-tile.jsx'
import Aside from './aside/Aside';

function Content({ initialMapPath }) {
    const [currentMapPath, setCurrentMapPath] = useState("/maps/standard-all.svg");
    const [selectedDims, setSelectedDims] = useState({rows: 0, cols: 0});

    return (
        <div className="content">
            <MapTile 
                filePath={currentMapPath} 
                chosenRows={selectedDims.rows}
                chosenCols={selectedDims.cols}
                currentMap={currentMapPath}
            />
            <Aside
                onMapChange={setCurrentMapPath}
                onSizeChange={setSelectedDims}
            />
            
        </div>
    )
}

export default Content;