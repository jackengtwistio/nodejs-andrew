const fs = require('fs');

const getNotes = function(title,body,fileName){
    const notes = loadNotes(fileName)
    const duplicates = notes.filter(note => note.title===title)
    if(duplicates.length > 0){
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
    getNotes: getNotes,
    rmNote: rmNote

}