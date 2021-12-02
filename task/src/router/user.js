const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const app = new express.Router()
const { handlePatch,findAndDo } = require('../utils/dbcrud')

const allUsers = User.find({}).then(users => users)
User.allowedProps = Object.keys(User.schema.tree)

app.post('/new/user', async (req, res) =>{ 
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(500).send(err)
    }
})



app.get('/users', async (req, res) =>res.status(202).send(await allUsers))
app.get('/users/:name', async (req, res) =>findAndDo(req, res, 'find', 'name', User))
app.patch('/users/:name',(req, res) => handlePatch(req, res, 'name', User,))
app.delete('/users/:name', async (req, res) =>findAndDo(req,res,'findOneAndDelete', 'name', User, 'delete'))

module.exports = app