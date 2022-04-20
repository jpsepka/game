import { useState, useEffect } from "react";
import npcs from "../data/Characters/NPC";
import locations from "../data/Location/Location";

function Map({click, setText, setOptions, setTarget, map, setMap, player, setPlayer }) {

    const [translate, setTranslate] = useState({transform: 'translateX('+(player.coords[1]*-1)+'ch) translateY('+(player.coords[0]*-1)+'em)'})

    useEffect(() => {
        function handleMovement(e) {
            var updatedPlayer = player;
            updatedPlayer.coords = move(e.keyCode)
            updateMap(e.keyCode, updatedPlayer)
        }
        document.addEventListener("keydown", handleMovement);
        return function cleanup() {
          document.removeEventListener("keydown", handleMovement);
        };
      });

    function getNewCoords(newLocation) {
        var newCoords = [];
        for (var i = 0; i < newLocation.door.length; i++) {
            if (newLocation.door[i].newZoneId == player.location.id) {
                newCoords[0] = newLocation.door[i].coords[0]
                newCoords[1] = newLocation.door[i].coords[1]
            }
        }
        return newCoords
    }

    function updateMap(key, updatedPlayer) {
        if (true) {
            switch(map[player.coords[0]][player.coords[1]]) {
            case "=":
                var newLocation = locations.getZone(player.location, player.coords)
                updatedPlayer.coords = getNewCoords(newLocation);
                updatedPlayer.location = newLocation;
                setMap(newLocation.map);
            break;
            case "1":
            case " ":
            case ".":
                setTranslate({transform: 'translateX('+(player.coords[1]*-1)+'ch) translateY('+(player.coords[0]*-1)+'em)'})
                setTarget(false)
                setOptions([])
                setText([])
                var updatedMap = [];
                for (var i = 0; i < player.location.map.length; i++) {
                    updatedMap[i] = Array.from(player.location.map[i]);
                    if (i == player.coords[0]) {
                        updatedMap[player.coords[0]][player.coords[1]] = "@";    
                    }
                    for (var j = 0; j < player.location.npcs.length; j++) {
                        var npc = npcs.getNpcById(player.location.npcs[j]);
                        if (i == npc.coords[0]) {
                        updatedMap[i][npc.coords[1]] = npc.icon;
                        }
                    }
                }
                setMap(updatedMap)
            break;
            case "@":
                click(npcs.getNpcByLocation(player.location, player.coords))
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
            setPlayer(updatedPlayer)
        }
      }

    function move(key) {
        var newCoords = player.coords;
        switch(key) {
        case 39:
            newCoords[1] = newCoords[1] + 1
            break;
        case 37:
            newCoords[1] = newCoords[1] - 1
            break;
        case 38:
            newCoords[0] = newCoords[0] - 1
            break;
        case 40:
            newCoords[0] = newCoords[0] + 1
            break;
        }
        return newCoords
    }


    return (
        <pre style={translate} className='map text-center'>
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