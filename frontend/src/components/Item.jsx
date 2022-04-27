import React from 'react';

function Item({item}) {
    console.log(item);
    return (
        <p className="hoverable" key={item[0].name}>
            <span className="goldBoxOutline hoverable_tooltip">
                {item[0].name}
                <br/>
                Type: {item[0].type}
                <br/>
                Weight: {item[0].weight}
                <br/>
                Value: {item[0].value}
            </span>
            <span className="hoverable_main">
                {item[0].icon}
            </span>
        </p>
    );
}

export default Item;