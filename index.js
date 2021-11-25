const yargs = require('yargs')
const {addNotes,rmNote, readNotes} = require('./notes')

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
        addNotes(title, body,'notes.json')
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
        rmNote(title,'notes.json')
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
        readNotes(title,'notes.json')
    }
})

yargs.parse()
// console.log(yargs.argv)
