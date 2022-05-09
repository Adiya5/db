const express = require("express");
const path = require("path");
const router = express.Router();
const ejs = require("ejs");
const UserController = require("../controllers/User");

router
    .route("/")
    .get((req, res) => res.render(path.resolve("./views/all.ejs")))
router.get('/views/all.ejs', UserController.findAll);
module.exports = router;