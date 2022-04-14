import React from 'react';

function Player({ player, translateX, translateY }) {
    translateX = translateX * -1
    translateY = translateY * -1
    var test = {
        transform: 'translate('+translateX+'em,'+translateY+'em)'
    }
    return ( 
        <div className="player">
            {player.icon}
        </div>
    );
}

export default Player;