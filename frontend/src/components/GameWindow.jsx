import React from 'react';
import Map from './Map'
import {deleteCharacter, createCharacter, updateCharacter} from '../features/characters/characterSlice'
import {useDispatch} from 'react-redux';
import TextWindow from './TextWindow';
import { useState } from 'react';
import {Player} from '../data/Characters/Player'
import {Location} from '../data/Location/Location'
import {NPC} from '../data/Characters/NPC'
import { useEffect } from 'react';

function GameWindow({ characterChoice, setCharacterChoice }) {
    const [gameData, setGameData] = useState(characterChoice.character);
    const [player, setPlayer] = useState(characterChoice.character.player)
    const [target, setTarget] = useState(false);
    const [text, setText] = useState([])
    const [options, setOptions] = useState([])
    const [questLog, setQuestLog] = useState([])
    const [inventory, setInventory] = useState('');
    const [questsCompleted, setQuestsCompleted] = useState('');
    const [map, setMap] = useState([[[],[]],[[],[]]]);
    
    useEffect(() => {
        console.log(characterChoice);
        var newGameData = JSON.parse(JSON.stringify(characterChoice.character));
        newGameData.player = Object.assign(new Player(), newGameData.player);
        newGameData.player.location = Object.assign(new Location(), newGameData.player.location);
        

        setGameData(newGameData);
        /*
        var player = JSON.parse(JSON.stringify(characterChoice.character.player));
        var location = player.location;
        location = Object.assign(new Location(), location);
        player.location = location;
        */
        setPlayer(newGameData.player);
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

        /*
        var newGameData = JSON.parse(JSON.stringify(gameData))
        console.log(newGameData);
        console.log(newGameData.player);
        newGameData.player.target = person;
        setGameData(newGameData);
        */

        setText([person.greeting]);
        person.sortDialogue();
        var test = [];
        for (var i = 0; i < person.dialogue.length; i++) {
            test[i] = person.dialogue[i].option;
        }
        setOptions(test);
    }

    function checkQuestComplete(quest) {
        var output = false;
        switch(quest.type) {
            case "Gather":
            for (var i = 0; i < inventory.length; i++) {
                if (quest.criteria[0] == inventory[i][0]) {
                    if (quest.criteria[1] <= inventory[i][1]) {
                        output = true
                        handleQuestItemHandIn(quest)
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
        for (var i = 0; i < inventory.length; i++) {
        if (quest.criteria[0] == inventory[i][0]) {
            inventoryLocation = i;
        }
        }
        var newAmount = inventory[inventoryLocation][1] - quest.criteria[1]
        var newInventory = inventory.filter((item) => item !== inventory[inventoryLocation])

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
        var updatedCharacter = JSON.parse(JSON.stringify(player));
        /*
        dispatch(deleteCharacter(characterChoice._id));
        updatedCharacterChoice.character.player = updatedCharacter
        updatedCharacterChoice._id = characterChoice._id
        console.log(updatedCharacterChoice);
        setCharacterChoice(updatedCharacterChoice);
        dispatch(createCharacter(updatedCharacterChoice.character))
        */
       var test = characterChoice._id
       var test2 = updatedCharacterChoice.character
       test2.player = updatedCharacter;
       updatedCharacterChoice.character.player = updatedCharacter
       setCharacterChoice(updatedCharacterChoice);
       console.log(updatedCharacterChoice.character);
       dispatch(updateCharacter([characterChoice._id, updatedCharacterChoice.character]));
    }

    return (
        <>
        <div className="game">
            <div className="row justify-content-md-center">
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
                </ul>
                </div>
                <div className="col-lg-6 mapContainer">
                    <Map click={click} 
                         setText={setText} 
                         setOptions={setOptions} 
                         setTarget={setTarget} 
                         map={map} 
                         setMap={setMap} 
                         player={player} 
                         setPlayer={setPlayer}
                         gameData={gameData}
                         setGameData={setGameData}/>
                </div>
                <div className="col-lg-3">
                    Main Menu:
                    <br/>
                    <button onClick={() => setCharacterChoice(false)}>return to character list</button>
                    <br/>
                    <button onClick={() => saveGame()}>Save</button>
                    <br/>
                    Name: {player.name}
                </div>
            </div>
        </div>
        {target ? 
        <TextWindow setOptions={setOptions} 
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
                    setPlayer={setPlayer} 
                    player={player}
                    gameData={gameData}
                    setGameData={setGameData}
        />
          : <></>}
        </>
    );
}

export default GameWindow;