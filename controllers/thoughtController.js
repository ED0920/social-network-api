const { Thought, Reaction } = require('../models');

// create controller for thought
const thoughtController = {
    //get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought
                .find()
                .populate("user")

            res.json(thoughts)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    //get single thought
    getOneThought: async (req, res) => {
        const thought = await Thought
            .findOne({ _id: req.params.id })
            .populate("user")

        !thought
            ? res.status(400).json({ message: 'No thought found with this id' })
            : res.json(thought)

    },
    //create new thought
    createThought: async (req, res) => {
        const thought = await Thought.create(req.body)
        await thought.populate("user")
        !thought
            ? res.status(400).json({ message: 'thought not created' })
            : res.json(thought)

    },
    // find and update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'no thought found with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // find thought and delete
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'thought not found' })
                    : res.json(thought)
            )
            .catch((err) =>
                res.status(500).json(err));
    },

    // create reactions on single thought
    addReaction: async (req, res) => {
        try {
            const reaction = await Reaction.create(req.body)

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $addToSet: { reactions: reaction } },
                { runValidators: true, new: true }
            ).populate({
                path: 'reactions'
            })

            !thought
                ? res.status(400).json({ message: 'no thought with this Id' })
                : res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // delete reactions on a single thought
    deleteReaction: async (req, res) => {
        const reaction = await Reaction.findByIdAndDelete(req.params.reactionId)
        res.json(reaction)
    }
};

module.exports = thoughtController