import React from 'react';
import {useState, useEffect} from 'react'
import ProgressBar from './ProgressBar';

function TextWindow({ setOptions, checkIfQuestCompleted, 
    checkQuestComplete, options, text, target, setText, 
    handleQuestItems, gameData, setGameData, setGettingRace, 
    swapItemOwner, setGettingClass, openDoor, setMap, loadMap,
    calculateDisposition }) {
    
    var notarget = true;
    const [getUserInput, setGetUserInput] = useState(false);
    const [choices, setChoices] = useState([]);
    const [quest, setQuest] = useState();
    const [opinion, setOpinion] = useState(target.opinion);

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
        setChoices([]);
        console.log("Now handling option click...")
        if (target.dialogue[choice].quest) { //if option starts a quest
            console.log("option starts a quest")
            var questPick = target.dialogue[choice].quest;
            var inQuestLog = false;
            for (var i = 0; i < gameData.player.questLog.length; i++) {
                if (gameData.player.questLog[i].name == questPick.name) {
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
                        var updatedGameData = JSON.parse(JSON.stringify(gameData));
                        updatedGameData.player.questsCompleted.push(questPick);
                        updatedGameData.player.questLog.filter((quest) => quest !== questPick)
                        setGameData(updatedGameData);
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
                if (checkIfQuestCompleted(questPick)) { //if not in quest log but previously completed
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
            updatedGameData.player.location = openDoor([3,7]);
            updatedGameData.npcs.jiub.greeting = "You better do what they say...";
            updatedGameData.npcs.jiub.dialogue = [];
            setGameData(updatedGameData);
            setMap(loadMap())
        } else if (target.dialogue[choice].id == 1) {//if option is for character race choice
            console.log("option is for character race event")
            setGettingRace(true);
        } else if (target.dialogue[choice].id == 100) {
            console.log("option is for character class event")
            setGettingClass(true);
        } else { //if option does not start a quest
            console.log("option does not start a quest")
            setText(old => [...old, target.dialogue[choice].option, target.dialogue[choice].text]);
        }
        console.log("-------------------------------------")
    }

    //this function currently only refers to quest choices
    function handleTextChoice(choice) {
        var updatedGameData = JSON.parse(JSON.stringify(gameData));
        console.log("Now handling text choice...")
        var inQuestLog = false;
        for (var i = 0; i < gameData.player.questLog.length; i++) {
            if (gameData.player.questLog[i].name == quest.name) {
                inQuestLog = true;
            }
        }
        if (choice.accept) { //if accepting
            console.log("accepting")
            if (checkQuestComplete(quest)) { //if quest criteria is met
                console.log("quest criteria is met")
                updatedGameData = swapItemOwner(quest.criteria, gameData.player);
                if (inQuestLog) { //if criteria is met and in quest log
                    console.log("criteria is met and quest is in quest log")
                    updatedGameData.player.questLog.filter((quest) => quest !== quest)
                }
                if (quest.reward) { //if quest has a reward
                    console.log("quest has a reward")
                    for (const [key, value] of Object.entries(quest.reward)) {
                        if (key == 'disposition') {
                            updatedGameData.npcs[target.name.charAt(0).toLowerCase() + target.name.slice(1)].opinion += value
                            setOpinion(calculateDisposition(updatedGameData.npcs[target.name.charAt(0).toLowerCase() + target.name.slice(1)]))
                        }
                    }
                }
                if (quest.script) { //if quest has a script
                    console.log("quest has a script")
                    for (const [key, value] of Object.entries(quest.script)) {
                        var newValue = value.replace('%PCNAME', gameData.player.name)
                        updatedGameData.npcs[target.name.charAt(0).toLowerCase() + target.name.slice(1)][key] = newValue
                    }
                }
                updatedGameData.player.questsCompleted.push(quest);
                setText(old => [...old, quest.complete[1], quest.complete[0]])
            } else { //if quest criteria is not met
                console.log("quest criteria is not met")
                if (quest.items != -1) { //if accepted quest gives items
                    console.log("accepted quest gives items")
                    handleQuestItems(quest);
                }
                updatedGameData.player.questLog.push(quest);
                setText(old => [...old, quest.acceptQuestText])
            }
        } else if (!choice.accept) { //if declining
            console.log("declining")
            setText(old => [...old, quest.declineQuestText])
        }
        setGetUserInput(false);
        setQuest(0)
        setGameData(updatedGameData);
        console.log("-------------------------------------")
    }
    
    return (
        <div className="morrowindFont mainGoldBoxOutline container text">
            <p className="headerBox text-center">
                <span className="headerText">{!notarget ? target.name : (" ")}</span>
            </p>
            <div className='row textBox '>
            <div id="npcDialogueBox" className="col-sm-10 npcTextBox npcTextBoxSizing goldBoxOutline">
            {!notarget 
            ? (
                <>
                {text.map((line, id) => (
                    <div key={id}>
                        {line.title
                        ? (
                            <p className="morrowindFont npcText lightText">
                                {line.text}
                            </p>
                        )
                        : (
                            <p className="morrowindFont npcText">
                                {line}
                            </p>
                        )
                        }
                    </div>
                ))}
                </>
            )
            : ""}
            {!notarget && getUserInput ? choices.map((choice, id) => (
                <p key={id} className="morrowindFont choices">
                    <a onClick={()=>handleTextChoice(choice)}>
                        {choice.text}
                    </a>
                </p>
            )) : ""}
            </div>
            <div className="col-sm-2 morrowindFont npcTextBoxSpecial npcTextBoxSizing">
                <ProgressBar
                    maxVal = {100}
                    val = {opinion}
                    type = 'textWindow'
                />
                <div className="npcTextOptions goldBoxOutline">
                {!notarget 
                ? options.map((option, id) => (
                    <p className="options" key={id} onClick={()=> {handleOptionClick(id)}}>
                        {option.text}
                    </p>
                )) 
                : " "}
                </div>
            </div>
            </div>
        </div>
    );
}

export default TextWindow;