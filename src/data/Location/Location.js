import doors from "./GameObjects/Door";

class Location {
    constructor(id, name, indoors, door, map, npcs) {
        this.id = id;
        this.name = name;
        this.indoors = indoors;
        this.door = door;
        this.map = map;
        this.npcs = npcs;
    }

    setMap() {
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = Array.from(this.map[i]);
        }

        for (var i = 0; i < this.door.length; i++) {
            this.map[this.door[i].coords[0]][this.door[i].coords[1]] = this.door[i].icon
        }
        console.log(this.map);
    }
}


var imperialPrisonShipDownstairsMap = [" /--------------------\\",
                                       "//.....|..............\\\\",
                                       "|......|...............|",
                                       "\\\\....................//",
                                       " \\--------------------/"];

var imperialPrisonShipMap = [" /--------------------\\",
                             "//.....|..............\\\\",
                             "|......................|",
                             "\\\\.....|..............//",
                             " \\--------------------/"];

var imperialPrisonShipAboveDeckMap = ["+------------------------+",
                                    "|  (     /______\\        |",
                                    "|   )   /   _    \\       |",
                                    "|  ||___|  |_|   |       |",
                                    "| /__8__|   _    |       |",
                                    "| | 888 |  /*\\   |       |",
                                    "| |__|__|__|=|___|       |",
                                    "|________         | ____/|",
                                    "|        \\    __|_/      |",
                                    "| ~       |..|   ~       |",
                                    "|    ~    |..|       ~   |",
                                    "| ~    ~  |..|   ~       |",
                                    "| /-------|..|---------\\ |",
                                    "|//                    \\\\|",
                                    "||            =         ||",
                                    "|\\\\                    //|",
                                    "| \\--------------------/ |",
                                    "|  ~                 ~   |",
                                    "+------------------------+"];

var censusAndExciseOfficeMap = ["  ___       |=|______                    ",
                                " |   |      |        |                   ",
                                "|    |      |        |                   ",
                                "|__  |      |        |                   ",
                                "   |0|______|    ____|__________________ ",
                                "   |                      0      @|  |  |",
                                "   |______________________|       |__|  |",
                                "                          |@            |",
                                "                          |+            |",
                                "                          |_____|=|_____|"];


var imperialPrisonShipDownstairs = new Location(0, "Imperial Prison Ship - Prisoner Level", 
true, [doors.list.shipJiubRoom, doors.list.shipDownStairsToUp], imperialPrisonShipDownstairsMap, [0, 1])

var imperialPrisonShip = new Location(1, "Imperial Prison Ship - Below Deck", 
true, [doors.list.shipUpstairsToDown, doors.list.shipUpstairsToDeck], imperialPrisonShipMap, [])

var imperialPrisonShipAboveDeck = new Location(2, "Imperial Prison Ship - Above Deck", 
false, [doors.list.shipDeckToUpstairs, doors.list.shipToExciseOffice], imperialPrisonShipAboveDeckMap, []);

var censusAndExciseOffice = new Location(3, "Census and Excise Office", 
true, [doors.list.exciseOfficeToShip], censusAndExciseOfficeMap, []);

imperialPrisonShipDownstairs.setMap();
imperialPrisonShip.setMap();
imperialPrisonShipAboveDeck.setMap();
censusAndExciseOffice.setMap();

var locations = {
    list: {
        imperialPrisonShipDownstairs,
        imperialPrisonShip,
        imperialPrisonShipAboveDeck,
        censusAndExciseOffice
    },

    getZone(oldZone, coords) {
        var door;
        var locationsArray = Object.entries(locations.list);
        var newZone = false;

        for (var i = 0; i < oldZone.door.length; i++) {
            if ((oldZone.door[i].coords[0] == coords[0]) &&
                 oldZone.door[i].coords[1] == coords[1]) {
                door = oldZone.door[i];
            }
        }

        if (!oldZone.door.locked) {
            for (var j = 0; j < locationsArray.length; j++) {
                if (door.newZoneId == locationsArray[j][1].id) {
                        newZone = locationsArray[j][1]
                }
            }
        }

        return newZone;
    }
}

export default locations