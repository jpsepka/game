import React from 'react';
import Item from './Item';

function Inventory({gameData, owner}) {
    console.log(owner);
    console.log(owner.inventory.map((item) => {console.log(item)}))
    return (
        <div className='mainGoldBoxOutline charSheetSection'>
            <p className="headerBox">
                <span className="headerText">
                    {owner.name}
                </span>
            </p>
            <div className="inventory goldBoxOutline">
                <div className="row">
                    <div className="col-sm-1">
                        {owner.inventory.map((item) => {
                            return (
                                    <Item item={item}
                                    />
                            )
                        })}
                    </div>
                    <div className="col-sm-1">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inventory;