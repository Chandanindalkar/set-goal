const getGoals = (req, res) => {
    res.json({message: 'Get goals'});
}

const setGoals = (req, res) => {
    res.json({message: 'Set goal'});
}

const updateGoals = (req, res) => {
    res.json({message: `Update goal ${req.params.id}`});
}
const deleteGoals = (req, res) => {
    res.json({message: `Delete goal ${req.params.id}`});
}


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}