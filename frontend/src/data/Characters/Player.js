import Person from './Person'
import items from '../Items/index'
import races from '../Race/Race'
import locations from '../Location/Location'
import factions from '../Faction/Faction'

class Player extends Person {
    constructor(coords, name, race, location, faction, stats, health, 
        energy, mana, level, inventory, armor, exp, armorRating, baseStats, target, 
        questsCompleted, icon) {
        super(coords, name, race, location, faction, stats, health, 
            energy, mana, level, inventory, baseStats);
        this.armor = armor;
        this.exp = exp;
        this.armorRating = armorRating;
        this.baseStats = baseStats;
        this.target = target;
        this.questsCompleted = questsCompleted;
        this.icon = icon;
    }

    status() {
        return "This is " + this.name + ", a " + this.race.name + " " + this.profession.name + ".";
    }

    calcTotalArmor() {
        var totalArmor = 0;
        for (var i = 0; i < this.armor.length; i++) {
            if (this.armor[i].armor != undefined) {
                totalArmor = totalArmor + this.armor[i].armor
            }
        }
        return totalArmor;
    }

    calcTotalStats() {
        var totalStats = [];
        for (var i = 0; i < this.stats.length; i ++) {
            totalStats[i] = this.baseStats[i];
        }
        for (var i = 0; i < this.armor.length; i++) {
            for(var j = 0; j < this.armor[i].stats.length; j++) {
                totalStats[j] = totalStats[j] + this.armor[i].stats[j];
            }
        }
        return totalStats;
    }

    itemsEquipped() {
        var itemSlots = ["Helm", "Neck", "Shoulders", "Back", "Chest", "Wrist", "Hands", "Belt", "Legs", "Feet", "Ring", "Ring Two", "Trinket", "Trinket Two", "Main Hand", "Off Hand"];
        var output = "Equipped armor and weapons: "
        for (var i = 0; i < itemSlots.length; i++) {
            output = output + "\n\t" + itemSlots[i] + ": ";
            for (var j = 0; j < this.armor.length; j++) {
                if (itemSlots[i] == this.armor[j].type) {
                    output = output + this.armor[j].name;
                }
            }
        }
        return output;
    }

    characterSheet() {
        this.updateCharacter();
        var statName = ["Strength", "Agility", "Intellect", "Stamina", "Spirit"];
        var output = "Name: " + this.name
                   + "\nRace: " + this.race.name
                   + "\nLocation: " + this.location.name
                   + "\nFaction: ";
                   
        for (var i = 0; i < this.faction.length; i++) {
            output = output + "\n\t" + this.faction[i].name + ": " + this.factionLevels[i] + "/" + this.faction[i].max;
        }
                
        output = output + "\nstats: ";

        for (var i = 0; i < this.stats.length; i++) {
            output = output + "\n\t" + statName[i] + ": " + this.stats[i];
        }
        
        output = output + "\nHealth: " + this.health[0] + "/" + this.health[1]
                        + "\nEnergy: " + this.energy[0] + "/" + this.energy[1]
                        + "\nMana: " + this.mana[0] + "/" + this.mana[1]
                        + "\nLevel: " + this.level
                        + "\nArmor: " + this.armorRating
                        + "\nXP: " + this.exp[0] + "/" + this.exp[1];
        output = output + "\n" + this.itemsEquipped();
        return output;
    }
//strength, agility, intellect, stamina, spirit
    updateCharacter() {
        var totalStats = this.calcTotalStats();
        var totalArmor = this.calcTotalArmor();

        this.stats = totalStats;
        this.armorRating = totalArmor;

        this.health[1] = 10;
        this.energy[1] = 10;
        this.mana[1] = 10;

        this.health[1] = this.health[1] + totalStats[0] * 5 + totalStats[3] * 10;
        this.energy[1] = this.energy[1] + totalStats[3] * 10
        this.mana[1] = this.mana[1] + totalStats[2] * 15;
    }

    equipItem(newGear) {
        var gearCheck = this.armor.length;
        for (var i=0; i < this.armor.length; i++) {
            if (newGear.type == this.armor[i].type) {
                console.log("Unequipped " + this.armor[i].name);
                this.armor.splice(i, 1);
                this.armor.push(newGear);
                gearCheck--;
                console.log("Equipped " + newGear.name);
                i = this.armor.length * 10
            }
        }
        if (gearCheck == this.armor.length) {
            console.log("Equipped " + newGear.name)
            this.armor.push(newGear);
        }
        this.updateCharacter();
    }

    unequipItem(item) {
        this.armor.splice(this.armor.indexOf(item), 1);
    }

    setTarget(npc) {
        this.target = npc;
        document.getElementById("npcName").innerHTML = npc.name;
        document.getElementById("npcTextBox").innerHTML = npc.dialogue[0];
    }

    promptName() {
        this.name = "player"
        while (this.name == "player") {
            this.name = prompt("What's your name?")
        }
    }
}

//var player = new Player([2, 4], "player", "Dark Elf", 0, [0], [1, 1, 1, 1, 1], 
//[10, 10], [10, 10], [10, 10], 1, [["hearthstone", 1], ["butt", 2]], [], [0, 100], 
//0, [0], 0, [1,1], [], "@", []);

var player = new Player([2,4], "Name", "Race", locations.list.imperialPrisonShipDownstairs, 
[], [1,1,1,1,1], [0,0], [0,0], [0,0], 1, [], [], [0,100], 0, [], 
0, [], "@");

player.inventory=[[items.hearthstone, 1], [items.tradeGoods.bearAss, 10]]

export {Player}
export {player};