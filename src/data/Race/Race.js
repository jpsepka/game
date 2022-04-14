class Race {
    constructor(name, baseStats) {
        this.name = name;
        this.baseStats = baseStats;
    }
}

var dwarf = new Race("Dwarf", [2,1,1,1,1]);

const races = {
    races: {
        dwarf
    }
}

export default races.races;