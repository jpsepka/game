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
    }
}


var imperialPrisonShipDownstairsMap = [" /--------------------\\",
                                       "//.....|..............\\\\",
                                       "|......|..............=|",
                                       "\\\\.....1..............//",
                                       " \\--------------------/"];

var imperialPrisonShipMap = [" /--------------------\\",
                             "//.....|..............\\\\",
                             "|......|......=.......=|",
                             "\\\\.....1..............//",
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

var censusAndExciseOfficeMap = ["  __        |==|_____                    ",
                                "_|  |       |        |                   ",
                                "|    |      |        |                   ",
                                "|__  |      |        |                   ",
                                "   |0|______|    ____|__________________ ",
                                "   |                      0      @|  |  |",
                                "   |______________________|       |__|  |",
                                "                          |@            |",
                                "                          |+            |",
                                "                          |_____|=|_____|"];


var imperialPrisonShipDownstairs = new Location(0, "Imperial Prison Ship - Downstairs", 
true, [[1, [2, 22]]], imperialPrisonShipDownstairsMap, [0, 1])

var imperialPrisonShip = new Location(1, "Imperial Prison Ship", 
true, [[0, [2, 22]], [2, [2, 14]]], imperialPrisonShipMap, [])

var imperialPrisonShipAboveDeck = new Location(2, "Imperial Prison Ship - Above Deck", 
false, [[1, [14,14]]], imperialPrisonShipAboveDeckMap, []);

var censusAndExciseOffice = new Location(3, "Census and Excise Office", true, [], censusAndExciseOfficeMap, []);

imperialPrisonShipDownstairs.setMap();
imperialPrisonShip.setMap();
imperialPrisonShipAboveDeck.setMap();

var locations = {
    list: {
        imperialPrisonShipDownstairs,
        imperialPrisonShip,
        imperialPrisonShipAboveDeck
    },

    getZone(oldZone, coords) {
        var newZone = '';
        var newZoneId = -1;
        var locationsArray = Object.entries(locations.list);
        
        for (var i = 0; i < oldZone.door.length; i++) {
            /*
            console.log(oldZone);
            console.log(oldZone.door[i][1][0])
            console.log(oldZone.door[i][1][1])
            console.log(coords[0])
            console.log(coords[1])
            */
            if ((oldZone.door[i][1][0] == coords[0]) &&
                (oldZone.door[i][1][1] == coords[1])) {
                newZoneId = oldZone.door[i][0];
            }
        }

        for (var j = 0; j < locationsArray.length; j++) {
            if (newZoneId == locationsArray[j][1].id) {
                    newZone = locationsArray[j][1]
            }
        }
        return newZone
    }
}


export default locations