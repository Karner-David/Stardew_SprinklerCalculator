import React, { useState } from 'react';

export default function BuildingItem({ name, images, text, onClick, imageWidth }) {
    const [index, setIndex] = useState(0);
  
    const prev = () => {
      setIndex(index === 0 ? images.length - 1 : index - 1);
    };
  
    const next = () => {
      setIndex(index === images.length - 1 ? 0 : index + 1);
    };
  
    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    };
  
    const rowStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    };
  
    const buildingStyle = {
      display: 'block',
      background: 'transparent',
      cursor: 'pointer',
    };
  
    const arrowStyle = {
      fontSize: '20px',
      cursor: 'pointer',
      userSelect: 'none',
      background: 'none',
      border: 'none',
      padding: '4px'
    };
  
    const captionStyle = {
      fontSize: '18px',
      color: '#555',
      textAlign: 'center'
    };
  
    return (
        <div style={wrapperStyle}>
          <div style={rowStyle}>
            {images.length > 1 && (
              <button onClick={prev} style={arrowStyle}>&larr;</button>
            )}
      
            <picture onClick={onClick} style={buildingStyle}>
              <img
                src={images[index]}
                className="building-image"
                alt={`${name} version`}
                style={{ maxWidth: imageWidth, maxHeight: '340px' }}
              />
            </picture>
      
            {images.length > 1 && (
              <button onClick={next} style={arrowStyle}>&rarr;</button>
            )}
          </div>
      
          <div style={captionStyle}>{text[index]}</div>
        </div>
      );
}