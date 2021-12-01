const express = require('express');
const User = require('./models/user')
const Task = require('./models/task');
const { response } = require('express');
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000 
app.use(express.json())


const allUsers = User.find({}).then(users => users)
const allTasks = Task.find({}).then(tasks => tasks)
User.allowedProps = Object.keys(User.schema.tree)
Task.allowedProps = Object.keys(Task.schema.tree)

async function handlePatch(req,res,queryString,model){
    const prop = req.params[queryString]
    const updates = req.body
    const updatesKeys = Object.keys(updates)
    async function response(){
        const result = await model.findOneAndUpdate(
            {prop},
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
app.get('/users', async (req, res) =>{
    res.status(200).send(await allUsers)
})
app.get('/users/:name', async (req, res) =>{
    const name = req.params.name
    console.log(name)
    try{
        if(!name){
            const user = await User.find({})
            res.send(user)
        }else{ 
            const user = await User.find({name})
            res.send(user)
        }
    }catch(err){
        res.status(500).send(err)
    }
})
app.patch('/users/:name',(req, res) => handlePatch(req, res,'name',User))

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
app.get('/tasks/:title', async (req, res) =>{
    const title = req.params.title
    console.log(title)
    try{
        if(!title){ 
            const task = await allTasks
            res.send(task)
        }else{ 
            const task = await Task.find({title})
            res.send(task)
        }
    }catch(err){
        res.status(500).send(err)
    }
})
app.patch('/tasks/:title', (req, res) =>handlePatch(req, res, 'title', Task))

app.listen(port,console.log(`app listening on ${port}`))