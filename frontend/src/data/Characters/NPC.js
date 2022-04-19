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

var jiub = new NPC([2, 6], "Jiub", "Dark Elf", 
locations.list.imperialPrisonShipDownstairs, [], 
[50, 50, 50, 50, 50], 200, 100, 150, 25, [], 
[0,0,0,0,0], 50, [dialogue.starterDialogue.jiub.jiubOpener1], "@", dialogue.starterDialogue.jiub.jiubOpener0.text, 0);

var guard = new NPC([3, 21], "Guard", "race", locations.list.imperialPrisonShipDownstairs,
"faction", "stats", "health", "energy", "mana", "level", "inventory", "baseStats",
50, [], "@", 'Up the stairs, prisoner!', 1);

var npcs = {
    list: {
        jiub,
        guard
    },

    getNpc(type, info) {
        var npc = '';
        var listOfNpcs = Object.entries(npcs.list);
        switch(type) {
        case 'id':
            for (var i = 0; i < listOfNpcs.length; i++) {
            if (info == listOfNpcs[i][1].id) {
                npc = listOfNpcs[i][1];
            }
            }
        break;
        case 'location':
            for (var i = 0; i < listOfNpcs.length; i++) {
            if (listOfNpcs[i][1].location == info[0]) {
                if ((listOfNpcs[i][1].coords[0] == info[1][0]) && 
                    (listOfNpcs[i][1].coords[1] == info[1][1])) {
                npc = listOfNpcs[i][1]
                }
            }
            }
        break;
        }
        return npc
    },

    getNpcsInLocation(location) {
        var output = [];
        for (var i = 0; i < location.npcs.length; i++) {
            output[i] = this.getNpc('id', location.npcs[i]);
        }
        return output;
    }
}

export default npcs