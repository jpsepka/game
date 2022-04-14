import { useState, useEffect } from "react";
import npcs from "../data/Characters/NPC";
import locations from "../data/Location/Location";
import player from "../data/Characters/Player";

function Map({location, click, setLocation, setText, setOptions, setTarget, map, 
    setMap}) {
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [playerCoords, setPlayerCoords] = useState(player.coords);

    var translations = 'translate('+translateX+'em,'+translateY+'ch)';
    const test = {
        transform: translations
    }
    
    useEffect(() => {
        function handleMovement(e) {
            console.log(location.door);
            setPlayerCoords([])
            setPlayerCoords(move(e.keyCode))
            updateMap(e.keyCode)
            console.log(playerCoords);
        }
        document.addEventListener("keydown", handleMovement);
        return function cleanup() {
          document.removeEventListener("keydown", handleMovement);
        };
      });

    function getNewCoords(newLocation) {
        var newCoords = [];
        for (var i = 0; i < newLocation.door.length; i++) {
            if (newLocation.door[i].newZoneId == location.id) {
                newCoords[0] = newLocation.door[i].coords[0]
                newCoords[1] = newLocation.door[i].coords[1]
            }
        }
        console.log(newCoords);
        return newCoords
    }

    function updateMap(key) {
        if (true) {
            switch(map[playerCoords[0]][playerCoords[1]]) {
            case "=":
                var newLocation = locations.getZone(location, playerCoords)
                //setMap(initializeMap(newLocation.map))
                setPlayerCoords(getNewCoords(newLocation))
                setLocation(newLocation);
                setMap(newLocation.map);
            break;
            case "1":
            case " ":
            case ".":
            case "0":
                setTarget({name: ".", opinion: 0})
                setOptions([])
                setText([])
                var updatedMap = [];
                for (var i = 0; i < location.map.length; i++) {
                    updatedMap[i] = Array.from(location.map[i]);
                    if (i == playerCoords[0]) {
                        updatedMap[playerCoords[0]][playerCoords[1]] = "@";    
                    }
                    for (var j = 0; j < location.npcs.length; j++) {
                        var npc = npcs.getNpc('id', location.npcs[j]);
                        if (i == npc.coords[0]) {
                        updatedMap[i][npc.coords[1]] = npc.icon;
                        }
                    }
                }
                setMap(updatedMap)
            break;
            case "@":
                click(npcs.getNpc('location', [location, playerCoords]))
            default:
                if (key == 40) {
                key = 38;
                } else if (key == 38) {
                key = 40;
                } else if (key == 37) {
                key = 39;
                } else if (key == 39) {
                key = 37;
                }
                if (key !== 0) {
                    move(key)
                }
            break;
            }
        }
      }

  

  function move(key) {
    var newCoords = playerCoords;
    switch(key) {
      case 39:
        newCoords[1] = newCoords[1] + 1
        setTranslateX(old => old - .5)
        break;
      case 37:
        newCoords[1] = newCoords[1] - 1
        setTranslateX(old => old + .5)
        break;
      case 38:
        newCoords[0] = newCoords[0] - 1
        setTranslateY(old => old + .5)
        break;
      case 40:
        newCoords[0] = newCoords[0] + 1
        setTranslateY(old => old - .5)
        break;
    }
    return newCoords
  }

    String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
    
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }
    return (
        <pre style={test} className='map text-center'>
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