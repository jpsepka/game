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

var jiubOpener0 = new Dialogue(0, "Well, not even last night's storm could wake you. I heard them say we've reached Morrowind. I'm sure they'll let us go.", 
{text: "name", title: true}, [], false, false);
var guardOpener0 = new Dialogue(1, "Great. I'm sure you'll fit right in. Now head inside the office and they'll finish your release.", 
{text: "where", title: true}, [], false, false)
var socuciusErgalla0 = new Dialogue(100, "Very good. Here are your papers, take them to the Captain Gravius before you leave.", 
{text: "class", title: true}, [], false, false);
var fargothRing =  new Dialogue(2, "I swear one of the guards has it. I had it last week before their weekly \"Let's shake down Fargoth\" ritual. An engraved healing ring, family heirloom of mine. You haven't seen it, have you?", 
{text: "ring", title: true}, [], questList.fargothsRing, false);
var services = new Dialogue(8, "Get food and sundries from Arrille's Tradehouse. That's also where you'll find anyone who offers training. Not much else in the way of services in this dank little squat.", 
{text:"Services", title:true}, [], false, false)
var specificPlace = new Dialogue(9, "Not much here. Arrille's Tradehouse, the Census and Excise offices -- that's the Coast Guard, too -- and a lighthouse. And that's it. Silt strider service goes to Vivec, Balmora, Gnisis, and Suran. The road goes north past Pelagiad to Balmora, and east to Vivec, and southeast to Ebonheart.", 
{text:"specific place", title:true}, [], false, false);
var someone = new Dialogue(10, "The Altmer Arrille runs Arrille's Tradehouse. Socucius Ergalla is the chief agent at the Census and Excise offices.", 
{text:"someone in particular", title:true}, [], false, false);
var background = new Dialogue(3, `I am %NAME, Commoner.`, 
{text: "Background", title: true}, [], false, false);
var rumors = ["A rumor says the Emperor has repealed the War Tax. We've heard nothing official here, but it's about damn time. We haven't had a war in ten years.", "I've been told that the Empire has granted a new charter to do some mining on the island of Solstheim. Why anyone would want to go there is beyond me.", "I heard there has been some trouble up at Fort Frostmoth. Never heard of it? It's on an island called Solstheim north of Vvardenfell."]
var latestRumors = new Dialogue(4, rumors[Math.floor(Math.random() * rumors.length)], {text: "latest rumors", title: true},
[], false, false);
var advice = ["It pays to take it slow when you first come to Morrowind. When you talk to folks, keep an eye on their dispositions. They let you know if they don't like you, and it's smart to get on their good side before you ask for a favor.", "If you do the crime, pay the fine, don't do the time. You might think a little hard labor isn't a bad price to pay, but while you're breaking rocks for the Empire, you lose the edge in your useful skills, and it takes a long time to get back to where you were before.", "New here? Take the silt strider to Vivec or Balmora. Fast and cheap. No trouble with wild animals. And smugglers. And bandits. And outlaws.", "New in Morrowind, eh? Well, the natives are not very friendly. They still resent the Empire, and they look down on the other races. They don't like outlander Dunmer very much either. If you aren't a Dark Elf and native-born, you're an outlander, just like the rest of us.", "If you want to improve a skill you're terrible at, it's worth paying for a little training, just to get started. Sure, you can teach yourself, but it can be slow and frustrating."]
var littleAdvice = new Dialogue(5, advice[Math.floor(Math.random() * advice.length)], 
{text: "Advice", title:true}, [], false, false);
var secret = ["If someone attacks you first, you have the right to defend yourself. If someone DOESN'T attack you first, you're going to break the law if you attack them.", "If you're thinking of traveling up country, near Sheogorad, or out Molag Amur way, or inside the Ghostfence, you need to know about corprus. It's a disease that turns normal creatures into beasts. Turns men into twisted, mad lumps of flesh, superhumanly strong, and full of hatred. You get corprus from fighting with diseased creatures. It's hard to get corprus, but harder to get rid of it. In fact, I hear there is no cure.", "Daedra? You know what they are, right? Well, Daedric shrines are where Daedra cults worship Daedra. Bad people who summon bad Daedra. Stay away from them. Why? Because Daedra are nasty. And the folks that worship them are even nastier.", "Talk to everyone. Talk is cheap. Ask questions. You don't ask questions, you never learn."]
var littleSecret = new Dialogue(6, secret[Math.floor(Math.random() * secret.length)], 
{text: "little secret", title:true}, [], false, false);
var myTrade = new Dialogue(7, "I'm a %TRADE.", {text:"my trade", title: true}, [], -1, -1);

var dialogue = {
    starterDialogue: {
        jiubOpener0,
        guardOpener0
    },
    default: {
        services,
        specificPlace,
        someone,
        latestRumors,
        littleAdvice,
        littleSecret,
        background
    },
    raw: {
        rumors,
        advice,
        secret
    },
    fargothRing,
    myTrade,
    socuciusErgalla0
};


export default dialogue;