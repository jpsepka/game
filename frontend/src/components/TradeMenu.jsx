import React from 'react';
import Inventory from './Inventory';

function TradeMenu({gameData, container, swapItemOwner}) {
    return (
        <>
          <Inventory
            owner={gameData.player}
            swapItemOwner={swapItemOwner}
          />
          <Inventory
            owner={container}
            swapItemOwner={swapItemOwner}
          />  
        </>
    );
}

export default TradeMenu;