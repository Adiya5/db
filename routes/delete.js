const express = require("express");
const path = require("path");
const router = express.Router();
const ejs = require("ejs");
const UserController = require("../controllers/User");

router
    .route("/")
    router.get('/', (req, res) => res.render(path.resolve("./views/delete.ejs")))
    router.post('/', (req, res) => res.send("POST"));
    router.delete('/:id', UserController.destroy);
module.exports = router;