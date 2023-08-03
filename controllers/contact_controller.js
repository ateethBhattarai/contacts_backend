const asyncHandler = require("express-async-handler");

//@desc GET all contacts
//@Route /api/contacts
//@access public
const getAllContacts = asyncHandler(async (req, res) => {
  res.status(200).send("Get all contacts...");
});

//@desc GET individual contact
//@Route /api/contacts/:id
//@access public
const getIndividualContact = asyncHandler(async (req, res) => {
  res
    .status(200)
    .send(`Get method on id ${req.params.id} for individual contact...`);
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
  res.status(201).json(req.body);
});

//@desc PUT contact
//@Route /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(201).send(`Put method on id ${req.params.id}...`);
});

//@desc DELETE individual contact
//@Route /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).send(`Delete method on id ${req.params.id}...`);
});

module.exports = {
  getAllContacts,
  getIndividualContact,
  addNewContact,
  updateContact,
  deleteContact,
};
