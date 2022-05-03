import items from "../Items";

class Quest {
    constructor(name, acceptQuestText, declineQuestText, reminder, criteria, type, 
        complete, afterText, prereq, dialogue, questId, followup, giverId, receiverId,
        items, alreadyCompleted, decline, reward, script) {
        this.name = name;
        this.acceptQuestText = acceptQuestText;
        this.declineQuestText = declineQuestText;
        this.reminder = reminder;
        this.criteria = criteria;
        this.type = type;
        this.complete = complete;
        this.afterText = afterText;
        this.prereq = prereq;
        this.dialogue = dialogue;
        this.questId = questId;
        this.followup = followup;
        this.giverId = giverId;
        this.receiverId = receiverId;
        this.items = items;
        this.alreadyCompleted = alreadyCompleted;
        this.decline = decline;
        this.reward = reward;
        this.script = script;
    }
}

var fargothsRing = new Quest("Fargoth's Ring", "Thanks. Be sure to let me know.", "Thanks a lot.", "Have you seen my ring yet?",
[items.armor.engravedRingOfHealing, 1], "Gather", [items.armor.engravedRingOfHealing.name + " has been removed from your inventory.", "You found it! Amazing! Thank you, thank you! You are now my favorite friend. I'll be sure to tell the others, especially my friend Arrille who runs the tradehouse here. Go see him, he'll be happy to see you now!"], 
"Yes, thank you for finding it! Those guards better look out.", -1, [2], 0, -1, 5, 5, -1, {text: "Yes, I found it! Here, take it.", accept: true}, {text: "Uhhh. No, sorry. No ring", accept: false},
{disposition: 50}, {greeting: 'Hello again, %PCNAME. Yes, I can probably help you. Are you looking for services in Seyda Neen?'})

var questList = {
    fargothsRing
}

export default questList