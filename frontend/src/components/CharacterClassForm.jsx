import React from 'react';
import { useState } from 'react';

function CharacterClassForm({submitClass, gameData}) {
    const [classChoice, setClassChoice] = useState(false);
    const classList = Object.values(gameData.classes);
    console.log(classChoice);

    return (
        <div className="container alignLeft mainGoldBoxOutline morrowindColorText classBox">
            <div className="row">
                <div className="col-lg-1">
                    
                </div>
                <div className="morrowindFont goldBoxOutline boxSpacing col-lg-3">
                    <ul className="classList">
                        {classList.map((classInList, classId) => {
                            return (
                                <li onClick={() => setClassChoice(classInList)}key={classId}>{classInList.name}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="col-lg-1">

                </div>
                <div className="morrowindFont npcText goldBoxOutline boxSpacing classDesc col-lg-6">
                    {classChoice
                    ? classChoice.description
                    : ""}
                </div>
            </div>
            <div className="row">
                <div className="alignLeft morrowindFont col-lg-4">
                    Specialization:
                    <br/>
                    {classChoice
                    ? classChoice.specialization
                    : ""}
                    <br/>
                    <br/>
                    Favorite Attributes:
                    <br/>
                    {classChoice
                    ?   <>
                            {classChoice.attributes[0].name}
                            <br/>
                            {classChoice.attributes[1].name}
                        </>
                    : ""}
                    <br/>
                </div>
                <div className="alignLeft morrowindFont col-lg-4">
                    Major Skills:
                    <ul>
                        {classChoice
                        ? classChoice.major.map((major, majorId) => {
                            return (
                                <li className="skillList" key={majorId}>{major.name}</li>
                            )
                        })
                        : ""}
                    </ul>
                </div>
                <div className="alignLeft morrowindFont col-lg-4">
                    Minor Skills:
                    <ul>
                        {classChoice
                        ? classChoice.minor.map((minor, minorId) => {
                            return (
                                <li className="skillList" key={minorId}>{minor.name}</li>
                            )
                        })
                        : ""}
                    </ul>
                </div>
            </div>
            <p className="alignRight">
                <span onClick={() => submitClass(classChoice)} className="goldBoxOutline morrowindTextButton">OK</span>
            </p>
        </div>
    );
}

export default CharacterClassForm;