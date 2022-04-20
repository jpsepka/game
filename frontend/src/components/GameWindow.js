import React from 'react';
import Map from './Map'
import {deleteCharacter} from '../features/characters/characterSlice'
import {useDispatch} from 'react-redux';
import TextWindow from './TextWindow';
import { useState } from 'react';
import {Player} from '../data/Characters/Player'
import {Location} from '../data/Location/Location'
import { useEffect } from 'react';
import {createCharacter} from '../features/characters/characterSlice'

function GameWindow({ characterChoice, setCharacterChoice }) {
    const [player, setPlayer] = useState({coords: [2,4], map: false})
    const [target, setTarget] = useState(false);
    const [text, setText] = useState([])
    const [options, setOptions] = useState([])
    const [questLog, setQuestLog] = useState([])
    const [inventory, setInventory] = useState('');
    const [questsCompleted, setQuestsCompleted] = useState('');
    const [map, setMap] = useState([[[],[]],[[],[]]]);
    
    useEffect(() => {
        console.log(characterChoice)
        var player = JSON.parse(JSON.stringify(characterChoice.character.player));
        var location = player.location;
        location = Object.assign(new Location(), location);
        player.location = location;
        setPlayer(Object.assign(new Player(), player));
        setMap(player.location.map);
    }, [characterChoice])

    function click(person) {
        console.log(person);
        setOptions([])
        setTarget(person);
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
        dispatch(deleteCharacter(characterChoice._id));
        updatedCharacterChoice.character.player = updatedCharacter
        setCharacterChoice(updatedCharacterChoice);
        console.log(updatedCharacterChoice);
        dispatch(createCharacter(updatedCharacterChoice.character))
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
                    <Map click={click} setText={setText} 
                    setOptions={setOptions} setTarget={setTarget} map={map} 
                    setMap={setMap} player={player} setPlayer={setPlayer}/>
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
        <TextWindow setOptions={setOptions} checkIfQuestComplete={checkIfQuestComplete} 
          setQuestsCompleted={setQuestsCompleted} checkQuestComplete={checkQuestComplete} 
          questLog={questLog} options={options} text={text} target={target} setText={setText} 
          setQuestLog={setQuestLog} handleQuestItems={handleQuestItems} 
          characterChoice={characterChoice} setPlayer={setPlayer} player={player}/>
          : <></>}
        </>
    );
}

export default GameWindow;