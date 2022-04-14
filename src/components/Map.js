function Map({map, test}) {
    console.log(test);
    /*
    String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }
    */
    return (
        <pre className='map'>
            {
                map.map((row, rowId) => {
                    return (
                        <MapRow
                            row={row} rowId={rowId} key={"row"+rowId}
                        />
                    )
                })
            }
        </pre>
    )
}

const MapRow = ({row, rowId}) => {
    return (
        <div id={"row" + rowId} key={"row" + rowId} className='row'>
            {
                row.map((tile, tileId) => {
                    return (
                        <MapTile
                            tile={tile} rowId={rowId} tileId={tileId} key={rowId + "," + tileId}
                        />
                    )
                })
            }
        </div>
    )
}

const MapTile = ({tile, rowId, tileId}) => {
    return (
        <div id={rowId + "," + tileId}>
            {tile}
        </div>
    )
}

export default Map