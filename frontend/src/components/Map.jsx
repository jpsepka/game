import { useState, useEffect } from "react";
import { NPC } from "../data/Characters/NPC";
import { Location } from "../data/Location/Location";

function Map({click, setText, setOptions, setTarget, map, setMap, player, setPlayer,
                gameData, setGameData }) {

    const [translate, setTranslate] = useState({transform: 'translateX('+(player.coords[1]*-1)+'ch) translateY('+(player.coords[0]*-1)+'em)'})
    const [location, setLocation] = useState('');

    useEffect(() => {
        function handleMovement(e) {
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
        for (var i = 0; i < newLocation.doors.length; i++) {
            if (newLocation.doors[i].newZoneId == player.location.id) {
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

    function updateMap(key, updatedPlayer) {
        if (true) {
            switch(map[player.coords[0]][player.coords[1]]) {
            case "=":
                var newLocation = getZone(gameData.player.location, player.coords)
                if (newLocation) { 
                    updatedPlayer.coords = getNewCoords(newLocation);
                    updatedPlayer.location = newLocation;
                    setMap(newLocation.map);
                    setLocation(newLocation);
                } else {
                    undoMove(key);
                }
            break;
            case "1":
            case " ":
            case ".":
            case "0":
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
                undoMove(key);
            break;
            }
            setPlayer(updatedPlayer)
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
                        <MapRow row={row} 
                                rowId={rowId} 
                                key={"row"+rowId}
                                gameData={gameData}
                                getNpcByLocation={getNpcByLocation}
                        />
                    )
                })
            }
        </pre>
    )
}

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

export default Map