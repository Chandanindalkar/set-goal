// Simple middleware for handling exceptions inside of 
// async express routes and passing them to your express error handlers.
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler(async(req, res) => {
    //req.user from authMiddleware
    const goal = await Goal.find({user: req.user.id})

    res.json(goal);
})

const setGoals = asyncHandler(async(req, res) => {
    if (!req.body.message) {
        res.status(400)
        throw new Error('please add message in body')
    }

    console.log(req.body.message)

    const goal = await Goal.create({
        "message": req.body.message,
        user: req.user.id,
    });

    res.json(goal);
})

const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if (!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    // req.user from authMiddleware
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
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

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
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