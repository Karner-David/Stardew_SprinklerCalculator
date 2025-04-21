import React from 'react';
import './ToggleModeButton.css';

function ToggleModeButton({ mode, toggleFunction }) {
    return (
        <div className="button-bg" onClick={toggleFunction}>
            <div className="button-label left-label">SELECT</div>
            <div className="button-label right-label">DELETE</div>
            <div className={`button-select ${mode}`}>
                {mode === 'select' ? 'SELECT' : 'DELETE'}
            </div>
        </div>
    )
}

export default ToggleModeButton;