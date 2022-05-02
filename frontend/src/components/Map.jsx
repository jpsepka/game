import { useState, useEffect } from "react";
import { NPC } from "../data/Characters/NPC";
import { Location } from "../data/Location/Location";

function Map({click, setText, setOptions, setTarget, map, setMap,
                gameData, setGameData, openContainer, getContainer, openDoor,
            loadMap, getDoor }) {

    const [translate, setTranslate] = useState({transform: 'translateX('+(gameData.player.coords[1]*-1)+'ch) translateY('+(gameData.player.coords[0]*-1)+'em)'})
    const [location, setLocation] = useState('');

    useEffect(() => {
        function handleMovement(e) {
            var updatedGameData = gameData;
            if ((e.keyCode >= 37) && e.keyCode <= 40) {
                updatedGameData.player.coords = move(e.keyCode);
                console.log(updatedGameData.player.coords);
                updateMap(e.keyCode, updatedGameData)
            } else {
                var loadedMap = loadMap();
                setMap(loadedMap);
                setTranslate({transform: 'translateX('+(gameData.player.coords[1]*-1)+'ch) translateY('+(gameData.player.coords[0]*-1)+'em)'})
            }
        }
        document.addEventListener("keydown", handleMovement);
        return function cleanup() {
          document.removeEventListener("keydown", handleMovement);
        };
      });

      

    useEffect(() => {
        setLocation(gameData.player.location.name);
        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}))
    }, [location])

    function getNewCoords(newLocation) {
        var newCoords = [];
        for (var i = 0; i < newLocation.doors.length; i++) {
            if (newLocation.doors[i].newZoneId == gameData.player.location.id) {
                newCoords[0] = newLocation.doors[i].coords[0]
                newCoords[1] = newLocation.doors[i].coords[1]
            }
        }
        return newCoords
    }

    function getNpcByLocation(location, coords) {
        var npc = '';
        var listOfNpcs = Object.values(gameData.npcs.list);
        for (var i = 0; i < listOfNpcs.length; i++) {
            if (listOfNpcs[i].location.id == location.id) {
                if ((listOfNpcs[i].coords[0] == coords[0]) && 
                    (listOfNpcs[i].coords[1] == coords[1])) {
                    npc = listOfNpcs[i]
                }
            }
        }
        npc = Object.assign(new NPC(), npc);
        return npc
    }

    function getZone(oldZone, coords) {
        var door = 0;
        var newZone = false;
        var locations = Object.values(gameData.locations);

        for (var i = 0; i < oldZone.doors.length; i++) {
            if ((oldZone.doors[i].coords[0] == coords[0]) &&
                 oldZone.doors[i].coords[1] == coords[1]) {
                door = i;
            }
        }

        if (!oldZone.doors[door].locked) {
            for (var j = 0; j < locations.length; j++) {
                if (oldZone.doors[door].newZoneId == locations[j].id) {
                        newZone = locations[j]
                }
            }
            newZone = Object.assign(new Location(), newZone);
            return newZone;
        } else (
            alert("That door is locked!")
        )
    }

    function updateMap(key, updatedGameData) {
        if (true) {
            switch(map[updatedGameData.player.coords[0]][updatedGameData.player.coords[1]]) {
            case "=":
                var newLocation = getZone(gameData.player.location, gameData.player.coords)
                if (newLocation) { 
                    updatedGameData.player.coords = getNewCoords(newLocation);
                    updatedGameData.player.location = newLocation;
                    setMap(newLocation.map);
                    setLocation(newLocation);
                } else {
                    undoMove(key);
                }
            break;
            case "1":
            case " ":
            case ".":
                setTranslate({transform: 'translateX('+(updatedGameData.player.coords[1]*-1)+'ch) translateY('+(updatedGameData.player.coords[0]*-1)+'em)'})
                setTarget(false)
                updatedGameData.player.target = "";
                setOptions([])
                setText([])
                setMap(loadMap())
            break;
            case "@":
                click(getNpcByLocation(gameData.player.location, gameData.player.coords))
                undoMove(key);
            break;
            case "$":
                openContainer(getContainer(gameData.player.coords))
                undoMove(key);
            break;
            case "0":
                var door = getDoor(gameData.player.coords);
                if (door.locked) {
                    openDoor(gameData.player.coords)
                    undoMove(key);
                    setMap(loadMap())
                } else {
                    alert("That door is locked.")
                    undoMove(key);
                }
            break;
            default:
                console.log("default statement in update map")
                undoMove(key);
            }
            setGameData(updatedGameData);
        }
    }

    function undoMove(key) {
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
    }

    function move(key) {
        var newCoords = gameData.player.coords;
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
            {map
            /* 
            rendering tile by tile caused LAG in big map
            but the dudes lose coloring without it. f :(
            i have literally no idea how i'd go about fixing that
            potential fixes: {  
                1. array of line = document.createElement() for each line of map
                    edit line innerHTML and outerHTML, add spans for characters
                    render line by line
                2. create component for characters, 
                    render on top of map
            }
            
                map.map((row, rowId) => {
                    return (
                        <MapRow row={row} 
                                rowId={rowId} 
                                key={"row"+rowId}
                                gameData={gameData}
                                getNpcByLocation={getNpcByLocation}
                        />
                    )
                })
                */
            }
        </pre>
    )
}

/*
const MapRow = ({row, rowId, gameData,getNpcByLocation}) => {
    return (
        <div id={"row" + rowId} key={"row" + rowId} className='row'>
            {
                row.map((tile, tileId) => {
                    return (
                        <MapTile tile={tile} 
                                 rowId={rowId} 
                                 tileId={tileId} 
                                 key={rowId + "," + tileId}
                                 gameData={gameData}
                                 getNpcByLocation={getNpcByLocation}
                        />
                    )
                })
            }
        </div>
    )
}

const MapTile = ({tile, rowId, tileId, gameData, getNpcByLocation}) => {
    const [style, setStyle] = useState({color: "white"})
    useEffect(() => {
        if (tile == "@") {
            var npc = false;
            npc = getNpcByLocation(gameData.player.location, [rowId, tileId])
            if (npc.name != undefined) {
                setStyle(npc.race.color)
            } else {
                if (gameData.player.race != "Race") {
                    setStyle(gameData.player.race.color)
                }
            }
        } else if (tile == "?") {
            setStyle({color: "black"})
        } else {
            setStyle({color: "white"})
        }
    }, [tile])
    return (
        <div style={style} id={rowId + "," + tileId}>
            {tile}
        </div>
    )
}
*/
export default Map