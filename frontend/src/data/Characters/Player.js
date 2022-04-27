import Person from './Person'
import items from '../Items/index'
import locations from '../Location/Location'
import factions from '../Faction/Faction'

class Player extends Person {
    constructor(coords, name, race, location, faction, stats, health, 
        energy, mana, level, inventory, armor, exp, armorRating, baseStats, target, 
        questsCompleted, icon, showInventory) {
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
    }
}

var player = new Player([15,10], "Name", "Race", locations.imperialPrisonShipAboveDeck, 
[], [1,1,1,1,1], [0,0], [0,0], [0,0], 1, [], [], [0,100], 0, [], 
0, [], "@", false);

export {Player}
export {player};