class Item {
    constructor(name, stackable, value) {
        this.name = name;
        this.stackable = stackable;
        this.value = value;
    }

    itemDescription() {
        return "Name: " + this.name +
               "\nValue: " + this.value + " gold";
    }
}

export default Item