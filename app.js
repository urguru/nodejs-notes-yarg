const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");
yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demand: true,
      type: "string",
    },
    body: {
      describe: "Write the body that you want here",
      demand: true,
      type: "string",
    },
  },
  handler: (argv) => notes.addNotes(argv.title, argv.body),
});

// Create remove command

yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: (argv) => notes.removeTitle(argv.title),
  builder: {
    title: {
      describe: "The title of the note to be removed",
      demand: true,
      type: "string",
    },
  },
});

yargs.command({
  command: "read",
  describe: "read an existing note",
  builder:{
    title:{
      describe:"The title of the note that you want to read",
      demand:true,
      type:"string"
    }
  },
  handler: (argv) => notes.readNote(argv.title),
});

yargs.command({
  command: "list",
  describe: "list all the existing notes",
  handler: () => notes.listNotes(),
});

yargs.parse();
