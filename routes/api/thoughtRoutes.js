const router = require('express').Router();

//get all thoughts
router.get('/', (req,res) => {
    res.status(200).json({message:"this is all thoughts"})
});

///get one thought
router.get('/:id', (req, res) => {
    res.status(200).json({message:'this is one thought'})
});

//create a new thought
router.post('/', (req, res) => {
    res.status(200).json({message:'thought has been posted'})
});

//delete one thought
router.delete('/:id', (req, res) => {
    res.status(200).json({message:'thought has been deleted'})
});


module.exports = router;