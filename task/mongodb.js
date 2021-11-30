const {MongoClient, ObjectId} = require('mongodb')
const id = new ObjectId()
const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'taskManager'
console.log(id.id.length)
console.log(id.toString().length)
MongoClient.connect(connectionURL, (error,client) => {
    if(error){
        return console.error(error)
    }
    console.log(`Connecting to ${connectionURL}`)
    const db = client.db(dataBaseName)
    db.collection('users').updateMany({
        age:30
    },{ 
        $set: {user:'bryan'},
        $inc: {age: 1}
    },
    (err,result) => {
        if(err){console.error(err)}
        else{console.log(result.modifiedCount)}
    })
})