const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

//get all thoughts
router.get('/', getAllThoughts);

///get one thought
router.get('/:id', getOneThought);

//create a new thought
router.post('/', createThought);

//delete one thought
router.delete('/:id', deleteThought);

// create new reaction
router.post('/:userId/reaction', addReaction);

//delete reaction 
router.delete('/:userId/reaction', deleteReaction);

module.exports = router;