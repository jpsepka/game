import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Inventory from './Inventory';
import ProgressBar from './ProgressBar';

function CharacterSheet({gameData}) {
    const [majors, setMajors] = useState([])
    const [minors, setMinors] = useState([])
    const [miscs, setMiscs] = useState([])

    useEffect(() => {
        var skillList = Object.values(gameData.skills);
        var skillEntries = Object.entries(gameData.skills);
        var majorsList = [];
        var minorsList = [];
        var miscsList = [];
        for (var i = 0; i < skillList.length; i++) {
            var major = false;
            var minor = false;
            var misc = true;
            for (var z = 0; z < gameData.player.class.major.length; z++) { //for each class major skill
                if (skillList[i].name === gameData.player.class.major[z].name) { //if skill is a class major skill
                    major = true;
                    misc = false;
                    majorsList.push({name: skillList[i].name, level: gameData.player.skills[skillEntries[i][0]]})
                }
            }

            if (!major) { //if class is not a major skill
                for (var k = 0; k < gameData.player.class.minor.length; k++) { //for each class minor skill
                    if (skillList[i].name === gameData.player.class.minor[k].name) { //if skill is a class minor skill
                        minor = true;
                        misc = false;
                        minorsList.push({name: skillList[i].name, level: gameData.player.skills[skillEntries[i][0]]})
                    }
                }
            }
            
            if (misc) {
                miscsList.push({name: skillList[i].name, level: gameData.player.skills[skillEntries[i][0]]})
            }
        }
        
        setMajors(majorsList);
        setMinors(minorsList);
        setMiscs(miscsList);
    }, [])
    return (
        <div className="container-fluid morrowindFont morrowindColorText">
            <div className="row">
                <div className="col-sm-5 mainGoldBoxOutline charSheetSection">
                    <p className="headerBox">
                        <span className="morrowindFont headerText">{gameData.player.name}</span>
                    </p>
                    <div className="row charSheetRow">
                        <div className="col-sm-6 alignLeft morrowindFont statBoxInfo">
                            <table className="goldBoxOutline">
                                <tbody>
                                    <tr>
                                        <td className="lightText">
                                            Health
                                        </td>
                                        <td>
                                            <ProgressBar
                                                maxVal={gameData.player.health[1]}
                                                val={gameData.player.health[0]}
                                                type="rgb(155,49,25)"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="lightText">
                                            Magicka
                                        </td>
                                        <td>
                                            <ProgressBar
                                                maxVal={gameData.player.mana[1]}
                                                val={gameData.player.mana[0]}
                                                type="rgb(47,53,122)"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="lightText">
                                            Fatigue
                                        </td>
                                        <td>
                                            <ProgressBar
                                                maxVal={gameData.player.energy[1]}
                                                val={gameData.player.energy[0]}
                                                type="rgb(0,118,44)"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="goldBoxOutline">
                                <tbody>
                                    <tr>
                                        <td className="lightText">
                                            Level
                                        </td>
                                        <td className="alignRight">
                                            {gameData.player.level}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="lightText">
                                            Race
                                        </td>
                                        <td className="alignRight">
                                            {gameData.player.race.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="lightText">
                                            Class
                                        </td>
                                        <td className="alignRight">
                                            {gameData.player.class.name}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="goldBoxOutline">
                                <tbody>
                                    {(Object.entries(gameData.player.attributes)).map((attribute) => {
                                        return (
                                            <tr>
                                                <td className="lightText">
                                                    {attribute[0].charAt(0).toUpperCase() + attribute[0].slice(1)}
                                                </td>
                                                <td className="alignRight">
                                                    {attribute[1]}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            
                        </div>
                        <div className='col-sm-1'>
                            
                        </div>
                        <div className="col-sm-5 alignLeft skillList goldBoxOutline morrowindFont">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="lightText">
                                            Major Skills
                                        </td>
                                    </tr>
                                    {majors.map((skill) => {
                                        return (
                                            <tr key={skill.name}>
                                                <td className='skillListItem'>
                                                    {skill.name}
                                                </td>
                                                <td className="alignRight">
                                                    {skill.level}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td className="lightText">
                                            Minor Skills
                                        </td>
                                    </tr>
                                    {minors.map((skill) => {
                                        return (
                                            <tr key={skill.name}>
                                                <td className='skillListItem'>
                                                    {skill.name}
                                                </td>
                                                <td className="alignRight">
                                                    {skill.level}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td className="lightText">
                                            Misc Skills
                                        </td>
                                    </tr>
                                    {miscs.map((skill) => {
                                        return (
                                            <tr key={skill.name}>
                                                <td className='skillListItem'>
                                                    {skill.name}
                                                </td>
                                                <td className="alignRight">
                                                    {skill.level}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div className="col-sm-7 mainGoldBoxOutline charSheetSection">
                    <p className="headerBox">
                        <span className="morrowindFont headerText">{gameData.locations.seydaNeen.name}</span>
                    </p>
                    <pre className="smallMap">
                        {gameData.locations.seydaNeen.map}
                    </pre>
                </div>
            </div>
            <div className='row'>
                <Inventory 
                    gameData={gameData}
                    owner={gameData.player}
                />
            </div>
        </div>
    );
}

export default CharacterSheet;