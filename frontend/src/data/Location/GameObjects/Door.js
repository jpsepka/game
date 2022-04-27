class Door {
    constructor(icon, coords, newZoneId, locked, lockLevel) {
        this.icon = icon;
        this.coords = coords;
        this.newZoneId = newZoneId;
        this.locked = locked;
        this.lockLevel = lockLevel;
    }

    openClosedDoor() {
        this.icon = "1"
        this.locked = false;
        this.lockLevel = -1
    }
}

var shipJiubRoom = new Door("0", [3,7], -1, true, 100);
var censusAndExciseOfficeDoor = new Door("0", [6,26], -1, true, 100);
var shipDownStairsToUp = new Door("=", [2, 22], 1, false, -1)
var shipUpstairsToDown = new Door("=", [2, 22], 0, false, -1);
var shipUpstairsToDeck = new Door("=", [2, 14], 2, false, -1)
var shipDeckToUpstairs = new Door("=", [14,17], 1, false, -1);
var shipToExciseOffice = new Door("=", [6, 15], 3, false, -1);
var exciseOfficeToShip = new Door("=", [10, 33], 2, true, 100);
var exciseOfficeToCourtyard = new Door("=", [1,13], 4, false, -1);
var courtyardToExciseOffice = new Door("=", [7,8], 3, false, -1);
var courtyardToExciseOfficeTwo = new Door("=", [6,23], 5, false, -1);
var exciseOfficeTwoToCourtyard = new Door("=", [4, 1], 4, false, -1);
var exciseOfficeTwoToSeydaNeen = new Door("=", [4, 11], 6, false, -1);
var seydaNeenToExciseOfficeTwo = new Door("=", [22,34], 5, false, -1);


var doors = {
    shipJiubRoom, 
    censusAndExciseOfficeDoor,
    shipDownStairsToUp, 
    shipUpstairsToDown, 
    shipUpstairsToDeck,
    shipDeckToUpstairs,
    shipToExciseOffice,
    exciseOfficeToShip,
    exciseOfficeToCourtyard,
    courtyardToExciseOffice,
    courtyardToExciseOfficeTwo,
    exciseOfficeTwoToCourtyard,
    exciseOfficeTwoToSeydaNeen,
    seydaNeenToExciseOfficeTwo
}


export default doors