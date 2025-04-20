import React, { useRef, useState, useEffect } from 'react';
import ToggleModeButton from '../toggle-mode-button/ToggleModeButton';
import deleteImg from '../../images/trashcan.png'
import './map-tile.css';
// import { urlencoded } from 'express';

function MapTile({ filePath }) {
    const backgroundImg = {
        '--bg-image': `url(${filePath})`
    };

    const deleteSelection = {
        '--cursor-image': `url(${deleteImg})`    
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

    const tileWidth = 5;
    const tileHeight = 5;
    const offsetY = 4 * tileHeight;

    let chosenRows = 25;
    let chosenCols = 25;

    const containerRef = useRef(null);
    const selectionRef = useRef(null);
    const [selections, setSelections] = useState([]);

    const [mode, setMode] = useState('select')
    const snapToGrid = (value, gridSize) => Math.floor(value / gridSize) * gridSize;

    useEffect(() => {
        const container = containerRef.current;
        const selection = selectionRef.current;

        if (!container || !selection) return;

        const handleMouseMove = (e) => {
            if (mode !== 'select') return;


            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const overlayWidth = chosenCols * tileWidth;
            const overlayHeight = chosenRows * tileHeight;
            const overlayX = snapToGrid(mouseX - overlayWidth / 2, tileWidth);
            const overlayY = snapToGrid(mouseY - overlayHeight / 2 + offsetY, tileHeight);

            selection.style.width = overlayWidth + 'px';
            selection.style.height = overlayHeight + 'px';
            selection.style.left = overlayX + 'px';
            selection.style.top = overlayY + 'px';
            selection.style.display = 'block';
            selection.style.backgroundColor = 'transparent';
            selection.style.border = '2px solid green';    
        }

        const handleMouseLeave = () => {
            selection.style.display = 'none';
        }

        const handleClick = (e) => {
            if (mode !== 'select') return;
            if (e.target !== container) return;
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const overlayWidth = chosenCols * tileWidth;
            const overlayHeight = chosenRows * tileHeight;
            const overlayX = snapToGrid(mouseX - overlayWidth / 2, tileWidth);
            const overlayY = snapToGrid(mouseY - overlayHeight / 2 + offsetY, tileHeight);

            setSelections((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    left: overlayX,
                    top: overlayY,
                    width: chosenCols * tileWidth,
                    height: chosenRows * tileHeight
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

    return (
        <div className='map-container'>
            <div className="tiled-map" ref={containerRef} style={backgroundImg}>
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
            </div>
            <ToggleModeButton mode={mode} toggleFunction={() => setMode(mode === "select" ? "delete" : "select")}></ToggleModeButton>
        </div>
    )
}

export default MapTile;