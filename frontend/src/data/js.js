var dracDialogue = ["Hello, you're a new face, aren't you? What can I tell you about /Thelsamar/?"];


//strength, agility, intellect, stamina, spirit

var hearthstone = new Item("Hearthstone", false, 0);




function applyConsumable(consumable, item) {
    if (item.buff[0] == 0) {
        item.buff[0] = consumable.effect[0];
        item.buff.push(consumable.effect[1]);
    } else {
        item.buff = item.buff.concat(consumable.effect);
    }
    console.log(item.description());
}

function displayItem(item) {
    console.log(item.description());
}

function showTextOptions(option) {
    console.log(option);
    const element = document.createElement('p');
    element.innerHTML = getNewText(option);
    document.getElementById("npcTextBox").appendChild(element);
}

function getNewText(option) {
    var output;
    switch(option) {
        case 'dracFood':
            output = "Aye, food! I love it!";
            break;
        case "Thelsamar":
            output = "Aye, that's the town you're in!";
            console.log("cunt");
            break;
        default:
            output = "Huh?";
            break;
    }
    return output;
}

function displayCharacter() {
    console.log(dwali.itemsEquipped());
}

function equipItem(item) {
    dwali.equipItem(item);
}

function displayCharSheet(char) {
    console.log(char.characterSheet());
}

function unequipItem(item) {
    dwali.unequipItem(item);
}

function target(npc) {
}