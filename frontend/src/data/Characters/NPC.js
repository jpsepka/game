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

var jiub = new NPC([2, 6], "Jiub", races.darkElf, locations.imperialPrisonShipDownstairs, [], 
[50, 50, 50, 50, 50], 200, 100, 150, 25, [], 
[0,0,0,0,0], 50, [dialogue.starterDialogue.jiubOpener0], "@", "Wake up. Wake up! Stand up, there you go. You were dreaming. What's your name?", 0);

var guard = new NPC([3, 21], "Guard", races.imperial, locations.imperialPrisonShipDownstairs,
"faction", "stats", "health", "energy", "mana", "level", "inventory", "baseStats",
50, [], "@", 'Up the stairs, prisoner!', 1);

var socuciusErgalla = new NPC([6,33], "Socucius Ergalla", races.imperial, locations.censusAndExciseOffice, 
"Faction", [0,0,0,0,0], [102,102], [100,100], [128,128], 14, [], [], 
40, [], "@", "Ahh yes, we've been expecting you. You'll have to be recorded before you're officially released. There are a few ways we can do this.", 2);

var guardTwo =  new NPC([10, 15], "Guard", races.redguard, locations.imperialPrisonShipAboveDeck,
"faction", "stats", "health", "energy", "mana", 50, "inventory", "sttatsvase",
50, [dialogue.starterDialogue.guardOpener0], "@", "You've finally arrived, but our records don't show from where.", 3)

var sellusGravius = new NPC([2, 3])

var fargoth = new NPC([25, 41], "Fargoth", races.woodElf, locations.seydaNeen,
"faction", [], [41, 41], [], [82,82], 2, [], [], 50, [dialogue.fargothRing], "@",
"Are you the one that boat dropped off? Odd to see a boat at that time of day. Hope the Imperials treated you okay. I swear they took my ring.", 5)

var npcs = {
    list: {
        jiub,
        guard,
        socuciusErgalla,
        guardTwo,
        fargoth
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

/*
function generateGuard(coords, location) {
    var npcs = Object.values(gameData.npcs.list);
    var guard = new NPC([coords[0], coords[1]], "Guard", gameData.races.imperial, 
    location, "faction", "stats", "health", "energy", "mana", 50, "inventory", 
    "baseStats", 50, [], "@", "Greetings, citizen.")
    var id = 0;
    for (var i = 0; i < npcs.length; i++) {
        if (npcs[i].id == id) {
            i=0;
            id++;
        }
    }
    guard.id = id;
    return guard;
}
*/