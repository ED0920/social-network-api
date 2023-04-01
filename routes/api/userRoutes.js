const router = require('express').Router();

//get all user
router.get('/', (req,res) => {
    try {
        res.status(200).json({message:"user"})
    }   catch (err) {
        res.status(400).json(err);
    }
});

//get one user
router.get('/:id', (req, res) => {
    res.status(200).json({message:'user_id'})
});

//create a new user
router.post("/", (req, res) => {
    res.status(200). json({message:'new user created'})
});

//update user by id
router.put('/:id', (req, res) => {
    res.status(200).json({message:'user updated'})
});

//delete user
router.delete('/:id', (req, res) => {
    res.status(200).json({message:'user deleted'})
});

// add new friend to user friend list
router.post('/:userId/friends/:friendId', (req, res) => {
    res.status(200).json({message:'added friend to users friend list'})
})

router.delete('/:userId/friends/:friendId', (req, res) => {
    res.status(200).json({message:'deleted friend from friends list'})
});

// create new reaction
router.post('/:userId/reaction', (req, res) =>{
    res.status(200).json({message:'post reaction'})
});

//delete reaction 
router.delete('/:userId/reaction', (req,res) => {
    res.status(200).json({message:'reaction deleted'})
});

module.exports = router;