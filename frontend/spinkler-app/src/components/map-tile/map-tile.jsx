import React, { useRef, useState, useEffect } from 'react';
import ToggleModeButton from '../toggle-mode-button/ToggleModeButton';
import deleteImg from '../../images/trashcan.png'
import SubmitButton from '../submit-button/submit-button';
import QualSprink from '../../images/sprinklers/quality_sprinkler_13x13.png';
import './map-tile.css';
// import { urlencoded } from 'express';

function MapTile({ filePath, chosenRows, chosenCols, currentMap }) {

    const deleteSelection = {
        '--cursor-image': `url(${deleteImg})`    
    }

    const mapStyle = () => {
        const map = currentMap.substring(6);
        let width = '71%';
        if (map.startsWith('beach') || map.startsWith('fourcorners')) {
            width = '58%'
        }
        return {
            width: width,
            '--bg-image': `url(${filePath})`,
        }
    }

    const getGridArray = () => {
        const container = containerRef.current;
        if (!container) return [];
      
        // compute number of rows/cols
        const rows = Math.floor(container.clientHeight / tileHeight);
        const cols = Math.floor(container.clientWidth  / tileWidth);
      
        // initialize with '.'
        const grid = Array.from({ length: rows }, () => Array(cols).fill('.'));
      
        // for each selection, mark with 'x'
        selections.forEach(({ left, top, width, height }) => {
          const startCol = Math.floor(left   / tileWidth);
          const startRow = Math.floor(top    / tileHeight);
          const endCol   = Math.ceil ((left + width ) / tileWidth);
          const endRow   = Math.ceil ((top  + height) / tileHeight);
      
          for (let r = startRow; r < endRow; r++) {
            for (let c = startCol; c < endCol; c++) {
              // sanity check in bounds
              if (r >= 0 && r < rows && c >= 0 && c < cols) {
                grid[r][c] = 'x';
              }
            }
          }
        });
      
        return grid;
      };

    const tileWidth = 13;
    const tileHeight = 13;
    const offsetY = 4 * tileHeight;

    const containerRef = useRef(null);
    const selectionRef = useRef(null);
    const [selections, setSelections] = useState([]);
    const [sprinklers, setSprinklers] = useState([])

    const [mode, setMode] = useState('select')
    const snapToGrid = (value, gridSize) => Math.floor(value / gridSize) * gridSize;

    useEffect(() => {
        const container = containerRef.current;
        const selection = selectionRef.current;
        selection.style.left = '0px';
        selection.style.top  = '0px';

        if (!container || !selection) return;

        const handleMouseMove = (e) => {
            if (mode !== 'select') return;


            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const overlayWidth = chosenCols * tileWidth;
            const overlayHeight = chosenRows * tileHeight;
            let overlayX = snapToGrid(mouseX - overlayWidth / 2, tileWidth) - 0.5;
            let overlayY = snapToGrid(mouseY - overlayHeight / 2, tileHeight) + 8;

            overlayX = Math.max(0, Math.min(overlayX, container.clientWidth  - overlayWidth));
            overlayY = Math.max(0, Math.min(overlayY, container.clientHeight - overlayHeight));

            Object.assign(selection.style, {
                width:  `${overlayWidth}px`,
                height: `${overlayHeight}px`,
                transform: `translate(${overlayX}px, ${overlayY}px)`,
                display: 'block',
                backgroundColor: 'transparent',
                border: '3px solid green'
              });
        }

        const handleMouseLeave = () => {
            selection.style.display = 'none';
        }

        const handleClick = (e) => {
            if (mode !== 'select') return;
            if (e.target !== container) return;
            const { left, top } = container.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const mouseY = e.clientY - top;

            const overlayWidth = chosenCols * tileWidth;
            const overlayHeight = chosenRows * tileHeight;
            let overlayX = snapToGrid(mouseX - overlayWidth / 2, tileWidth) - 0.5;
            let overlayY = snapToGrid(mouseY - overlayHeight / 2, tileHeight) + 8;

            overlayX = Math.max(0, Math.min(overlayX, container.clientWidth  - overlayWidth));
            overlayY = Math.max(0, Math.min(overlayY, container.clientHeight - overlayHeight));
            setSelections((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    left: overlayX,
                    top: overlayY,
                    width: overlayWidth,
                    height: overlayHeight
                }
            ]);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('click', handleClick);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('click', handleClick);
        };
    }, [tileWidth, tileHeight, chosenRows, chosenCols, mode]);

    useEffect(() => {
        const selection = selectionRef.current;
        if (!selection) return;
        if (mode === "delete") {
            selection.style.display = 'none';
            // selection .style.cursor = `url(${deleteImg}), auto`;
        }
    }, [mode]);

    const handleDelete = (id, e) => {
        e.stopPropagation();
        setSelections((prev) => prev.filter(sel => sel.id !== id));
    }

    const handleSubmit = async () => {
        const grid = getGridArray();
        console.log('Pressed submit');
        try {
            const resp = await fetch('http://localhost:4000/api/submitGrid', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ grid, map: currentMap })
            });
            if (!resp.ok) throw new Error(await resp.text());
            const { result } = await resp.json();
            const coords = [];
            result.forEach((row, r) =>
            row.forEach((cell, c) => {
                if (cell === 'S') coords.push({ r, c });
            })
            );
            setSprinklers(coords);
            console.table(result);
            alert('Grid sent successfully');
        } catch (e) {
            console.error(e);
            alert('Error sending grid' + e);
        }
    }

    return (
        <div className='map-container'>
            <div className="image-container">
                <ToggleModeButton mode={mode} toggleFunction={() => setMode(mode === "select" ? "delete" : "select")}/>
                <SubmitButton submitFunction={handleSubmit}/>
                <div className="tiled-map" ref={containerRef} style={mapStyle()}>
                    <div id="selection-overlay" ref={selectionRef}></div>
                    {selections.map((sel) => (
                        <div
                            key={sel.id}
                            className="selected-overlay"
                            style={{
                                left: sel.left + 'px',
                                top: sel.top + 'px',
                                width: sel.width + 'px',
                                height: sel.height + 'px',
                                backgroundColor: 'rgba(0, 128, 0, 0.3)',
                                position: 'absolute'
                            }}
                            onClick={(e) => {
                            if (mode === "delete") {
                                // Prevent the container's click event from firing
                                handleDelete(sel.id, e);
                            }
                            }}
                        ></div>
                    ))}
                    {sprinklers.map((s, i) => (
                        <img
                        key={i}
                        src={QualSprink}           /* tiny 13×13 sprinkler image */
                        alt="sprinkler"
                        style={{
                            position: 'absolute',
                            left:  s.c * tileWidth  + 'px',
                            top:   s.r * tileHeight - 3 + 'px',
                            width:  tileWidth  + 'px',
                            height: tileHeight + 'px',
                            pointerEvents: 'none'  /* so it never blocks clicks */
                        }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MapTile;