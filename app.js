const chalk=require("chalk");
const notes=require("./notes")
const yargs=require("yargs")

//Add command
yargs.command({
    command:"add",
    describe:"Adds a note",
    builder:{
        title:{
            describe:"Note title",
            demandOption:true,          //So that it gives error when left empty
            type:"string"               //Tells that type of input is a string           
        },
        body:{
            describe:"Note body",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
       notes.addNote(argv.title,argv.body);
    }
    
})

//Remove command
yargs.command({
    command:"remove",
    describe:"Removes a note",
    builder:{
        title:{
            describe:"Removes a title",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
   
})

//List command

yargs.command({
    command:"list",
    describe:"Lists a note",
    handler(){
        notes.listNotes();
    }
})

//Read command

yargs.command({
    command:"read",
    describe:"Reads a note",
    builder:{
        title:{
            describe:"Reads a note!",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})



yargs.parse();