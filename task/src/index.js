const express = require('express');
const User = require('./models/user')
const Task = require('./models/task');
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000 
app.use(express.json())


const allUsers = User.find({}).then(users => users)
const allTasks = Task.find({}).then(tasks => tasks)
User.allowedProps = Object.keys(User.schema.tree)
Task.allowedProps = Object.keys(Task.schema.tree)

async function findAndDo(req,res,method,queryString,model,successMessage='succeeded') {
    const prop = req.params[queryString]
    const result = await model[method]({[queryString]:prop})
    try{
        if(!result||result.length===0){return res.send(`can't find ${prop}`)}
        res.send(successMessage+': '+result)
    }catch(err){
        res.status(500).send(err)
    }
}

async function handlePatch(req,res,queryString,model){
    const prop = req.params[queryString]
    const updates = req.body
    const updatesKeys = Object.keys(updates)
    async function response(){
        const result = await model.findOneAndUpdate(
            {[queryString]:prop},
            {...updates},
            {new: true, runValidators: true}
            )
        if(!result){return res.send(`can't find ${req.params.prop}`)}
        res.send(result)
    }
    try{
        updatesKeys.every(key=>model.allowedProps.includes(key))?
            response() : 
            res.send(`you can only add ${model.allowedProps}`)
        }catch{
            res.status(500).send('server is down')
        }
}

app.get('/', async (req, res) => {
    const result = await allUsers+ await allTasks
    res.send(result)
})

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
app.get('/users', async (req, res) =>res.status(200).send(await allUsers))
app.get('/users/:name', async (req, res) =>findAndDo(req,res,'find','name',User))
app.patch('/users/:name',(req, res) => handlePatch(req, res,'name',User))
app.delete('/users/:name', async (req, res) =>findAndDo(req,res,'findOneAndDelete','name',User,'delete'))

// -----------------------------------------------------------------
 

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


app.listen(port,console.log(`app listening on ${port}`))