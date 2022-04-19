import Item from './Item'

class EquippableItem extends Item {
    constructor(name, stackable, value, type, stats, buff) {
        super(name, stackable, value);
        this.type = type;
        this.stats = stats;
        this.buff = buff;
    }

    equippableItemDescription() {
        var output = this.itemDescription()

        if(this.stats.length != 1) {
            var statName = ["Strength", "Agility", "Intellect", "Stamina", "Spirit"];
            output = output + "\nStats: ";
            var statOutput = [];

            for (var i = 0; i < this.stats.length; i++) {
                if (this.stats[i] != 0) {
                    statOutput[i] = this.stats[i];
                    statOutput[i+1] = statName[i];
                }
            }

            const filtered = statOutput.filter((el) => {
                return el !== null && typeof el !== 'undefined';
              });

            for (var i = 0; i < filtered.length; i++) {
                if (typeof filtered[i] == "number") {
                    output = output + "+" + filtered[i] + " ";
                } else {
                    output = output + filtered[i];
                    if (i != (filtered.length-1)) {
                        output = output + ", ";
                    }
                }
            }
        }

        if(this.buff.length != 1) {
            output = output + "\nBuffs: "
            if (this.buff.length == 2) {
                output = output + "+" + this.buff[0] + " " + this.buff[1].name;            
            } else {
                for (var i = 0; i < this.buff.length; i++) {
                    var type = typeof this.buff[i];
                    if (type == "object") {
                        output = output + this.buff[i].name;
                        if (i != (this.buff.length-1)) {
                            output = output + ", ";
                        }
                    } else if (type == "number") {
                        output = output + "+" + this.buff[i] + " ";
                    }
                }
            }
        }

        return output;
    }
}

export default EquippableItem