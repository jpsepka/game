import Person from './Person'
import races from '../Race/Race'
import locations from '../Location/Location'
import factions from '../Faction/Faction'
import dialogue from '../Dialogue/Dialogue'

class NPC extends Person {
    constructor(coords, name, race, location, faction, stats, health, 
        energy, mana, level, inventory, baseStats, opinion, 
        dialogue, icon, greeting, id) {
        super(coords, name, race, location, faction, stats, health, 
            energy, mana, level, inventory, baseStats);
        this.opinion = opinion;
        this.dialogue = dialogue;
        this.icon = icon;
        this.greeting = greeting;
        this.id = id;
    }

    sortDialogue() {
        this.dialogue.sort((a, b) => (a.option.toUpperCase() > b.option.toUpperCase()) ? 1 : -1)
    }
}

var jiub = new NPC([2, 6], "Jiub", "Dark Elf", locations[0], [], 
[50, 50, 50, 50, 50], 200, 100, 150, 25, [], 
[0,0,0,0,0], 50, [dialogue.starterDialogue.jiubOpener1], "@", dialogue.starterDialogue.jiubOpener0.text, 0);

var guard = new NPC([3, 21], "Guard", "race", locations[0],
"faction", "stats", "health", "energy", "mana", "level", "inventory", "baseStats",
50, [], "@", 'Up the stairs, prisoner!', 1);

var socuciusErgalla = new NPC([5,33], "Socucius Ergalla", "Breton", locations[3], 
"Faction", [0,0,0,0,0], [102,102], [100,100], [128,128], 14, [], [], 
40, [], "@", "Ahh yes, we've been expecting you. You'll have to be recorded before you're officially released. There are a few ways we can do this.", 2);

var npcs = {
    list: {
        jiub,
        guard,
        socuciusErgalla
    },

    getNpcsInLocation(location) {
        var output = [];
        for (var i = 0; i < location.npcs.length; i++) {
            output[i] = this.getNpc('id', location.npcs[i]);
        }
        return output;
    }
}

export {NPC}
export default npcs