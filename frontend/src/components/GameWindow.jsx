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
        setTarget(person);

        var newPlayer = JSON.parse(JSON.stringify(gameData.player))
        newPlayer.target = person;
        updateGameData(newPlayer, 'player')

        setText([person.greeting]);
        person.sortDialogue();
        var test = [];
        for (var i = 0; i < person.dialogue.length; i++) {
            test[i] = person.dialogue[i].option;
        }
        setOptions(test);
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
    const dispatch = useDispatch();
     
    function saveGame() {
        var updatedCharacterChoice = JSON.parse(JSON.stringify(characterChoice));
        updatedCharacterChoice.character = JSON.parse(JSON.stringify(gameData));

        setCharacterChoice(updatedCharacterChoice);
        dispatch(updateCharacter([characterChoice._id, updatedCharacterChoice.character]));
    }

    function submitRace(raceChoice) {
        if (raceChoice) {
            var updatedGameData = JSON.parse(JSON.stringify(gameData));
            updatedGameData.player.race = raceChoice;
            for (var i = 0; i < updatedGameData.player.attributes.length; i++) {
                updatedGameData.player.attributes[i][1] = updatedGameData.player.attributes[i][1] + raceChoice.baseAttributes[i]
            }
            var health = 0;
            var mana = 0;
            var fatigue = 0;
            for (var z = 0; z < updatedGameData.player.attributes.length; z++) {
                if ((updatedGameData.player.attributes[z][0].name == "Strength") || (updatedGameData.player.attributes[z][0].name == "Endurance")) {
                    health = health + updatedGameData.player.attributes[z][1]
                    fatigue = fatigue + updatedGameData.player.attributes[z][1]
                } else if (updatedGameData.player.attributes[z][0].name == "Intelligence") {
                    mana = mana + updatedGameData.player.attributes[z][1]
                } else if ((updatedGameData.player.attributes[z][0].name == "Willpower") || (updatedGameData.player.attributes[z][0].name == "Agility")) {
                    fatigue = fatigue + updatedGameData.player.attributes[z][1];
                }
            }
            health = health / 2;
            mana = mana * (1 + raceChoice.manaMultiplier);

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
            for (var i = 0; i < skillList.length; i++) {
                var major = false;
                var minor = false;
                var misc = true;
                for (var j = 0; j < classChoice.major.length; j++) {
                    if (skillList[i].name === classChoice.major[j].name) {
                        major = true;
                        misc = false;
                    }
                }
                for (var k = 0; k < classChoice.minor.length; k++) {
                    if (skillList[i].name === classChoice.minor[k].name) {
                        minor = true;
                        misc = false;
                    }
                }

                var level = 5;

                for (var l = 0; l < updatedGameData.player.race.baseSkills.length; l++) {
                    if (updatedGameData.player.race.baseSkills[l][1].name == skillList[i].name) {
                        level = level + updatedGameData.player.race.baseSkills[l][0]
                    }
                }

                if (classChoice.specialization === skillList[i].specialization) {
                    level = level + 5;
                }
                
                if (major) {
                    level = level + 25;
                    updatedGameData.player.majorSkills.push([skillList[i], level])
                } else if (minor) {
                    level = level + 10;
                    updatedGameData.player.minorSkills.push([skillList[i], level])
                } else {
                    updatedGameData.player.miscSkills.push([skillList[i], level]);
                }
            }
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

    function openDoor() {
        
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