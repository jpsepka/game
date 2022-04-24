import skills from "../Skills/Skill";
import attributes from "../Attributes/Attributes";

class Race {
    constructor(name, color, baseAttributes, baseSkills) {
        this.name = name;
        this.color = color;
        this.baseAttributes = baseAttributes;
        this.baseSkills = baseSkills;
    }
}


var argonian = new Race("Argonian", {color: "rgb(172, 184, 85)"}, 
[-10,10,0,0,-5,-5,0,0], [[10, skills.alchemy], [5, skills.alteration], 
[5, skills.conjuration], [10, skills.destruction], [10, skills.enchant],
[5, skills.illusion]])

var breton = new Race("Breton", {color: "rgb(224, 171, 132"}, 
[-5,10,10,-10,-5,-10,0,0], [[5, skills.alchemy], [5, skills.alteration],
[10, skills.conjuration], [5, skills.illusion], [10, skills.mysticism], 
[10, skills.restoration]])

var darkElf = new Race("Dark Elf", {color: "rgb(128,123,113)"}, 
[0,0,-10,0,10,-5,-5,0], [[5, skills.athletics], [10, skills.destruction],
[5, skills.lightArmor], [5, skills.longBlade], [5, skills.marksman],
[5, skills.mysticism], [10, skills.shortBlade]]);

var highElf = new Race("High Elf", {color: "rgb(233,187,76)"}, 
[-10,10,0,0,-5,-5,0,0], [[10, skills.alchemy], [5, skills.alteration],
[5, skills.conjuration], [10, skills.destruction], [10, skills.enchant],
[5, skills.illusion]])

var imperial = new Race("Imperial", {color: "rgb(172, 129, 100)"}, 
[0,0,-5,-10,-5,0,10,0], [[5, skills.bluntWeapon], [5, skills.handToHand],
[5, skills.lightArmor], [10, skills.longBlade], [10, skills.mercantile],
[5, skills.speechcraft]]);

var khajit = new Race("Khajit", {color: "rgb(247, 248, 228)"}, 
[-5,0,-10,10,0,-5,0,0], [[15, skills.acrobatics], [5, skills.athletics], 
[5, skills.handToHand], [5, skills.lightArmor], [5, skills.security],
[5, skills.shortBlade], [5, skills.sneak]]);

var nord = new Race("Nord", {color: "rgb(230,182,147)"}, 
[10,-10,5,-10,0,5,-10,0], [[10, skills.axe], [10, skills.bluntWeapon], 
[10, skills.mediumArmor], [5, skills.heavyArmor], [5, skills.longBlade],
[5, skills.spear]])

var orc = new Race("Orc", {color: "rgb(172,179,112"},
[5,-5,5,-5,0,10,0,0], [[10, skills.armorer], [10, skills.block], 
[10, skills.heavyArmor], [10, skills.mediumArmor], [5, skills.axe]])

var redguard = new Race("Redguard", {color: "rgb(90,58,44)"},
[5,-10,-10,0,0,10,-5,0], [[15, skills.longBlade], [5, skills.athletics], 
[5, skills.axe], [5, skills.bluntWeapon], [5, skills.heavyArmor],
[5, skills.mediumArmor], [5, skills.shortBlade]])

var woodElf = new Race("Wood Elf", {color: "rgb(175,128,96)"},
[-10,0,0,10,10,-10,0,0], [[15, skills.marksman], [10, skills.sneak],
[10, skills.lightArmor], [5, skills.alchemy]]);

const races = {
    argonian,
    breton,
    darkElf,
    highElf,
    imperial,
    khajit,
    nord,
    orc,
    redguard,
    woodElf
}

export default races;