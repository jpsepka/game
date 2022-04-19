import Item from "./Item";

class QuestItem extends Item {
    constructor(name, stackable, value, description) {
        super(name, stackable, value);
        this.description = description;
    }
}

var bearFlankShipment = new QuestItem("Shipment of cut bear asses", false, -1, "Ten cuts of bear ass")

var questItems = {
    bearFlankShipment
}

export default questItems;