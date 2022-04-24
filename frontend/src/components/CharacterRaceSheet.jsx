import React from 'react';
import { useState } from 'react';
import races from '../data/Race/Race'

function CharacterRaceSheet() {
    const [raceChoice, setRaceChoice] = useState(false);
    const raceList = Object.values(races);
    const [gender, setGender] = useState(false);
    console.log(raceList);

    return (
        <div className="container mainGoldBoxOutline raceBox">
            <div className="row">
                <div className="col-md-6">
                    Appearance
                    <div style={raceChoice.color} className="goldBoxOutline appearanceBox">
                        {raceChoice ? (
                            <>
                            @
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    <div className="row text-center">
                        <div className="col-md-2">
                            <button onClick={() => setGender(!gender)}>Back</button>
                        </div>
                        {
                        //just for show lol
                        }
                        <div className="col-md-8">{gender ? "M" : "F"}</div>
                        <div className="col-md-2">
                            <button onClick={() => setGender(!gender)}>Next</button>
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