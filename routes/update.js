const express = require("express");
const path = require("path");
const router = express.Router();
const ejs = require("ejs");
const UserController = require('../controllers/User')
router
    .route("/")
    .get((req, res) => res.render(path.resolve("./views/update.ejs")))
    .patch(UserController.update);
router.patch('/:id', UserController.update);
module.exports = router;