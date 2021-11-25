const fs = require('fs');

const readNotes = function(title,fileName){
    const notes = loadNotes(fileName)
    if(title===undefined) {
        notes.forEach(note => {
            console.log(`title: ${note.title}, body: ${note.body}`)
        })
    }
    if(title){
        correspondNote = notes.find(note => note.title === title)
        if(correspondNote){
            console.log(`corresponded note is: ${correspondNote.body}`)
        }else{
            console.log(`${title} can not be found`)
        }
    }
}

const addNotes = function(title,body,fileName){
    const notes = loadNotes(fileName)
    const duplicates = notes.find(note => note.title===title)
    if(duplicates){
        console.log(`the title ${title} is already taken`);
        return 
    }else{
        notes.push({title,body})
        saveNotes(notes,fileName)
    }
}

const saveNotes = function(notes,fileName){
    const JSONdata = JSON.stringify(notes)
    fs.writeFileSync(fileName, JSONdata)
}

const loadNotes = function(fileName){
    try{
        const buffer= fs.readFileSync(fileName)
        const notes = JSON.parse(buffer.toString())
        return notes
    }catch(err){
        return []
    }
}

const rmNote = function(title,fileName){
    const notes = loadNotes(fileName)
    updatedNotes = notes.filter(note => note.title!==title)
    if(updatedNotes.length===notes.length){
        console.log(`${title} not found`)
    }else{
        console.log(`${title} removed`)
        saveNotes(updatedNotes,fileName)
    }
}

module.exports = {
    addNotes,
    rmNote,
    readNotes}