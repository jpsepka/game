class Skill {
    constructor(name, specialization) {
        this.name = name;
        this.specialization = specialization;
    }
}

//Combat
var longBlade = new Skill("Long Blade", "Combat")
var bluntWeapon = new Skill("Blunt Weapon", "Combat")
var axe = new Skill("Axe", "Combat")
var armorer = new Skill("Armorer", "Combat")
var mediumArmor = new Skill("Medium Armor", "Combat")
var heavyArmor = new Skill("Heavy Armor", "Combat")
var spear = new Skill("Spear", "Combat")
var block = new Skill("Block", "Combat")
var athletics = new Skill("Athletics", "Combat")

//Magic
var alchemy = new Skill("Alchemy", "Magic")
var enchant = new Skill("Enchant", "Magic")
var conjuration = new Skill("Conjuration", "Magic")
var alteration = new Skill("Alteration", "Magic")
var destruction = new Skill("Destruction", "Magic")
var mysticism = new Skill("Mysticism", "Magic")
var restoration = new Skill("Restoration", "Magic")
var illusion = new Skill("Illusion", "Magic")
var unarmored = new Skill("Unarmored", "Magic")

//Stealth
var acrobatics = new Skill("Acrobatics", "Stealth")
var security = new Skill("Security", "Stealth")
var sneak = new Skill("Sneak", "Stealth")
var lightArmor = new Skill("Light Armor", "Stealth")
var marksman = new Skill("Marksman", "Stealth")
var shortBlade = new Skill("Short Blade", "Stealth")
var handToHand = new Skill("Hand-to-Hand", "Stealth")
var mercantile = new Skill("Mercantile", "Stealth")
var speechcraft = new Skill("Speechcraft", "Stealth")

var skills = {
    longBlade,
    bluntWeapon,
    axe,
    armorer,
    mediumArmor,
    heavyArmor,
    spear,
    block,
    athletics,
    alchemy,
    enchant,
    conjuration,
    alteration,
    destruction,
    mysticism,
    restoration,
    illusion,
    unarmored,
    acrobatics,
    security,
    sneak,
    lightArmor,
    marksman,
    shortBlade,
    handToHand,
    mercantile,
    speechcraft
}

export default skills