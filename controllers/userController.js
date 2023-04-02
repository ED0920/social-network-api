const { user } = require ('../models');


//create  controller for user
const userController = {
// get all users
 getAllUsers(req, res){
    user.find()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
 },
 //get one user by id
 getSingleUser(req, res){
    user.findOne({_id: req.params.userId})
    .select('-__v')
    .then((dbUserData) =>
        !user
        ? res.status(404).json({message: 'No user found with that ID'})
        : res.json(dbUserData)
    )
    .catch((err) => res.status(500).json(err));
 },
 //create new user
 createUser(req,res){
    user.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err))
 },

 //find user and update
 updateUser({params, body}, res){
    user.findOneAndUpdate(
        {_id: params.id},
        body,
        {runValidators: true, new: true}
    )
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found'});
            return;
        }
        res.join(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
 },
 // add afriend to friend's list
 addFriend(req, res) {
    user.findOneAndUpdate(
        { _id: req.params.id},
        { $addToSet: {responses:req.body}},
        { runValidators: true, new:true}
    )
    .then((dbUserData)=>
    !user? res.status(404).json({message:'No user with this id'})
    : res.join(dbUserData)
    )
    .catch((err) => res.status(500).json(err));
 },

 //find user and delete
 deleteUser(res, res) {
    user.findOneAndUpdate(
        {_id: req.params.id})
    .then(dbUserData => 
    !dbUserData
    ? res.status(404).json({message: 'no user with that id'})
    : res.json(dbUserData)
 )
    .catch((err) => res.status(500).json(err));    
},

//delete friend from friend's list
deleteFriend(req, res){
    user.findOneAndUpdate(
    {_id: req.params.id},
    { $pull:{ friends: params.friendId}},
    {runValidators: true, new: true}
    )
    .then((dbUserData)=>
    !user
    ? res.status(404).json({message: 'No user found with this id!'})
    : res.json(dbUserData)
    )
    .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;