const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
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

//update thought by id
router.put('/:id', updateThought)

//delete one thought
router.delete('/:id', deleteThought);

// create new reaction
router.post('/:thoughtsId/reactions', addReaction);

//delete reaction 
router.delete('/:thoughtsId/reactions/:reactionId', deleteReaction);

module.exports = router;