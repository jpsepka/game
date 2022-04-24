class Attribute {
    constructor(name) {
        this.name = name;
    }
}

var agility = new Attribute("Agility")
var endurance = new Attribute("Endurance")
var intelligence = new Attribute("Intelligence")
var luck = new Attribute("Luck")
var personality = new Attribute("Personality")
var speed = new Attribute("speed")
var strength = new Attribute("Strength")
var willpower = new Attribute("Willpower")

var attributes = [
    agility,
    endurance,
    intelligence,
    luck,
    personality,
    speed,
    strength,
    willpower
]

export default attributes