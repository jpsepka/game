import EquippableItem from "./EquippableItem";
import Item from "./Item";

class Armor extends EquippableItem {
    constructor(name, stackable, value, type, stats, buff, armor, icon, weight) {
        super(name, stackable, value, type, stats, buff);
        this.armor = armor;
        this.icon = icon;
        this.weight = weight;
    }

    description() {
        var output = this.equippableItemDescription();

        output = output + "\nArmor: " + this.armor;

        return output;
    }
}

var engravedRingOfHealing = new Armor("Engraved Ring of Healing", false, 30, "Ring",
[], [], 0, "O", 0.1);

const armor = {
    engravedRingOfHealing
}

export default armor