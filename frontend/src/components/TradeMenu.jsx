import React from 'react';
import Inventory from './Inventory';

function TradeMenu({gameData, container}) {
    return (
        <>
          <Inventory
            gameData={gameData}
            owner={gameData.player}
          />
          <Inventory
            gameData={gameData}
            owner={container}
          />  
        </>
    );
}

export default TradeMenu;