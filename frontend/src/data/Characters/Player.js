import Person from './Person'
import items from '../Items/index'
import locations from '../Location/Location'
import attributes from '../Attributes/Attributes'
import skills from '../Skills/Skill'

class Player extends Person {
    constructor(coords, name, race, location, faction, stats, health, 
        energy, mana, level, inventory, armor, exp, armorRating, baseStats, target, 
        questsCompleted, icon, showInventory, questLog, classType, attributes, majorSkills,
        minorSkills, miscSkills) {
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
        this.majorSkills = majorSkills;
        this.minorSkills = minorSkills;
        this.miscSkills = miscSkills;
    }
}

var player = new Player([2,4], "", "", locations.imperialPrisonShipDownstairs, 
[], [40,40,40,40,40,40,40,40], [], [], [], 1, [], [], [0,100], 0, [], 
0, [], "@", false, [], "", [[attributes.strength, 40], [attributes.intelligence, 40], 
[attributes.willpower, 40], [attributes.agility, 40], [attributes.speed, 40], 
[attributes.endurance, 40], [attributes.personality, 40], [attributes.luck, 40]], 
[], [], []);

export {Player}
export {player};