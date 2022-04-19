import React from 'react';
import Map from './Map'
import {updateCharacter} from '../features/characters/characterSlice'
import {useDispatch} from 'react-redux';

function GameWindow({ location, click, setLocation, setText, setOptions, setTarget, map,
                    setMap, initializeMap, setInitializeMap, setCharacterChoice, 
                    characterChoice, player }) {
    const dispatch = useDispatch();
    console.log("characterChoice:")
    console.log(characterChoice);
                    
    return (
        <div className="game">
            <div class="row justify-content-md-center">
                <div class="col-lg-3">
                <ul className="guide">
                    Guide:
                    <li>
                        @ - Character
                    </li>
                    <li>
                        = - Door to new area
                    </li>
                    <li>
                        0/1 - Door (closed/open)
                    </li>
                </ul>
                </div>
                <div className="col-lg-6 mapContainer">
                    <Map location={location} click={click} 
                    setLocation={setLocation} setText={setText} 
                    setOptions={setOptions} setTarget={setTarget} map={map}
                    setMap={setMap} initializeMap={initializeMap} 
                    setInitializeMap={setInitializeMap}/>
                </div>
                <div class="col-lg-3">
                    Main Menu:
                    <br/>
                    <button onClick={() => setCharacterChoice(false)}>return to character list</button>
                    <br/>
                    <button onClick={() => dispatch(updateCharacter([characterChoice._id, player]))}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default GameWindow;