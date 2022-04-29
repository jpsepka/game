const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    character: {
        player: {
            type: Object,
            required: [true, "wtf"]
        },
        npcs: {
            type: Object,
            required: [true, "wtf"]
        },
        dialogue: {
            type: Object,
            required: [true, "wtf"]
        },
        items: {
            type: Object,
            required: [true, "wtf"]
        },
        locations: {
            type: Object,
            required: [true, "wtf"]
        },
        questList: {
            type: Object,
            required: [true, "wtf"]
        },
        races: {
            type: Object,
            required: [true, "huh?"]
        },
        classes: {
            type: Object,
            required: [true, "huh?"]
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Character', characterSchema)