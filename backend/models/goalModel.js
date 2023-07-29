// schema

const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        message: {
            type: String,
            requried: [true, 'Please add a text value'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Goal', goalSchema)