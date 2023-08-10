const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc GET all contacts
//@Route /api/contacts
//@access public
const getAllContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).send(contact);
});

//@desc GET individual contact
//@Route /api/contacts/:id
//@access public
const getIndividualContact = asyncHandler(async (req, res) => {
  const individualContact = await Contact.findById(req.params.id);
  if (!individualContact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  res.status(200).send(individualContact);
});

//@desc POST contact
//@Route /api/contacts/
//@access public
const addNewContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const contact = await Contact.create({ name, email, phone });
  res.status(201).json(contact);
});

//@desc PUT contact
//@Route /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const individualContact = await Contact.findById(req.params.id);
  if (!individualContact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).send(updatedContact);
});

//@desc DELETE individual contact
//@Route /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const individualContact = await Contact.findById(req.params.id);
  if (!individualContact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).send(individualContact);
});

module.exports = {
  getAllContacts,
  getIndividualContact,
  addNewContact,
  updateContact,
  deleteContact,
};
