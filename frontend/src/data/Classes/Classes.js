import skills from '../Skills/Skill'
import attributes from '../Attributes/Attributes';

class Classes {
    constructor(name, major, minor, description, specialization, attributes) {
        this.name = name;
        this.major = major;
        this.minor = minor;
        this.description = description;
        this.specialization = specialization;
        this.attributes = attributes;
    }
}

var bard = new Classes("Bard", [skills.speechcraft, skills.alchemy, skills.acrobatics, skills.longBlade, skills.block], 
[skills.mercantile, skills.illusion, skills.mediumArmor, skills.enchant, skills.security], "Bards are loremasters and storytellers. They crave adventure for the wisdom and insight to be gained, and must depend on sword, shield, spell and enchantment to preserve them from the perils of their educational experiences.",
"Stealth", [attributes.personality, attributes.intelligence])

var classes = {
    bard
}

export default classes;