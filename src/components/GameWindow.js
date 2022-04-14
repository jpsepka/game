import React from 'react';
import PropTypes from 'prop-types'
import Map from './Map'
import npcs from '../data/Characters/NPC';

function GameWindow({ location, click, setLocation, setText, setOptions, setTarget, map,
                    setMap, initializeMap, setInitializeMap }) {
    

    return (
        <div className="container-fluid text-center game">
            <div className="row content">
                <div className="col-sm-2 sidenav">
                </div>
                <div className="col-sm-8 mapContainer">
                    <Map location={location} click={click} 
                    setLocation={setLocation} setText={setText} 
                    setOptions={setOptions} setTarget={setTarget} map={map}
                    setMap={setMap} initializeMap={initializeMap} setInitializeMap={setInitializeMap}/>
                </div>
                <div className="col-sm-2 sidenav"></div>
            </div>
        </div>
    );
}

export default GameWindow;