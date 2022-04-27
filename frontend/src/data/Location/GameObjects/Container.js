import items from "../../Items";

class Container {
    constructor(name, icon, coords, locked, lockLevel, inventory) {
        this.name = name;
        this.icon = icon;
        this.coords = coords;
        this.locked = locked;
        this.lockLevel = lockLevel
        this.inventory = inventory
    }
}

var exciseOfficeCourtyardChest = new Container("Chest", "$", [5,22], false, -1, [[items.armor.engravedRingOfHealing, 1]])

export var containers = {
    exciseOfficeCourtyardChest
}