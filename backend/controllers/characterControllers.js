const ayncHandler = require('express-async-handler')
const Character = require('../models/characterModel')

//@desc get characters
//@route get /api/characters
//@access private
const getCharacters = ayncHandler(async (req, res) => {
    const characters = await Character.find({ user: req.user.id })

    res.status(200).json(characters)
})

//@desc set character
//@route POST /api/characters
//@access private
const setCharacter = ayncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400)
        throw new Error("please add a text field")
    }

    const character = await Character.create({
        character: req.body,
        user: req.user.id
    })

    res.status(200).json(character)
})

//@desc PUT characters
//@route PUT /api/characters/:id
//@access private
const updateCharacter = ayncHandler(async (req, res) => {
    const character = await Character.findById(req.params.id)
    if(!character) {
        res.status(400)
        throw new Error("character not found")
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error("user not found")
    }

    //make sure the logged in user matches character user
    if(character.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    var test = {
        character: req.body
    }
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, test, {new: true})
    res.status(200).json(updatedCharacter)
})
//@desc delete characters
//@route delete /api/characters/:id
//@access private
const deleteCharacter = ayncHandler(async (req, res) => {
    const character = await Character.findById(req.params.id)

    if(!character) {
        res.status(400)
        throw new Error("character not found")
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error("user not found")
    }

    //make sure the logged in user matches character user
    if(character.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await character.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getCharacters,
    setCharacter,
    updateCharacter,
    deleteCharacter
}