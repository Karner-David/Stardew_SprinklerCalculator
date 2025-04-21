import React from 'react';

export default function AsideContentFarm() {
    return (
        <div style={
          {
            margin: '4px 0',
            padding: '6px 10px',
            backgroundColor: '#ffffff',
            border: '1px solid pink',
            borderRadius: '4px',
            boxShadow: '0 4px 6px -2px rgba(0, 0, 0, 0.19)',
          }
        }>

          <div className="aside-content-buildings">
            <h2>Buildings</h2>
            <p>This tab could show a list or grid of your constructed buildings, their types, or upgrade options.</p>
          </div>
        </div>

    );
};