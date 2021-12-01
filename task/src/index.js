const express = require('express')
const userRoute = require('./router/user')
const taskRoute = require('./router/task')
require('./db/mongoose')

const app = express()
const router = new express.Router();
const port = process.env.PORT || 3000 
app.use(express.json())

app.use(userRoute)
app.use(taskRoute)

// app.get('/', async (req, res) => {
//     const result = await allUsers+ await allTasks
//     res.send(result)
// })



app.listen(port,console.log(`app listening on ${port}`))