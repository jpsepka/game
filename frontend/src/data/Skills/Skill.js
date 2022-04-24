class Skill {
    constructor(name) {
        this.name = name;
    }
}

//Combat
var longBlade = new Skill("Long Blade")
var bluntWeapon = new Skill("Blunt Weapon")
var axe = new Skill("Axe")
var armorer = new Skill("Armorer")
var mediumArmor = new Skill("Medium Armor")
var heavyArmor = new Skill("Heavy Armor")
var spear = new Skill("Spear")
var block = new Skill("Block")
var athletics = new Skill("Athletics")

//Magic
var alchemy = new Skill("Alchemy")
var enchant = new Skill("Enchant")
var conjuration = new Skill("Conjuration")
var alteration = new Skill("Alteration")
var destruction = new Skill("Destruction")
var mysticism = new Skill("Mysticism")
var restoration = new Skill("Restoration")
var illusion = new Skill("Illusion")
var unarmored = new Skill("Unarmored")

//Stealth
var acrobatics = new Skill("Acrobatics")
var security = new Skill("Security")
var sneak = new Skill("Sneak")
var lightArmor = new Skill("Light Armor")
var marksman = new Skill("Marksman")
var shortBlade = new Skill("Short Blade")
var handToHand = new Skill("Hand-to-Hand")
var mercantile = new Skill("Mercantile")
var speechcraft = new Skill("Speechcraft")

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