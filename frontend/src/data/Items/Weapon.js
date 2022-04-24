/*

class Weapon extends EquippableItem {
    constructor(name, stackable, value, type, stats, buff, dmg) {
        super(name, stackable, value, type, stats, buff);
        this.dmg = dmg
    }
    
    description() {
        var output = this.equippableItemDescription();
        
        output = output + "\nDamage: ";
        if (this.dmg.length == 1) {
            output = output + this.dmg[0] + "\n";
        } else {
            output = output + this.dmg[0] + " - " + this.dmg[1] + "\n";
        }

        return output;
    }
 }

var skinningKnife = new Weapon("Skinning Knife", false, 1, "Tool", [0], [10, skills.professions.skinning], [1]);
var herbalistsSpade = new Weapon("Herbalist's Spade", false, 1, "Tool", [0], [10, skills.professions.herbalism], [1]);
var miningPick = new Weapon("Mining Pick", false, 1, "Tool", [0], [10, skills.professions.mining], [1]);
var blacksmithHammer = new Weapon("Blacksmith's Hammer", false, 1, "Tool", [0], [0], [1]);
var fishingPole = new Weapon("Fishing Pole", false, 1, "Tool", [0], [10, skills.professions.fishing], [1]);
var copperBattleAxe = new Weapon("Copper Battle Axe", false, 10, "2H Axe", [4, 0, 0, 7, 0], [0], [6, 14]);
var heavyCopperMaul = new Weapon("Heavy Copper Maul", false, 10, "2H Mace", [4, 0, 0, 4, 0], [0], [8, 11]);

var weapons = {
    tools: {
        skinningKnife,
        herbalistsSpade,
        miningPick,
        blacksmithHammer,
        fishingPole
    },
    copperBattleAxe,
    heavyCopperMaul
}


export default weapons;
*/