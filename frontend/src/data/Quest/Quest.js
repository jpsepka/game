import items from "../Items";

class Quest {
    constructor(name, acceptQuestText, declineQuestText, reminder, criteria, type, 
        complete, afterText, prereq, dialogue, questId, followup, giverId, receiverId,
        items, alreadyCompleted, choices) {
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
        this.choices = choices;
    }
}

/*
var bearAssQuest = new Quest("Bear Ass Quest", "Oh thank you!", 
"Let me know if you change your mind!", "Do you have those bear asses yet?", 
[items.tradeGoods.bearAss, 10], "Gather", "Oh lovely! I'll put these to good use!",
"Thanks again for those bear asses!", -1, 2, 0, 1, 0, 0, -1);

var bearAssDeliveryQuest = new Quest("Delivery to the Innkeeper", "Thanks!", 
"Well alright then!", "Did you give him those flanks yet?", 
[items.questItems.bearFlankShipment, 1], "Gather", "Oh, wonderful! I've never had bear before!", 
"Thanks for delivering those flanks!", [0], 3, 1, -1, 0, 2, items.questItems.bearFlankShipment);
*/

var fargothsRing = new Quest("Fargoth's Ring", "Thanks. Be sure to let me know.", "Thanks a lot.", "Have you seen my ring yet?",
[items.armor.engravedRingOfHealing, 1], "Gather", [items.armor.engravedRingOfHealing.name + " has been removed from your inventory.", "You found it! Amazing! Thank you, thank you! You are now my favorite friend. I'll be sure to tell the others, especially my friend Arrille who runs the tradehouse here. Go see him, he'll be happy to see you now!"], 
"Yes, thank you for finding it! Those guards better look out.", -1, [2], 0, -1, 5, 5, -1, ["Yes, I found it! Here, take it."], ["Uhhh. No, sorry. No ring"])

var questList = {
    fargothsRing
}

export default questList