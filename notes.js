const fs = require("fs");
const chalk = require("chalk");


const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((item) => item.title ===title);
  if (duplicateNotes){
    duplicateNotes.body += " " + body;
    console.log("The title is taken");
  } else {
    console.log(chalk.greenBright("New note added"));
    notes.push({
      title: title,
      body: body,
    });
  }
  saveNotes(notes);
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

const loadNotes = () => {
  try {
    const databuffer = fs.readFileSync("notes.json");
    const dataJSON = databuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeTitle = (title) => {
  const notes = loadNotes();
  if (notes.length == 0) {
    console.log("There is nothing to read from the file");
  } else {
    const retainedNotes = notes.filter((note) => note.title !== title);
    if (notes.length === retainedNotes.length) {
      console.log(chalk.red("The title requested doesnt exist"));
    } else {
      saveNotes(retainedNotes);
      console.log(chalk.green("Successfully updated the notes file"));
    }
  }
};

const listNotes = () => {
  notes = loadNotes();
  console.log(chalk.yellow.inverse("Your list"));
  notes.forEach((element) => {
    console.log(chalk.green(element.title));
    console.log(chalk.red.inverse(element.body));
  });
};

const readNote=(title)=>{
    const notes=loadNotes()
    const note=notes.find((note)=>note.title===title)
    if(note){
        console.log(chalk.bold.inverse(note.title))
        console.log(note.body)
    }
    else
    {
        console.log(chalk.red.inverse("The title doesnt exist"))
    }
}


module.exports = {
  addNotes: addNotes,
  removeTitle: removeTitle,
  listNotes: listNotes,
  readNote:readNote
};
