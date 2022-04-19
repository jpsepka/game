import EquippableItem from "./EquippableItem";

class Armor extends EquippableItem {
    constructor(name, stackable, value, type, stats, buff, armor) {
        super(name, stackable, value, type, stats, buff);
        this.armor = armor;
    }

    description() {
        var output = this.equippableItemDescription();

        output = output + "\nArmor: " + this.armor;

        return output;
    }
}

var platemailHelm = new Armor("Platemail Helm", false, 5, "Helm", [0], [0], 16);
var patchedLeatherShoulderpads = new Armor("Patched Leather Shoulderpads", false, 7, "Shoulders", [0], [0], 4);
var raggedWolfHideCloak = new Armor("Ragged Wolf Hide Cloak", false, 1, "Back", [0], [0], 1);
var roughCopperVest = new Armor("Rough Copper Vest", false, 1, "Chest", [0], [0], [60, 60], 7);
var runedCopperBracers = new Armor("Runed Copper Bracers", false, 12, "Wrist", [0,4,4,0,0], [0], 5);
var runedCopperGauntlets = new Armor("Runed Copper Gauntlets", false, 12, "Hands", [0,4,4,0,0,], [0], 6);
var runedCopperBelt = new Armor("Runed Copper Belt", false, 12, "Belt", [0,4,4,4,0], [0], 6);
var runedCopperPants = new Armor("Runed Copper Pants", false, 25, "Legs", [0,5,5,6,0], [0], 9);
var roughBronzeBoots = new Armor("Rough Bronze Boots", false, 18, "Feet", [0,3,3,4,0], [0], 7);
var ironforgeBreastplate = new Armor("Ironforge Breastplate", false, 11, "Chest", [0,2,2,3,0], [0], 8)

const armor = {
    platemailHelm, 
    patchedLeatherShoulderpads,
    raggedWolfHideCloak,
    roughCopperVest,
    runedCopperBracers,
    runedCopperGauntlets,
    runedCopperBelt,
    runedCopperPants,
    roughBronzeBoots, 
    ironforgeBreastplate
}

export default armor