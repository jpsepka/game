import Person from './Person'
import items from '../Items/index'
import locations from '../Location/Location'
import factions from '../Faction/Faction'
import races from '../Race/Race'

class Player extends Person {
    constructor(coords, name, race, location, faction, stats, health, 
        energy, mana, level, inventory, armor, exp, armorRating, baseStats, target, 
        questsCompleted, icon, showInventory, questLog) {
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
    }
}

var player = new Player([2,4], "", "", locations.imperialPrisonShipDownstairs, 
[], [1,1,1,1,1], [0,0], [0,0], [0,0], 1, [], [], [0,100], 0, [], 
0, [], "@", true, []);

export {Player}
export {player};