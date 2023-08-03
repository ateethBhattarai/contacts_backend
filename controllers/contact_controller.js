//@desc GET all contacts
//@Route /api/contacts
//@access public
const getAllContacts = (req, res) => {
  res.status(200).send("Get all contacts...");
};

//@desc GET individual contact
//@Route /api/contacts/:id
//@access public
const getIndividualContact = (req, res) => {
  res
    .status(200)
    .send(`Get method on id ${req.params.id} for individual contact...`);
};

//@desc POST contact
//@Route /api/contacts/
//@access public
const addNewContact = (req, res) => {
  res.status(201).send("Post method...");
};

//@desc PUT contact
//@Route /api/contacts/:id
//@access public
const updateContact = (req, res) => {
  res.status(201).send(`Put method on id ${req.params.id}...`);
};

//@desc DELETE individual contact
//@Route /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
  res.status(200).send(`Delete method on id ${req.params.id}...`);
};

module.exports = {
  getAllContacts,
  getIndividualContact,
  addNewContact,
  updateContact,
  deleteContact,
};
