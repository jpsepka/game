class Faction {
    constructor(name, max) {
        this.name = name;
        this.max = max;
    }
}

var ironforge = new Faction("Ironforge", 100);
var cultOfTheDamned = new Faction("Cult of the Damned", 100);

const factions = {
    factions: {
        ironforge,
        cultOfTheDamned
    }
}

export default factions.factions