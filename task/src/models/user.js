const mongoose = require('mongoose');
const validator = require('validator');


const User = mongoose.model('User',{
    name:{
        type: 'string',
        required: true, 
        trim: true, 
        max: [6, 'I will not remember your name! too long!']
    },
    email:{
        type: 'string',
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){throw new Error('Please enter a valid email')}
        }
    },
    password:{
        type: 'string',
        validate(value) {
            value.includes(this.name)?console.log('using your name inside your password is no good'):(
                value.includes(this.email)?console.log('using your email is no good'):(
                    value.isStrongPassword?console.log(`good enough`):console.log(`password not a strong one`)
                )
            )
        }
    }
})


module.exports = User 
