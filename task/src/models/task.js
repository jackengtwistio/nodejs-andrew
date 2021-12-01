const mongoose = require('mongoose');


const Task = mongoose.model('Task',{
    title: {
        type: 'string',
        required: true
    }, 
    description: String, 
    date: Date, 
    completed:{
        default: false,
        type: Boolean
    }
})

module.exports = Task