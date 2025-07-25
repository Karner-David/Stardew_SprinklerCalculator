import React, { useState } from 'react';

export default function BuildingItem({ name, images, text, onClick, imageWidth, active }) {
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
      gap: '8px',
      border: active ? '2px solid #e90000ff' : '',
      borderRadius: '8px',
      margin: '10px',
      paddingTop: '15px',
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
      fontFamily: 'Svbold',
      fontSize: '50px',
      cursor: 'pointer',
      userSelect: 'none',
      background: 'none',
      border: 'none',
      padding: '4px'
    };
  
    const captionStyle = {
      fontSize: '36px',
      color: 'black',
      textAlign: 'center',
      fontFamily: 'Svthin',
      paddingBottom: '30px'
    };
  
    return (
        <div style={wrapperStyle}>
          <div style={rowStyle}>
            {images.length > 1 && (
              <button onClick={prev} style={arrowStyle}>&lt;</button>
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
              <button onClick={next} style={arrowStyle}>&gt;</button>
            )}
          </div>
      
          <div style={captionStyle}>{text[index]}</div>
        </div>
      );
}