import fs from "fs/promises"
import { randomUUID } from "crypto";
import path from "path"


const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.filter((el) => el.id === contactId.toString());

  return contact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const newList = contacts.filter((el) => el.id !== contactId.toString());
  fs.writeFile(contactsPath, JSON.stringify(newList));
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newList = [...contacts,{ id: randomUUID() , name, email, phone }];
  fs.writeFile(contactsPath, JSON.stringify(newList));

}

