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

var jiubOpener0 = new Dialogue(0, "Wake up. Wake up! Stand up, there you go. You were dreaming. What's your name?", "", [], -1, -1)
var jiubOpener1 = new Dialogue(1, "Well, not even last night's storm could wake you. I heard them say we've reached Morrowind. I'm sure they'll let us go.", "name", [], -1, -1);
var guardOpener0 = new Dialogue(2, "Up the stairs, prisoner!", "", [], -1, -1);
var guardOpener1 = new Dialogue(3, "This is where they want you. Head down to the dock and he'll show you to the Census Office.", "", [], -1, -1);
var guardOpener2 = new Dialogue(4, "You've finally arrived, but our records don't show from where.", "", [], -1, -1);


var dialogue = {
    starterDialogue: {
            jiubOpener0,
            jiubOpener1,
            guardOpener0,
            guardOpener1,
            guardOpener2
    },
};


export default dialogue;