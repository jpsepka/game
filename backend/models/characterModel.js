const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    character: {
        type: Object,
        required: [true, "wtf"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Character', characterSchema)