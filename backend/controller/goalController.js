const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.find()

    res.json(goal);
})

const setGoals = asyncHandler(async(req, res) => {
    if (!req.body.message) {
        res.status(400)
        throw new Error('please add message in body')
    }

    console.log(req.body.message)

    const goal = await Goal.create({
        "message": req.body.message
    });

    res.json(goal);
})

const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if (!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    
    res.json(updatedGoal);
})

const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if (!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }
    
    await Goal.findByIdAndRemove(req.params.id)

    res.json({'Deleted Goal with id': req.params.id});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}