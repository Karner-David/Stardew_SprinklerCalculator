import React, {} from 'react';
import './submit-button.css';

export default function SubmitButton({submitFunction}) {

    return (
        <button onClick={submitFunction}>
            Submit Grid
        </button>
    )
}