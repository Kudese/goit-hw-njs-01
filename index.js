import * as methodcontact from "./contacts.js";

import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await methodcontact.listContacts());
      break;

    case "get":
      console.log(await methodcontact.getContactById(id));
      break;

    case "add":
      console.table(await methodcontact.listContacts());
      console.table(await methodcontact.addContact(name, email, phone));
      break;

    case "remove":
      console.table(await methodcontact.listContacts());
      await methodcontact.removeContact(id);
      console.table(await methodcontact.listContacts());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
