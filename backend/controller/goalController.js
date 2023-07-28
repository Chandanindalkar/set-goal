const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async(req, res) => {
    if (!req.body.message) {
        res.status(400)
        throw new Error('please add message in body')
    }
    // console.log(req.body)
    res.json({message: 'Get goals'});
})

const setGoals = asyncHandler(async(req, res) => {
    res.json({message: 'Set goal'});
})

const updateGoals = asyncHandler(async(req, res) => {
    res.json({message: `Update goal ${req.params.id}`});
})

const deleteGoals = asyncHandler(async(req, res) => {
    res.json({message: `Delete goal ${req.params.id}`});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}