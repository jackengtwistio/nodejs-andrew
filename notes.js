const fs = require('fs');

const getNotes = function(title,body,fileName){
    const notes = loadNotes(fileName)
    const duplicates = notes.filter(note => note.title===title)
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
    console.log(JSONdata)
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

module.exports = {
    getNotes: getNotes
}