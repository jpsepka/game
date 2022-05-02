import React from 'react';
import Map from './Map'
import {updateCharacter} from '../features/characters/characterSlice'
import {useDispatch} from 'react-redux';
import TextWindow from './TextWindow';
import { useState } from 'react';
import {Player} from '../data/Characters/Player'
import {Location} from '../data/Location/Location'
import { useEffect } from 'react';
import CharacterRaceForm from './CharacterRaceForm';
import CharacterClassForm from './CharacterClassForm';
import CharacterSheet from './CharacterSheet';
import TradeMenu from './TradeMenu';

function GameWindow({ characterChoice, setCharacterChoice }) {
    const dispatch = useDispatch();
    const [gameData, setGameData] = useState(characterChoice.character);
    const [target, setTarget] = useState(false);
    const [text, setText] = useState([])
    const [options, setOptions] = useState([])
    const [map, setMap] = useState([[[],[]],[[],[]]]);
    const [gettingRace, setGettingRace] = useState(false);
    const [gettingClass, setGettingClass] = useState(false);
    const [lookingAtInventory, setLookingAtInventory] = useState(false);
    const [container, setContainer] = useState(false);
    const [showTradeMenu, setShowTradeMenu] = useState(false);
    
    useEffect(() => {
        var newGameData = JSON.parse(JSON.stringify(characterChoice.character));
        newGameData.player = Object.assign(new Player(), newGameData.player);
        newGameData.player.location = Object.assign(new Location(), newGameData.player.location);
        
        setGameData(newGameData);
        setMap(newGameData.player.location.map);
    }, [characterChoice])

    function updateGameData(data, type) {
        var newGameData = JSON.parse(JSON.stringify(gameData));
        switch(type) {
            case 'player':
                newGameData.player = data
                break;
            default:
                console.log("updateGameData default switch case - ERROR")
        }
        setGameData(newGameData);
    }

    function click(person) {
        setOptions([])
        console.log(person);

        var updatedGameData = JSON.parse(JSON.stringify(gameData))
        person.opinion = calculateDisposition(person);
        updatedGameData.player.target = person
        setTarget(person);
        setGameData(updatedGameData);


        setText([person.greeting]);
        person.sortDialogue();
        var test = [];
        for (var i = 0; i < person.dialogue.length; i++) {
            test[i] = person.dialogue[i].option;
        }
        setOptions(test);
    }

    function calculateDisposition(person) {
        var disposition = 50; //base disposition of 50

        disposition += 0.5 * (gameData.player.attributes.personality - 50)

        if (person.race.name == gameData.player.race.name) {
            disposition += 5;
        }

        if (disposition > 100) {
            disposition = 100;
        } else if (disposition < 0) {
            disposition = 0;
        }

        return disposition;
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
        for (var i = 0; i < gameData.player.location.map.length; i++) {
            updatedMap[i] = Array.from(gameData.player.location.map[i]);
        }
        for (var j = 0; j < gameData.player.location.npcs.length; j++) {
            var npc = getNpcById(gameData.player.location.npcs[j]);
            updatedMap[npc.coords[0]][npc.coords[1]] = npc.icon;
        }
        for (var k = 0; k < gameData.player.location.containers.length; k++) {
            var container = gameData.player.location.containers[k];
            updatedMap[container.coords[0]][container.coords[1]] = container.icon
        }
        for (var z = 0; z < gameData.player.location.doors.length; z++) {
            var door = gameData.player.location.doors[z];
            updatedMap[door.coords[0]][door.coords[1]] = door.icon
        }
        updatedMap[gameData.player.coords[0]][gameData.player.coords[1]] = "@";
        return updatedMap
    }

    function getDoor(coords) {
        var door = '';
        var listOfDoors = gameData.player.location.doors;
        for (var i = 0; i < listOfDoors.length; i++) {
            if ((listOfDoors[i].coords[0] == coords[0]) && 
                (listOfDoors[i].coords[1] == coords[1])) {
                
                door = listOfDoors[i];
            }
        }
        return door;
    }

    function openDoor(coords) {
        var door = getDoor(coords);
        var updatedGameData = JSON.parse(JSON.stringify(gameData));
        var locations = Object.getOwnPropertyNames(gameData.locations);
        var playerLocation = gameData.player.location.name.replace(/\s/g, '');
        playerLocation = playerLocation.replace('-', '');

        for (var i = 0; i < locations.length; i++) {
            if (locations[i].toLowerCase() === playerLocation.toLowerCase()) {
                playerLocation = locations[i]
            }
        }

        door.icon = "1";

        updatedGameData.player.location = updatedGameData.locations[playerLocation]

        console.log(updatedGameData.player.location.map);
        console.log(updatedGameData.locations[playerLocation].map);

        if (target) {
            console.log(updatedGameData.player.location)

            return updatedGameData.player.location;
        } else {
            console.log(updatedGameData);
            setGameData(updatedGameData);
        }
    }

    function openContainer(container) {
        setContainer(container);
        setShowTradeMenu(true);
    }

    function checkQuestComplete(quest) {
        var output = false;
        switch(quest.type) {
            case "Gather":
                for (var i = 0; i < gameData.player.inventory.length; i++) {
                    if (quest.criteria[0].name === gameData.player.inventory[i][0].name) {
                        if (quest.criteria[1] <= gameData.player.inventory[i][1]) {
                            output = true
                        }
                    }
                }
            break;
            default:
            console.log("default switch case");
        }
        return output
    }

    function handleQuestItems(quest) {
        var updatedGameData = gameData;
        updatedGameData.player.inventory.push([quest.items, 1])
        setGameData(updatedGameData);
    }

    function checkIfQuestCompleted(quest) {
        var output = false;
        for (var i = 0; i < gameData.player.questsCompleted.length; i++) {
            if (gameData.player.questsCompleted[i].name == quest.name) {
                output = true;
            }
        }
        return output
    }
     
    function saveGame() {
        var updatedCharacterChoice = JSON.parse(JSON.stringify(characterChoice));
        updatedCharacterChoice.character = JSON.parse(JSON.stringify(gameData));

        setCharacterChoice(updatedCharacterChoice);
        dispatch(updateCharacter([characterChoice._id, updatedCharacterChoice.character]));
    }

    function submitRace(raceChoice) {
        if (raceChoice) {
            var updatedGameData = JSON.parse(JSON.stringify(gameData));
            var attributeList = Object.entries(updatedGameData.player.attributes)
            console.log(attributeList);
            for (var i = 0; i < attributeList.length; i++) {
                updatedGameData.player.attributes[attributeList[i][0]] = updatedGameData.player.attributes[attributeList[i][0]] + raceChoice.baseAttributes[i]
            }
            updatedGameData.player.race = raceChoice;

            console.log(updatedGameData.player.attributes);
            

            var health = (updatedGameData.player.attributes.strength + updatedGameData.player.attributes.endurance) / 2;
            var mana = updatedGameData.player.attributes.intelligence * (1 + raceChoice.manaMultiplier);
            var fatigue = updatedGameData.player.attributes.strength +
                            updatedGameData.player.attributes.willpower +
                            updatedGameData.player.attributes.agility +
                            updatedGameData.player.attributes.endurance;

            updatedGameData.player.health = [health, health]
            updatedGameData.player.mana = [mana, mana]
            updatedGameData.player.energy = [fatigue, fatigue]
            setGameData(updatedGameData);
            setGettingRace(false);
        }
    }

    function submitClass(classChoice) {
        if (classChoice) {
            var updatedGameData = JSON.parse(JSON.stringify(gameData));
            updatedGameData.player.class = classChoice;
            var skillList = Object.values(updatedGameData.skills);
            var skillEntries = Object.entries(updatedGameData.skills);
            for (var i = 0; i < skillList.length; i++) { //for each skill
                console.log(skillList[i])
                var level = 5; //level defines the default level for each skill
                for (var j = 0; j < updatedGameData.player.race.baseSkills.length; j++) { //for each racial skill bonus
                    if (updatedGameData.player.race.baseSkills[j][1].name == skillList[i].name) { //if player's race has a bonus to the skill
                        level = level + updatedGameData.player.race.baseSkills[j][0] //increase by that bonus
                    }
                }

                if (classChoice.specialization === skillList[i].specialization) { //if skill is of same specialization as class
                    level = level + 5;
                }

                var major = false;
                var minor = false;
                var misc = true;

                for (var z = 0; z < classChoice.major.length; z++) { //for each class major skill
                    if (skillList[i].name === classChoice.major[z].name) { //if skill is a class major skill
                        major = true;
                        misc = false;
                    }
                }

                if (!major) { //if class is not a major skill
                    for (var k = 0; k < classChoice.minor.length; k++) { //for each class minor skill
                        if (skillList[i].name === classChoice.minor[k].name) { //if skill is a class minor skill
                            minor = true;
                            misc = false;
                        }
                    }
                }
                
                if (major) { //if skill is a class major skill
                    level = level + 25
                } else if (minor) { //if skill is a class minor skill
                    level = level + 10
                }

                updatedGameData.player.skills[skillEntries[i][0]] = level
            }
            console.log(updatedGameData.player.skills)
            updatedGameData.player.showInventory = true;
            setGameData(updatedGameData);
            setGettingClass(false);
        }
    }

    function displayInventory() {
        setTarget('')
        setLookingAtInventory(!lookingAtInventory)
    }

    function closeTradeMenu() {
        setShowTradeMenu(false);
    }

    function swapItemOwner(item, owner) {
        var locations = Object.getOwnPropertyNames(gameData.locations);
        var playerLocation = gameData.player.location.name.replace(/\s/g, '');

        for (var i = 0; i < locations.length; i++) {
            if (locations[i].toLowerCase() === playerLocation.toLowerCase()) {
                playerLocation = locations[i]
            }
        }
        
        var updatedGameData = JSON.parse(JSON.stringify(gameData));
        var ownerIndex = gameData.player.location.containers.indexOf(container)
        var itemIndex = owner.inventory.indexOf(item);

        if (owner.name === container.name) {
            updatedGameData.player.inventory.push(item)
            updatedGameData.player.location.containers[ownerIndex].inventory.splice(itemIndex, 1)
            updatedGameData.locations[playerLocation].containers[ownerIndex].inventory.splice(itemIndex, 1)
        } else if (owner.name === gameData.player.name) {
            if (target) {
                updatedGameData.npcs.list.fargoth.inventory.push(item)
            } else {
                updatedGameData.player.location.containers[ownerIndex].inventory.push(item)
                updatedGameData.locations[playerLocation].containers[ownerIndex].inventory.push(item)
            }
            updatedGameData.player.inventory.splice(itemIndex, 1);
        }
        if(target) {
            return updatedGameData;
        } else {
            setContainer(updatedGameData.player.location.containers[ownerIndex]);
            setGameData(updatedGameData);
        }
    }

    function getContainer(coords) {
        var container = '';
        var listOfContainers = gameData.player.location.containers;
        for (var i = 0; i < listOfContainers.length; i++) {
            if ((listOfContainers[i].coords[0] == coords[0]) && 
                (listOfContainers[i].coords[1] == coords[1])) {
                
                container = listOfContainers[i];
            }
        }
        return container;
    }

    return (
        <>
        {gettingRace 
        ? <CharacterRaceForm submitRace={submitRace} 
                              gameData={gameData}
          />  
            :
            <>
                {gettingClass
                ? <CharacterClassForm submitClass={submitClass}
                                      gameData={gameData}
                  />
                : <> 
                    <div className="game">
                        <div className="row justify-content-md-center">
                            {lookingAtInventory 
                            ? (
                                <>
                                    <CharacterSheet 
                                        gameData={gameData}
                                    />
                                    <button onClick={() => displayInventory()}>Close</button>
                                </>
                            )
                            : (
                                <>
                                    {showTradeMenu 
                                    ? (
                                        <div className="col-lg-9">
                                            <TradeMenu
                                                gameData={gameData}
                                                container={container}
                                                swapItemOwner={swapItemOwner}
                                            />
                                        </div>
                                    )
                                    :  (
                                        <>
                                            <div className="col-lg-3">
                                                <ul className="guide">
                                                    Guide:
                                                    <li>
                                                        @ - Character
                                                    </li>
                                                    <li>
                                                        = - Door to new area
                                                    </li>
                                                    <li>
                                                        0/1 Door - (closed/open)
                                                    </li>
                                                    <li>
                                                        $ - Chest
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6 mapContainer">
                                                <Map click={click} 
                                                    setText={setText} 
                                                    setOptions={setOptions} 
                                                    setTarget={setTarget} 
                                                    map={map} 
                                                    setMap={setMap} 
                                                    gameData={gameData}
                                                    setGameData={setGameData}
                                                    openContainer={openContainer}
                                                    getContainer={getContainer}
                                                    openDoor={openDoor}
                                                    loadMap={loadMap}
                                                    getDoor={getDoor}
                                                />
                                            </div>
                                        </>
                                    )
                                    }
                                {showTradeMenu
                                ? (
                                <>
                                    <button onClick={() => closeTradeMenu()}>Close</button>
                                </>
                                )
                                : (
                                    <div className="col-lg-3">
                                        Main Menu:
                                        <br/>
                                        <button onClick={() => setCharacterChoice(false)}>return to character list</button>
                                        <br/>
                                        <button onClick={() => saveGame()}>Save</button>
                                        <br/>
                                        {gameData.player.showInventory
                                        ?
                                        <button onClick={() => displayInventory()}>
                                            Inventory
                                        </button>
                                        : ""}
                                    </div>
                                )
                                }
                            </>
                            
                            )}
                            
                        </div>
                    </div>
                
                    {target 
                    ? <TextWindow setOptions={setOptions} 
                            checkIfQuestCompleted={checkIfQuestCompleted} 
                            checkQuestComplete={checkQuestComplete}
                            options={options} 
                            text={text} 
                            target={target} 
                            setText={setText}
                            handleQuestItems={handleQuestItems} 
                            characterChoice={characterChoice}
                            gameData={gameData}
                            setGameData={setGameData}
                            setGettingRace={setGettingRace}
                            swapItemOwner={swapItemOwner}
                            setGettingClass={setGettingClass}
                            openDoor={openDoor}
                            setMap={setMap}
                            loadMap={loadMap}
                      />
                    : ""}
                </>
                }
            </>
            }
        </>
    );
}

export default GameWindow;