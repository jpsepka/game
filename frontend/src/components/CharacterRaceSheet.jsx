import React from 'react';
import { useState } from 'react';

function CharacterRaceSheet({submitRace, gameData}) {
    const [raceChoice, setRaceChoice] = useState(false);
    const raceList = Object.values(gameData.races);
    const [gender, setGender] = useState(true);

    return (
        <div className="container mainGoldBoxOutline morrowindColorText raceBox">
            <div className="row">
                <div className="col-md-6">
                    Appearance
                    {raceChoice 
                        ? (
                            <div style={raceChoice.color} className="goldBoxOutline appearanceBox">
                                @
                            </div>
                          )
                        : (
                            <div className="goldBoxOutline appearanceBox">
                                @
                            </div>
                          )
                    }
                    <div className="row text-center">
                        <div className="genderConfirmA">
                            <button className="morrowindTextButton morrowindColorText" onClick={() => setGender(!gender)}>Back</button>
                        </div>
                        {
                        //just for show lols
                        }
                        <div className="genderConfirmText">{gender ? "M" : "F"}</div>
                        <div className="genderConfirmB">
                            <button className="morrowindTextButton morrowindColorText" onClick={() => setGender(!gender)}>Next</button>
                            <button onClick={() => submitRace(raceChoice)} className="morrowindTextButton confirmRace morrowindColorText">OK</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    Race
                    <div className="goldBoxOutline">
                        <ul className="raceList">
                            {raceList.map((race, raceId) => {
                                return (
                                    <li onClick={() => setRaceChoice(race)} key={raceId}>{race.name}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    Skill Bonuses
                    <div>
                        <ul className="skillBonuses">
                            {raceChoice ? (
                                <>
                                {raceChoice.baseSkills.map((skill, skillId) => {
                                    return(
                                        <li key={skillId}>{skill[1].name} +{skill[0]}</li>
                                    )
                                })}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CharacterRaceSheet;

/*
<div>
    <br/>
    Specials
    <ul className="characterSpecials">
        <li>Ancestors Guardian</li>
        <li>Resist Fire</li>
    </ul>
</div
*/