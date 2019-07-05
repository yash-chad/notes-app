const fs=require("fs");
const chalk=require("chalk");

const addNote=(title,body)=>{
    const notes=loadNotes();
    debugger

    const duplicateNotes=notes.filter((note)=> note.title===title);
    const duplicateNote=notes.find((note)=>note.title===title);
    //Using find() stops the execution once a value satisfying the condition is found!! 

    // const duplicateNotes=notes.filter(function(note){
    //     return note.title===title;
    // })

    
    if(duplicateNote.length===0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse.bold("New note added!"));
    }
    else{
        console.log(chalk.red.inverse.bold("Note Title Taken!!"));
    }

}


const removeNote=(title)=>{

    const notes=loadNotes();

    for(var i=0;i<notes.length;i++){
        if(notes[i].title===title){
               notes.splice(i,1);
               console.log(chalk.green.inverse.bold("Note removed!!"))
               saveNotes(notes);
        }
    }
    console.log(chalk.red.inverse.bold("NO such note Found!!"));   
          
}

const listNotes=()=>{
    const notes=loadNotes();

    console.log(chalk.green.inverse("Your Notes!!"));
    notes.forEach((note) => {
        console.log(chalk.blue(note.title+ ":"));
        //console.log(note.body);
    });
}

const readNote=(title)=>{
    const notes=loadNotes();

    const toRead=notes.find((note)=>note.title===title);

    if(toRead===undefined){
        console.log(chalk.red("Note not found!!"));
    }
    else{
        console.log(chalk.blue(toRead.body));
    }
}



const saveNotes=(notes)=>{

    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync("notes.json",dataJSON);
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync("notes.json");
        const dataJSON=dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }  
}


module.exports={
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}