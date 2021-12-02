const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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

taskSchema.pre('save',async function(next){
    const user = this
    console.log('before save task')
    next()
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task