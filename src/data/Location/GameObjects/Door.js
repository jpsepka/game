class Door {
    constructor(icon, coords, zone, locked, lockLevel) {
        this.icon = icon;
        this.coords = coords;
        this.zone = zone;
        this.locked = locked;
        this.lockLevel = lockLevel;
    }
}

var shipJiubRoom = new Door("0", [3,7], -1, true, 100);
var shipDownStairsToUp = new Door("=", [2, 22], 1, false, -1)
var shipUpstairsToDown = new Door("=", [2, 22], 0, false, -1);
var shipUpstairsToDeck = new Door("=", [2, 24], 2, false, -1)
var shipDeckToUpstairs = new Door("=", [14,14], 1, false, -1);
var shipToExciseOffice = new Door("=", [6, 12], 3, false, -1);

var doors = {
    list: {
        shipJiubRoom, 
        shipDownStairsToUp, 
        shipUpstairsToDown, 
        shipUpstairsToDeck,
        shipDeckToUpstairs,
        shipToExciseOffice
    }
}


export default doors