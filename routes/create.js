const express = require("express");
const path = require("path");
const router = express.Router();
const ejs = require("ejs");
const UserController = require("../controllers/User");

router.get('/', (req, res) => res.render(path.resolve("./views/create.ejs")))
router.post('/', UserController.create);
module.exports = router;