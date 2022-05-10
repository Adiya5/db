const express = require("express");
const path = require("path");
const router = express.Router();
const ejs = require("ejs");
const UserController = require("../controllers/User");
router
    .route("/")
    .get((req, res) => res.render(path.resolve("./views/find.ejs")))
//router.get('/views/find.ejs', UserController.findAll);
router.get('/:email', UserController.findOne);
module.exports = router;