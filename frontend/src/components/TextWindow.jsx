import React from 'react';
import {useState, useEffect} from 'react'

function TextWindow({ setOptions, checkIfQuestComplete, setQuestsCompleted, 
    checkQuestComplete, questLog, options, text, target, setText, setQuestLog, 
    handleQuestItems, gameData, setGameData, setGettingRace, handleQuestItemHandIn }) {
    
    var notarget = true;
    const [getUserInput, setGetUserInput] = useState(false);
    const [choices, setChoices] = useState([]);
    const [quest, setQuest] = useState();
    if (target.name == '') {
        notarget = true;
    } else {
        notarget = false;
    }

    useEffect(() => {
        var textBox = document.getElementById('npcDialogueBox')
        textBox.scrollTop = textBox.scrollHeight;
    }, [text])

    function getFollowUpQuest(quest) {
        var quests = Object.entries(gameData.dialogue);
        var followUpQuest = '';
        for(var i = 0; i < quests.length; i++) {
            if (quest.followup == quests[i][1].questId) {
                followUpQuest = quests[i][1];
            }
        }
        return followUpQuest
    }

    function getFollowUpDialogue(quest) {
        var followUpQuest = getFollowUpQuest(quest);
        var dialogues = Object.entries(gameData.dialogue.questDialogue);
        var followUpDialogue = '';
        for (var i = 0; i < dialogues.length; i++) {
            if (followUpQuest.dialogue == dialogues[i][1].id) {
                followUpDialogue = dialogues[i][1];
            }
        }
        return followUpDialogue;
    }

    function updateFollowUpNpcDialogue(dialogue) {
        var followUpNpcId = gameData.dialogue.quest.receiverId
        var npcsArray = Object.entries(gameData.dialogue);
        for (var i = 0; i < npcsArray.length; i++) {
           if (followUpNpcId == npcsArray[i][1].id) {
               npcsArray[i][1].dialogue.push(dialogue);
           }
       }
    }

    function checkQuestReceiver(questPick) {
        var output = false;
        if (target.id == questPick.receiverId) {
            output = true;
        }
        return output;
    }

    function handleOptionClick(choice) {
        if (target.dialogue[choice].quest != -1) { //if option starts a quest
            console.log("option starts a quest")
            var questPick = target.dialogue[choice].quest;
            var inQuestLog = false;
            for (var i = 0; i < questLog.length; i++) {
                if (questLog[i] == questPick) {
                    inQuestLog = true;
                }
            }
            if (inQuestLog) { //if in quest log
                console.log("in quest log");
                if (checkQuestComplete(questPick)) { //if quest is complete
                    console.log("quest is complete");
                    if (checkQuestReceiver(questPick)) { //if talking to the receiver
                        console.log("talking to the receiver");
                        setText(old => [...old, target.dialogue[choice].option, questPick.complete])
                        setQuestsCompleted(old => [...old, questPick])
                        setQuestLog(questLog.filter((quest) => quest !== questPick))
                    }
                    if (questPick.followup >= 0) { //if there is a followup quest
                        console.log("quest has a followup")
                        var followUpDialogue = getFollowUpDialogue(questPick);
                        target.dialogue.push(followUpDialogue)
                        target.sortDialogue();
                        var newOptionsList = [];
                        for (var i = 0; i < target.dialogue.length; i++) {
                            newOptionsList[i] = target.dialogue[i].option
                        }
                        setOptions(newOptionsList)
                        updateFollowUpNpcDialogue(followUpDialogue);
                    }
                } else { //if quest is not complete
                    console.log("quest is not complete")
                    setText(old => [...old, target.dialogue[choice].option, questPick.reminder]);
                }
            } else if (!inQuestLog) { //if not in quest log
                if (checkIfQuestComplete(questPick)) { //if not in quest log but previously completed
                    console.log("quest not in log but previously completed");
                    setText(old => [...old, target.dialogue[choice].option, questPick.afterText])
                } else if (checkQuestComplete(questPick)) {//if not in quest log but meet criteria
                    console.log("quest not in log but meets criteria")
                    setText(old => [...old, target.dialogue[choice].option, target.dialogue[choice].text])
                    setGetUserInput(true);
                    setChoices([questPick.alreadyCompleted, questPick.decline])
                    setQuest(questPick);
                } else { //if not in quest log, don't meet criteria, and not previously completed
                    console.log("quest not in log, don't meet criteria, and not previously completed")
                    setText(old => [...old, target.dialogue[choice].option, target.dialogue[choice].text]);
                    setGetUserInput(true);
                    setQuest(questPick);
                    setChoices([questPick.decline])
                    if (target.dialogue[choice].choices.length > 0) { //if requires user input
                        console.log("requires user input")
                        setGetUserInput(true);
                        setChoices(target.dialogue[choice].choices)
                        setQuest(questPick);
                    }
                }
            }
        } else if (target.dialogue[choice].id == 0) { //if option is for character name event
            console.log("option is for character name event")
            var option = target.dialogue[choice].option;
            var text = target.dialogue[choice].text;
            setText(old => [...old, option, text]);            
            setOptions([])

            var updatedGameData = JSON.parse(JSON.stringify(gameData))
            updatedGameData.player.name = prompt("What is your name?")
            updatedGameData.locations.imperialPrisonShipDownstairs.map[3][7] = "1";
            updatedGameData.player.location = updatedGameData.locations.imperialPrisonShipDownstairs
            updatedGameData.npcs.list.jiub.greeting = "You better do what they say...";
            updatedGameData.npcs.list.jiub.dialogue = [];
            setGameData(updatedGameData);
        } else if (target.dialogue[choice].id == 1) {//if option is for character race choice
            console.log("option is for character race event")
            setGettingRace(true);
        } else { //if option does not start a quest
            console.log("option does not start a quest")
            setText(old => [...old, target.dialogue[choice].option, target.dialogue[choice].text]);
        }
    }

    function handleTextChoice(choice) {
        if (choice.accept) { //if accepting
            if (checkQuestComplete(quest)) { //if quest is already complete
                handleQuestItemHandIn(quest);
                setText(old => [...old, quest.complete[1], quest.complete[0]])
            } else { //if quest criteria is not completed
                if (quest.items != -1) { //if accepted quest gives items
                    handleQuestItems(quest);
                }
                setQuestLog(old => [...old, quest])
                setText(old => [...old, quest.acceptQuestText])
            }
        } else if (!choice.accept) { //if quest is declined
            console.log(quest);
            setText(old => [...old, quest.declineQuestText])
        }
        setGetUserInput(false);
        setQuest(0)
    }
    
    return (
        <div className="container-fluid text">
            <p className="headerBox text-center">
                <span className="headerText">{!notarget ? target.name : (" ")}</span>
            </p>
            <div id="npcDialogueBox" className="col-sm-10 npcTextBox goldBoxOutline">
            {!notarget ? text.map((line, id) => (
                <p id={id}>{line}</p>
            )) : ""}
            {!notarget && getUserInput ? choices.map((choice) => (
                <p><a onClick={()=>handleTextChoice(choice)}>{choice.text}</a></p>
            )) : ""}
            </div>
            <div className="col-sm-2">
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: target.opinion + '%'}}></div>
                    <div className="progress-bar-text">{target.opinion} / 100</div>
                </div>
                <ul>
                <div className="npcTextOptions">{!notarget ? options.map((option, id) => (
                    <>
                        <p id={id} onClick={()=> {
                            handleOptionClick(id)
                        }}>{option}</p>
                    </>
                )) : " "}</div>
                </ul>
            </div>
        </div>
    );
}

export default TextWindow;