const express = require("express");

const router = express.Router();

const { createContact } = require("../controllers/contactController");

// POST API
router.post("/", createContact);

module.exports = router;