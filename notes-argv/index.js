const yargs = require('yargs')
const {addNotes,rmNote, readNotes} = require('./notes')

fileName = 'notes.json'

yargs.command({
    command: 'add',
    describe:'add note',
    builder:{
        title:{
            description: 'the Title gonna be added',
            demandOption: true,
            type: 'string'
        },
        body:{
            description: 'corresponded Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function({title,body}){
        addNotes(title, body,fileName)
    }
})

yargs.command({
    command: 'rm',
    describe:'remove',
    builder:{
        title:
        {
            description: 'the Title gonna be removed',
            type: 'string'
        }
    },
    handler: function({title}){
        rmNote(title,fileName)
    }
})

yargs.command({
    command: 'read',
    describe:'read one note or all notes',
    builder:{
        title:
        {
            description: 'the Title you are looking for',
            type: 'string'
        }
    },
    handler: function({title}){
        readNotes(title,fileName)
    }
})

yargs.parse()
// console.log(yargs.argv)
