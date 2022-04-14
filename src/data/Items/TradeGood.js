import Item from "./Item";

class TradeGood extends Item {
    constructor(name, stackable, value, description) {
        super(name, stackable, value);
        this.description = description;
    }
}

var virtuosoInkingSet = new TradeGood("Virtuoso Inking Set", false, 1, 1, "A set of precision quills and fine crystalline bottles to inspire and empower the truly dedicated scribes.");
var copperRod = new TradeGood("Copper Rod", false, 1, 1, "Needed by Enchanters to make runed copper rods.");
var bearAss = new TradeGood("Bear Ass", true, 1, "A bear ass");

var tradeGoods = {
    virtuosoInkingSet,
    copperRod,
    bearAss
}

export default tradeGoods;