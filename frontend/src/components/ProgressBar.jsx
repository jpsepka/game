import React from 'react';
import { useState } from 'react';

function ProgressBar({maxVal, val, type}) {
    const [style, setStyle] = useState({
        backgroundColor: type,
        width: 100*(val/maxVal) + '%'
    })

    return (
        <div className="progress stats goldBoxOutline">
            <div className="progress-bar" role="progressbar" style={style}></div>
            <div className="progress-bar-text">{val}/{maxVal}</div>
        </div>
    );
}

export default ProgressBar;