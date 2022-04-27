import React from 'react';
import Inventory from './Inventory';

function CharacterSheet({gameData}) {
    return (
        <div className="container-fluid mainGoldBoxOutline">
            <div className="row">
                <div className="col-sm-5 mainGoldBoxOutline charSheetSection">
                    <p className="headerBox">
                        <span className="headerText">{gameData.player.name}</span>
                    </p>
                </div>
                <div className="col-sm-7 mainGoldBoxOutline charSheetSection">
                    <p className="headerBox">
                        <span className="headerText">{gameData.locations.seydaNeen.name}</span>
                    </p>
                    <pre className="smallMap">
                        {gameData.locations.seydaNeen.map}
                    </pre>
                </div>
            </div>
            <div className='row'>
                <Inventory 
                    gameData={gameData}
                    owner={gameData.player}
                />
            </div>
        </div>
    );
}

export default CharacterSheet;