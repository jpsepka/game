class Reagent extends Item {
    constructor(name, stackSize, value) {
        super(name, stackSize, value);
    }
}

var crystalVial = new Reagent("Crystal Vial", true, 1);
var coarseThread = new Reagent("Coarse Thread", true, 1);
var fineThread = new Reagent("Fine Thread", true, 1);
var mildSpices = new Reagent("Mild Spices", true, 1);
var weakFlux = new Reagent("Weak Flux", true, 1);
var salt = new Reagent("Salt", true, 1);