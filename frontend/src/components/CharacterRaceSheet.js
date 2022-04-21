import React from 'react';

function CharacterRaceSheet() {
    return (
        <div className="container mainGoldBoxOutline raceBox">
            <div className="row">
                <div className="col-md-6">
                    Appearance
                    <div className="goldBoxOutline appearanceBox">
                        @
                    </div>
                    <div className="row text-center">
                        <div className="col-md-2">
                            <button>Back</button>
                        </div>
                        <div className="col-md-8">M</div>
                        <div className="col-md-2">
                            <button>Next</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    Race
                    <div className="goldBoxOutline">
                        <ul className="raceList">
                            <li>Argonian</li>
                            <li>Breton</li>
                            <li>Dark Elf</li>
                            <li>High Elf</li>
                            <li>Imperial</li>
                            <li>Khajit</li>
                            <li>Nord</li>
                            <li>Orc</li>
                            <li>Reguard</li>
                            <li>Wood Elf</li>
                        </ul>
                    </div>
                    <div>
                        <br/>
                        Specials
                        <ul className="characterSpecials">
                            <li>Ancestors Guardian</li>
                            <li>Resist Fire</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    Skill Bonuses
                    <div>
                        <ul className="skillBonuses">
                            <li>Athletics 5</li>
                            <li>Destruction 10</li>
                            <li>Light Armor 5</li>
                            <li>Long Blade 5</li>
                            <li>Marksman 5</li>
                            <li>Mysticism 5</li>
                            <li>Short Blade 10</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterRaceSheet;