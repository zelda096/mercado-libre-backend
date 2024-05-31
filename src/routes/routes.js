const express = require("express");
const router = express.Router();
const { getItems, getItem } = require("../controllers/itemsController");

router.get("/items", getItems);
router.get("/items/:id", getItem);

module.exports = router;
