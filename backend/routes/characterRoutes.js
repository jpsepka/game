const express = require('express')
const router = express.Router()
const { getCharacters,
        setCharacter,
        updateCharacter,
        deleteCharacter } = require('../controllers/characterControllers')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getCharacters).post(protect, setCharacter)
router.route('/:id').delete(protect, deleteCharacter).put(protect, updateCharacter);

module.exports = router