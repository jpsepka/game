import React from 'react';
import Item from './Item';

function Inventory({owner, swapItemOwner}) {
    function swapItemHelper(item) {
        swapItemOwner(item, owner);
    }
    return (
        <div className='morrowindFont morrowindColorText mainGoldBoxOutline charSheetSection'>
            <p className="headerBox">
                <span className="headerText">
                    {owner.name === "Chest"
                        ? "Chest"
                        : "Inventory"
                    }
                </span>
            </p>
            <div className="inventory goldBoxOutline">
                <div className="row">
                    <div className="col-sm-1">
                        {owner.inventory.map((item) => {
                            return (
                                    <Item item={item}
                                        swapItemHelper={swapItemHelper}
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