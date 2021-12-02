const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

userSchema.pre('save',async function(next){
    const user = this
    console.log('before save')
    next()
})

const Task = mongoose.model('Task',userSchema)

module.exports = Task