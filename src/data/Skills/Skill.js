class Skill {
    constructor(name) {
        this.name = name;
    }
}

var skinning = new Skill("Skinning");
var herbalism = new Skill("Herbalism");
var mining = new Skill("Mining");
var fishing =  new Skill("Fishing");
var diplomacy = new Skill("Diplomacy");

var skills = {
    professions: {
        skinning,
        herbalism,
        mining,
        fishing,
    },
    skills: {
        diplomacy,
    }
}

export default skills