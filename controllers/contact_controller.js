const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@Route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: userDetails.id });
  if (contact.length !== 0) {
    res.status(200).send(contact);
  } else {
    res.send(404);
    throw new Error("No contacts yet!!");
  }
});

//@desc get individual contact
//@Route GET /api/contacts/:id
//@access private
const getIndividualContact = asyncHandler(async (req, res) => {
  const individualContact = await Contact.findById(req.params.id);
  if (!individualContact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }

  if (individualContact.user_id.toString() !== userDetails.id) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).send(individualContact);
});

//@desc create new contact
//@Route POST /api/contacts/
//@access private
const addNewContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: userDetails.id,
  });
  res.status(201).json(contact);
});

//@desc update existing contact details
//@Route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const individualContact = await Contact.findById(req.params.id);
  if (!individualContact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }

  if (individualContact.user_id.toString() !== userDetails.id) {
    res.status(401);
    throw new Error("User has no authorization to update this contact!!");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).send(updatedContact);
});

//@desc delete a contact
//@Route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const individualContact = await Contact.findById(req.params.id);
  if (!individualContact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }

  if (individualContact.user_id.toString() !== userDetails.id) {
    res.status(401);
    throw new Error("User has no authorization to delete this contact!!");
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
