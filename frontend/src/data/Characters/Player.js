import Person from './Person'
import items from '../Items/index'
import locations from '../Location/Location'
import attributes from '../Attributes/Attributes'
import skills from '../Skills/Skill'

class Player extends Person {
    constructor(coords, name, race, location, faction, stats, health, 
        energy, mana, level, inventory, armor, exp, armorRating, baseStats, target, 
        questsCompleted, icon, showInventory, questLog, classType, attributes, skills) {
        super(coords, name, race, location, faction, stats, health, 
            energy, mana, level, inventory, baseStats);
        this.armor = armor;
        this.exp = exp;
        this.armorRating = armorRating;
        this.baseStats = baseStats;
        this.target = target;
        this.questsCompleted = questsCompleted;
        this.icon = icon;
        this.showInventory = showInventory;
        this.questLog = questLog;
        this.classType = classType;
        this.attributes = attributes;
        this.skills = skills;
    }
}

var player = new Player([2,4], "", "", locations.imperialPrisonShipPrisonerLevel, 
[], [40,40,40,40,40,40,40,40], [], [], [], 1, [], [], [0,100], 0, [], 
0, [], "@", false, [], "", 
{   
    strength: 40, 
    intelligence: 40, 
    willpower: 40,
    agility: 40,
    speed: 40,
    endurance: 40,
    personality: 40,
    luck: 40
},
{
    longBlade: 5,
    bluntWeapon: 5,
    axe: 5,
    armorer: 5,
    mediumArmor: 5,
    heavyArmor: 5,
    spear: 5,
    block: 5,
    athletics: 5,
    alchemy: 5,
    enchant: 5,
    conjuration: 5,
    alteration: 5,
    destruction: 5,
    mysticism: 5,
    restoration: 5,
    illusion: 5,
    unarmored: 5,
    acrobatics: 5,
    security: 5,
    sneak: 5,
    lightArmor: 5,
    marksman: 5,
    shortBlade: 5,
    handToHand: 5,
    mercantile: 5,
    speechcraft: 5
});

player.skills.destruction = 15;
console.log(player.skills);

export {Player}
export {player};