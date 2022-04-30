import React from 'react';
import Inventory from './Inventory';
import ProgressBar from './ProgressBar';

function CharacterSheet({gameData}) {
    return (
        <div className="container-fluid morrowindFont mainGoldBoxOutline morrowindColorText">
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
                                    {gameData.player.attributes.map((attribute) => {
                                        return (
                                            <tr>
                                                <td className="lightText">
                                                    {attribute[0].name}
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
                        <div className="col-sm-5 alignLeft goldBoxOutline morrowindFont">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="lightText">
                                            Major Skills
                                        </td>
                                    </tr>
                                    {gameData.player.majorSkills.map((skill) => {
                                        return (
                                            <tr key={skill[0].name}>
                                                <td className='skillListItem'>
                                                    {skill[0].name}
                                                </td>
                                                <td className="alignRight">
                                                    {skill[1]}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td className="lightText">
                                            Minor Skills
                                        </td>
                                    </tr>
                                    {gameData.player.minorSkills.map((skill) => {
                                        return (
                                            <tr key={skill[0].name}>
                                                <td className='skillListItem'>
                                                    {skill[0].name}
                                                </td>
                                                <td className="alignRight">
                                                    {skill[1]}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td className="lightText">
                                            Misc Skills
                                        </td>
                                    </tr>
                                    {gameData.player.miscSkills.map((skill) => {
                                        return (
                                            <tr key={skill[0].name}>
                                                <td className='skillListItem'>
                                                    {skill[0].name}
                                                </td>
                                                <td className="alignRight">
                                                    {skill[1]}
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