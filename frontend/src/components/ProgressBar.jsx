import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function ProgressBar({maxVal, val, type}) {
    const [style, setStyle] = useState({
        backgroundColor: type,
        width: 100*(val/maxVal) + '%'
    })
    const [styleBox, setStyleBox] = useState()

    useEffect(() => {
        if (type == 'textWindow') {
            console.log("hi");
            setStyleBox({
                marginRight: 0 + 'px',
                marginBottom: 10 + 'px',
                width: 'auto',
                marginTop: 0 + 'px'
            })
        }
    }, [])

    return (
        <div className="progress stats goldBoxOutline" style={styleBox}>
            <div className="progress-bar" role="progressbar" style={style}></div>
            <div className="progress-bar-text">{val}/{maxVal}</div>
        </div>
    );
}

export default ProgressBar;