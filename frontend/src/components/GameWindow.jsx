import React from 'react';
import Map from './Map'
import {updateCharacter} from '../features/characters/characterSlice'
import {useDispatch} from 'react-redux';
import TextWindow from './TextWindow';
import { useState } from 'react';
import {Player} from '../data/Characters/Player'
import {Location} from '../data/Location/Location'
import {NPC} from '../data/Characters/NPC'
import { useEffect } from 'react';
import CharacterRaceSheet from './CharacterRaceSheet';
import CharacterSheet from './CharacterSheet';
import TradeMenu from './TradeMenu';

function GameWindow({ characterChoice, setCharacterChoice }) {
    const [gameData, setGameData] = useState(characterChoice.character);
    const [target, setTarget] = useState(false);
    const [text, setText] = useState([])
    const [options, setOptions] = useState([])
    const [questLog, setQuestLog] = useState([])
    const [inventory, setInventory] = useState('');
    const [questsCompleted, setQuestsCompleted] = useState('');
    const [map, setMap] = useState([[[],[]],[[],[]]]);
    const [gettingRace, setGettingRace] = useState(false);
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
        var inQuestLog = gameData.player.questsCompleted.includes(quest);
        switch(quest.type) {
            case "Gather":
                for (var i = 0; i < gameData.player.inventory.length; i++) {
                    if (quest.criteria[0].name === gameData.player.inventory[i][0].name) {
                        if (quest.criteria[1] <= gameData.player.inventory[i][1]) {
                            output = true
                            if (inQuestLog) {
                                handleQuestItemHandIn(quest)
                            }
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
        setInventory(old => [...old, [quest.items, 1]])
    }

    function handleQuestItemHandIn(quest) {
        var inventoryLocation;
        for (var i = 0; i < gameData.player.inventory.length; i++) {
            if (quest.criteria[0].name === gameData.player.inventory[i][0].name) {
                inventoryLocation = i;
            }
        }
        var newAmount = gameData.player.inventory[inventoryLocation][1] - quest.criteria[1]
        var newInventory = gameData.player.inventory.filter((item) => item !== gameData.player.inventory[inventoryLocation])
        
        var updatedGameData = gameData;
        updatedGameData.player.inventory = newInventory;

        setGameData(updatedGameData);


        if (newAmount == 0) {
        setInventory([...newInventory])
        } else {
        var newItem = inventory[inventoryLocation]
        newItem[1] = newAmount
        setInventory([...newInventory, newItem])
        }
    }

    function checkIfQuestComplete(quest) {
        var output = false;
        for (var i = 0; i < questsCompleted.length; i++) {
            if (questsCompleted[i] == quest) {
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
            updatedGameData.player.showInventory = true;
            setGameData(updatedGameData);
            setGettingRace(false);
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
            updatedGameData.player.location.containers[ownerIndex].inventory.push(item)
            updatedGameData.locations[playerLocation].containers[ownerIndex].inventory.push(item)
            updatedGameData.player.inventory.splice(itemIndex, 1);
        }
        setContainer(updatedGameData.player.location.containers[ownerIndex]);
        setGameData(updatedGameData);
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
        {gettingRace ? <CharacterRaceSheet submitRace={submitRace} 
                                            gameData={gameData}
                        />  
                     :
            <>
                <div className="game">
                    <div className="row justify-content-md-center">
                        {lookingAtInventory 
                        ? (
                            <div className="col-lg-9">
                                <CharacterSheet 
                                    gameData={gameData}
                                />
                            </div>
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
                            </>
                        )}
                        {showTradeMenu
                        ? (
                        <>
                            <button onClick={() => closeTradeMenu()}>Close</button>
                            <br/>
                            <button onClick={() => console.log(gameData.player.inventory)}>Print Inventory</button>
                            <br/>
                            <button onClick={() => console.log(container.inventory)}>container inventory</button>
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
                                <button onClick={() => displayInventory()}>
                                    {lookingAtInventory
                                        ? "Close"
                                        : "Inventory"
                                    }
                                </button>
                                <br/>
                            </div>
                          )
                        }
                        
                    </div>
                </div>
                {target 
                ? <TextWindow setOptions={setOptions} 
                            checkIfQuestComplete={checkIfQuestComplete} 
                            setQuestsCompleted={setQuestsCompleted} 
                            checkQuestComplete={checkQuestComplete} 
                            questLog={questLog} 
                            options={options} 
                            text={text} 
                            target={target} 
                            setText={setText}   
                            setQuestLog={setQuestLog} 
                            handleQuestItems={handleQuestItems} 
                            characterChoice={characterChoice}
                            gameData={gameData}
                            setGameData={setGameData}
                            setGettingRace={setGettingRace}
                            handleQuestItemHandIn={handleQuestItemHandIn}
                />
                : ""}
            </>
            }
        </>
    );
}

export default GameWindow;