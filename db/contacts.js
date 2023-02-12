const fs = require("fs").promises;
const filePath = require("./filePath");
const updateContact = require("./updateContact");
const { v4: uuidv4 } = require("uuid");

//get all the contacts
const listContacts = async () => {
	const data = await fs.readFile(filePath);
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const result = contacts.find((item) => item.id === contactId);

	if (!result) {
		return null;
	}
	return result;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === contactId);
	const removeContact = contacts.splice(idx, 1);
	await updateContact(contacts);
	return removeContact;
};

const addContact = async (name, email, phone) => {
	const contacts = await listContacts();
	const newContact = { name, email, phone, id: uuidv4() };
	contacts.push(newContact);
	await updateContact(contacts);
	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
};
