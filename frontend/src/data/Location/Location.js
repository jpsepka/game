import doors from "./GameObjects/Door";
import { containers } from "./GameObjects/Container";

class Location {
    constructor(id, name, indoors, doors, map, npcs, containers) {
        this.id = id;
        this.name = name;
        this.indoors = indoors;
        this.doors = doors;
        this.map = map;
        this.npcs = npcs;
        this.containers = containers;
    }

    initializeMap() {
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = Array.from(this.map[i]);
        }
    }

    setMap(updatedMap) {
        this.map = updatedMap
    }

    getDoor(coords) {
        var door = 0;
        for (var i = 0; i < this.doors.length; i++) {
            if (coords[0] == this.doors[i].coords[0]) {
                if (coords[1] == this.doors[i].coords[1]) {
                    door = this.doors[i];
                }
            } 
        }
        return door;
    }
}


var imperialPrisonShipDownstairsMap = [" /--------------------\\\n",
                                       "//.....|..............\\\\\n",
                                       "|......|...............|\n",
                                       "\\\\.....D..............//\n",
                                       " \\--------------------/"];

var imperialPrisonShipMap = [" /--------------------\\\n",
                             "//.....|..............\\\\\n",
                             "|......................|\n",
                             "\\\\.....|..............//\n",
                             " \\--------------------/"];

var imperialPrisonShipAboveDeckMap =   ["              ______          \n",
                                        "       (     /______\\         \n",
                                        "       )   /   _    \\        \n",
                                        "      ||___|  |_|   |        \n",
                                        "     /__8__|   _    |        \n",
                                        "     | 888 |  /*\\   |        \n",
                                        "     |__|__|__|D|___|       / \n",
                                        "\\___|                | ____/ \n",
                                        "    \\|_______    ___|_/       \n",
                                        "     ~       |..|   ~      ~  \n",
                                        "        ~    |..|       ~    \n",
                                        "     ~    ~  |..|   ~        \n",
                                        "~    /-------|..|---------\\  ~\n",
                                        "    //                    \\\\   ~\n",
                                        " ~  |            D         |   ~\n",
                                        "    \\\\                    // \n",
                                        " ~   \\--------------------/       ~\n",
                                        "    ~                 ~       ~\n",
                                        "         ~         ~       "];

var censusAndExciseOfficeMap = ["             _                           \n",
                                "   __       |D|______                    \n",
                                " _|  |      |        |                   \n",
                                "|    |      |        |                   \n",
                                "|__  |      |        |                   \n",
                                "  |-D|______|    ____|__________________ \n",
                                "  |                       D       |  |  |\n",
                                "  |                       |       |__|  |\n",
                                "  |-----------------------|             |\n",
                                "                          |             |\n",
                                "                          |-----|D|-----|\n",
                                "                                ***        "];

var censusAndExciseOfficeCourtyardMap = ["           |      888           \n",
                                         "   888   ._._._._._|_._._.      \n",
                                         "  88888 /|_______________|\\.    \n",
                                         "    |  .|/                \\|    \n",
                                         "    | /|/                  |    \n",
                                         "      |/              C---------\n",
                                         "      |                D|       \n",
                                         "      ||D|_____        |        \n",
                                         "      |***     |       |        \n",
                                         "______|        |_______|        "]

var censusAndExciseOfficeTwoMap = [ "  _________  \n",
                                    " |   |  |  | \n",
                                    " |   |__|  | \n",
                                    " |         | \n",
                                    "|D         D|\n",
                                    " ----------- "];

var seydaNeenMap = ["           ~               /^\\                                 ~             _________________\n",
                    "   ~                       |_|                  ~                           /                 |\n",
                    "                       ~  |   |   ~                     ~                  /                  |\n",
                    "                ~         | _ |          ~       ____________         ~   /                   |\n",
                    "         ~                ||_|| __             _/            \\__          |                   |\n",
                    "   ~        88   ~     _/|     |  \\           /       8         \\_         |                  |\n",
                    "        ___8888       /  | ___ |   \\     ~   /       888          \\         \\______           |\n",
                    "~      /    || \\_____/   |_|D|_|    |       |   /---\\ | /---\\      |               \\          |\n",
                    "       |    ||              .        \\_____/    |D|_| | |D|_|      |      ~         \\___      |\n",
                    "       |                     .                .................   /                     \\     |\n",
                    "  ~     \\                     .            ..   . /---\\../---\\ . /             ~         |    |\n",
                    "         \\----\\                .      ....      ..|D|_|..|D|_|.  |       ~            ~  |    |\n",
                    "               |         )      .    .           .............    \\             ~    ___/     |\n",
                    " ~              |                .  .       (                      \\              __/         |\n",
                    "         ~      |       (         ..         )              ||      |         ___/            |\n",
                    "                |  88   ..         ...      ||            /-------\\ |        /                |\n",
                    "   ~            \\ 8888 _||_____       ..    |/-------\\   /_________\\| ~     /                 |\n",
                    "           ~     / || |        | ___    ..  /         \\   | _   _ | |      /   /---------\\    |\n",
                    "                 | || |________|/   \\   ..  |      _  |   ||_| |_|| |      |  /| _       |\\   |\n",
                    " ~     ~  --------    |        |_____\\.  .. | /^\\ |_| |   |     _ | |      |   ||_| /^\\  |    |\n",
                    "         |            |        |     ||.  . |_|D|_____|   |_   |_|| |      |   |____|D|__|    |\n",
                    "          --------    |        | /^\\ |.|...................D|_____|--|---|--        ..        |\n",
                    "   ~      ~      |||D||________|_|D|_|| ................ /|_|___|_| ..........................|\n",
                    "                 |  ..........................................................................|\n",
                    "       ~         |   ..       /\\  ..............................   --|---|-- .            ... |\n",
                    "  ~           ~   \\  .. /---\\|  |           .. /---\\________  ...   |      | ./---------||\\ ..|\n",
                    "                  | .._/     \\  | /-------\\.../_____\\_______\\   ..  |      |./|     _   _ |\\..|\n",
                    "    ~    ~        | .. |     |  | |       |.. |     |  _  _ | ....  |    ~ |. |/^\\ |_| |_|| ..|\n",
                    "                  | .. | /^\\ | _| |  /^\\  |.. | /^\\ | |_||_|| ...  /       |..||D|________| ..|\n",
                    " ~       ~        |  ..| |D| |/  \\|__|D|__|.. |_|D|_|_______| ..  |       _/ ................ |\n",
                    "                  |   .........................................  |    ~  /                    |\n",
                    "                  \\                                              |      |                     |\n",
                    "   ~               \\--------------------------------------------/       /                     |\n",
                    "          ~                              ~                      ~      /                      |\n",
                    "                              ~                         ~             /_______________________|"
    ]


var imperialPrisonShipPrisonerLevel = new Location(0, "Imperial Prison Ship - Prisoner Level", 
true, [doors.shipJiubRoom, doors.shipDownStairsToUp], imperialPrisonShipDownstairsMap, [0, 1], [])

var imperialPrisonShipBelowDeck = new Location(1, "Imperial Prison Ship - Below Deck", 
true, [doors.shipUpstairsToDown, doors.shipUpstairsToDeck], imperialPrisonShipMap, [], [])

var imperialPrisonShipAboveDeck = new Location(2, "Imperial Prison Ship - Above Deck", 
false, [doors.shipDeckToUpstairs, doors.shipToExciseOffice], imperialPrisonShipAboveDeckMap, [3], []);

var censusAndExciseOffice = new Location(3, "Census and Excise Office", 
true, [doors.exciseOfficeToShip, doors.censusAndExciseOfficeBasementDoor, doors.exciseOfficeToCourtyard, doors.censusAndExciseOfficeDoor], censusAndExciseOfficeMap, [2], []);

var censusAndExciseOfficeCourtyard = new Location(4, "Census and Excise Office Courtyard",
false, [doors.courtyardToExciseOffice, doors.courtyardToExciseOfficeTwo], censusAndExciseOfficeCourtyardMap, [], [containers.exciseOfficeCourtyardChest])

var censusAndExciseOfficeTwo = new Location(5, "Census and Excise Office", true, 
[doors.exciseOfficeTwoToCourtyard, doors.exciseOfficeTwoToSeydaNeen], censusAndExciseOfficeTwoMap, [], []);

var seydaNeen = new Location(6, "Seyda Neen", false, [doors.seydaNeenToExciseOfficeTwo], seydaNeenMap, [5], []);

imperialPrisonShipPrisonerLevel.initializeMap();
imperialPrisonShipBelowDeck.initializeMap();
imperialPrisonShipAboveDeck.initializeMap();
censusAndExciseOffice.initializeMap();
censusAndExciseOfficeCourtyard.initializeMap();
censusAndExciseOfficeTwo.initializeMap();
seydaNeen.initializeMap();

var locations = {
        imperialPrisonShipPrisonerLevel,
        imperialPrisonShipBelowDeck,
        imperialPrisonShipAboveDeck,
        censusAndExciseOffice,
        censusAndExciseOfficeCourtyard,
        censusAndExciseOfficeTwo,
        seydaNeen
}

export {Location}
export default locations