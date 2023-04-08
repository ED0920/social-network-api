const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,

} = require('../../controllers/userController')
//get all user
router.get('/', getAllUsers)
    //create new user
    .post("/", createUser);

//get one user
router
    .get('/:id', getSingleUser)
    //update user by id
    .put('/:id', updateUser)
    //delete user
    .delete('/:id', deleteUser);

// add new friend to user friend list
router
    // add new friend to user friend list
    .post('/:userId/friends/:friendId', addFriend)
    //delete friend from friend list
    .delete('/:userId/friends/:friendId', deleteFriend);




module.exports = router;