const fs = require('fs');
const axios = require('axios')

// const api = axios.get('https://api.coursera.org/api/courses.v1').then(res=>{
//     fs.writeFileSync('coursera.json',JSON.stringify(res.data))
//     // console.log(res.data)
// })
const jjson = fs.readFileSync('coursera.json')
const string = jjson.toString()
const name = JSON.parse(string).elements.map(element => element.name)
name[0]='hey,its changed'
fs.writeFileSync('name.js',JSON.stringify(name))

// fs.writeFileSync()
// console.log(name)

//video