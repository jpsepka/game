import { useState, useEffect } from "react";
import { NPC } from "../data/Characters/NPC";
import { Location } from "../data/Location/Location";

function Map({click, setText, setOptions, setTarget, map, setMap, player, setPlayer,
                gameData }) {

    const [translate, setTranslate] = useState({transform: 'translateX('+(player.coords[1]*-1)+'ch) translateY('+(player.coords[0]*-1)+'em)'})
    const [location, setLocation] = useState('');

    useEffect(() => {
        function handleMovement(e) {
            console.log(gameData);
            if ((e.keyCode >= 37) && e.keyCode <= 40) {
                var updatedPlayer = player;
                updatedPlayer.coords = move(e.keyCode)
                console.log(updatedPlayer.coords);
                updateMap(e.keyCode, updatedPlayer)
            } else {
                var loadedMap = loadMap();
                setMap(loadedMap);
                setTranslate({transform: 'translateX('+(player.coords[1]*-1)+'ch) translateY('+(player.coords[0]*-1)+'em)'})
            }
        }
        document.addEventListener("keydown", handleMovement);
        return function cleanup() {
          document.removeEventListener("keydown", handleMovement);
        };
      });

    useEffect(() => {
        setLocation(player.location.name);
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}))
    }, [location])

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

    function getNpcByLocation(location, coords) {
        var npc = '';
        var listOfNpcs = Object.entries(gameData.npcs.list);
        for (var i = 0; i < listOfNpcs.length; i++) {
            if (listOfNpcs[i][1].location.id == location.id) {
                if ((listOfNpcs[i][1].coords[0] == coords[0]) && 
                    (listOfNpcs[i][1].coords[1] == coords[1])) {
                    npc = listOfNpcs[i][1]
                }
            }
        }
        npc = Object.assign(new NPC(), npc);
        return npc
    }

    function getZone(oldZone, coords) {
        var door = 0;
        var locationsArray = Object.entries(gameData.locations.list);
        var newZone = false;

        for (var i = 0; i < oldZone.door.length; i++) {
            if ((oldZone.door[i].coords[0] == coords[0]) &&
                 oldZone.door[i].coords[1] == coords[1]) {
                door = oldZone.door[i];
            }
        }

        if (!oldZone.door.locked) {
            for (var j = 0; j < locationsArray.length; j++) {
                if (door.newZoneId == locationsArray[j][1].id) {
                        newZone = locationsArray[j][1]
                }
            }
        }
        newZone = Object.assign(new Location(), newZone);
        return newZone;
    }

    function updateMap(key, updatedPlayer) {
        if (true) {
            switch(map[player.coords[0]][player.coords[1]]) {
            case "=":
                var newLocation = getZone(player.location, player.coords)
                updatedPlayer.coords = getNewCoords(newLocation);
                updatedPlayer.location = newLocation;
                setMap(newLocation.map);
                setLocation(newLocation);
            break;
            case "1":
            case " ":
            case ".":
                setTranslate({transform: 'translateX('+(player.coords[1]*-1)+'ch) translateY('+(player.coords[0]*-1)+'em)'})
                setTarget(false)
                player.target = "";
                setOptions([])
                setText([])
                var updatedMap = loadMap();
                setMap(updatedMap)
            break;
            case "@":
                click(getNpcByLocation(player.location, player.coords))
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

    function getNpcById(id) {
        var npc = '';
        var listOfNpcs = Object.entries(gameData.npcs.list);
        for (var i = 0; i < listOfNpcs.length; i++) {
            if (id == listOfNpcs[i][1].id) {
                npc = listOfNpcs[i][1];
            }
        }
        return npc
    }

    function loadMap() {
        var updatedMap = [];
        for (var i = 0; i < player.location.map.length; i++) {
            updatedMap[i] = Array.from(player.location.map[i]);
            if (i == player.coords[0]) {
                updatedMap[player.coords[0]][player.coords[1]] = "@";    
            }
            for (var j = 0; j < player.location.npcs.length; j++) {
                var npc = getNpcById(player.location.npcs[j]);
                if (i == npc.coords[0]) {
                updatedMap[i][npc.coords[1]] = npc.icon;
                }
            }
        }
        return updatedMap
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