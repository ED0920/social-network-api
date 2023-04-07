const { Thought } = require('../models');

// create controller for thought
const thoughtController = {
    //get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought
                .find()
            // .populate("user")

            res.json(thoughts)

        } catch (err) {
            res.status(500).json(err)
        }
    },
    //get single thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'No thought found with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
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
            { _id: req.params.id })
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
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reaction: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'no thought with this Id' })
                    : res.json(thought)
            )
            .catch((err) => res.stauts(500).json(err))
    },

    // delete reactions on a single thought
    deleteReaction(req, res) {
        Thought.findByIdAndDelete(
            { _id: req.params.id },
            { $pull: { reaction: { reactionsId: req.params.reactionId } } },
            { runVAlidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtController