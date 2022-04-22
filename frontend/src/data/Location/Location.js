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

    initializeMap() {
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = Array.from(this.map[i]);
        }

        for (var i = 0; i < this.door.length; i++) {
            this.map[this.door[i].coords[0]][this.door[i].coords[1]] = this.door[i].icon
        }
    }

    setMap(updatedMap) {
        console.log("hi");
        this.map = updatedMap
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

var imperialPrisonShipAboveDeckMap =   ["              ______          ",
                                        "       (     /______\\         ",
                                        "       )   /   _    \\        ",
                                        "      ||___|  |_|   |        ",
                                        "     /__8__|   _    |        ",
                                        "     | 888 |  /*\\   |        ",
                                        "     |__|__|__|=|___|       / ",
                                        "\\___|                | ____/ ",
                                        "    \\|_______    ___|_/       ",
                                        "     ~       |..|   ~      ~  ",
                                        "        ~    |..|       ~    ",
                                        "     ~    ~  |..|   ~        ",
                                        "~    /-------|..|---------\\  ~",
                                        "    //                    \\\\   ~",
                                        " ~  |            =         |   ~",
                                        "    \\\\                    // ",
                                        " ~   \\--------------------/       ~",
                                        "    ~                 ~       ~",
                                        "         ~         ~       "];

var censusAndExciseOfficeMap = ["   __       |=|______                    ",
                                " _|  |      |        |                   ",
                                "|    |      |        |                   ",
                                "|__  |      |        |                   ",
                                "  |-0|______|    ____|__________________ ",
                                "  |                       0      @|  |  |",
                                "  |                       |       |__|  |",
                                "  |-----------------------|@            |",
                                "                          |+            |",
                                "                          |-----|=|-----|",
                                "                                ***      "];


var imperialPrisonShipDownstairs = new Location(0, "Imperial Prison Ship - Prisoner Level", 
true, [doors.list.shipJiubRoom, doors.list.shipDownStairsToUp], imperialPrisonShipDownstairsMap, [0, 1])

var imperialPrisonShip = new Location(1, "Imperial Prison Ship - Below Deck", 
true, [doors.list.shipUpstairsToDown, doors.list.shipUpstairsToDeck], imperialPrisonShipMap, [])

var imperialPrisonShipAboveDeck = new Location(2, "Imperial Prison Ship - Above Deck", 
false, [doors.list.shipDeckToUpstairs, doors.list.shipToExciseOffice], imperialPrisonShipAboveDeckMap, []);

var censusAndExciseOffice = new Location(3, "Census and Excise Office", 
true, [doors.list.exciseOfficeToShip], censusAndExciseOfficeMap, []);

imperialPrisonShipDownstairs.initializeMap();
imperialPrisonShip.initializeMap();
imperialPrisonShipAboveDeck.initializeMap();
censusAndExciseOffice.initializeMap();

var locations = [
        imperialPrisonShipDownstairs,
        imperialPrisonShip,
        imperialPrisonShipAboveDeck,
        censusAndExciseOffice
]

export {Location}
export default locations