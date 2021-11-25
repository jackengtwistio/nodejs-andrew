const yargs = require('yargs')
const {getNotes} = require('./notes')

yargs.command({
    command: 'es',
    describe:'spanish',
    builder:{
        title:{
            description: 'oneTitle',
            demandOption: true,
            type: 'string'
        },
        body:{
            description: 'oneBody',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function({title,body}){
        getNotes(title, body,'notes.json')
    }
})

yargs.parse()
// console.log(yargs.argv)
