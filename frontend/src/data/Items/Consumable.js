class Consumable extends Item {
    constructor(name, stackable, value, effect) {
        super(name, stackable, value);
        this.effect = effect;
    }
}

var nightcrawlers =  new Consumable("Nightcrawlers", true, 1, [10, fishing]);