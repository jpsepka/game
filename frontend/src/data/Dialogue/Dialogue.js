import questList from '../Quest/Quest'

class Dialogue {
    constructor(id, text, option, choices, quest, followup) {
        this.id = id;
        this.text = text;
        this.option = option;
        this.choices = choices;
        this.quest = quest;
        this.followup = followup;
    }
}

var jiubOpener0 = new Dialogue(0, "Well, not even last night's storm could wake you. I heard them say we've reached Morrowind. I'm sure they'll let us go.", "name", [], -1, -1);
var guardOpener0 = new Dialogue(1, "Great. I'm sure you'll fit right in. Now head inside the office and they'll finish your release.", "where", [], -1, -1)
var fargothRing =  new Dialogue(2, "I swear one of the guards has it. I had it last week before their weekly \"Lets's shake down Fargoth\" ritual. An engraved healing ring, family heirloom of mine. You haven't seen it, have you? Will you look for it for me?", 
"ring", [], questList.fargothsRing, -1);

var dialogue = {
    starterDialogue: {
        jiubOpener0,
        guardOpener0
    },
    persuasion: {

    },
    fargothRing
};


export default dialogue;