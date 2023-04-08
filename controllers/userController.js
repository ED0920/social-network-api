const { User } = require('../models');


//create  controller for user
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    //get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .select('-__v')
            .then((dbUserData) =>
                !User
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },
    //create new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err))
    },

    //find user and update
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // add afriend to friend's list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .populate({
                path: 'friends',
            })
            .then((dbUserData) =>
                !User ? res.status(404).json({ message: 'No user with this id' })
                    : res.join(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },

    //find user and delete
    deleteUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId })
            .then(dbUserData =>
                !dbUserData
                    ? res.status(404).json({ message: 'no user with that id' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    },

    //delete friend from friend's list
    deleteFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.id },
        )
            .then((dbUserData) =>
                !dbUserData ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;