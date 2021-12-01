const express = require('express');
const Task = require('../models/task')
const app = new express.Router()
const { handlePatch,findAndDo } = require('../utils/dbcrud')

const allTasks = Task.find({}).then(tasks => tasks)
Task.allowedProps = Object.keys(Task.schema.tree)

app.post('/new/task', async (req, res) =>{ 
    const task = new Task(req.body)
    console.log(task)
    try {
        await task.save()
        res.status(201).send(task)
    }catch(err){
        res.status(500).send(err)
    }
})
app.get('/tasks', async (req, res) =>{
    res.status(200).send(await allTasks)
})
app.get('/tasks/:title', (req, res) =>findAndDo(req,res,'find','title',Task))
app.patch('/tasks/:title', (req, res) =>handlePatch(req, res, 'title', Task))
app.delete('/tasks/:title', (req,res) =>findAndDo(req, res, 'findOneAndDelete', 'title', Task,'deleted'))

module.exports = app