const express = require('express')
const UserController = require('../controllers/User')
const path = require("path");
const router = express.Router();
//router.get("/", (req, res) => res.render(path.resolve("./views/create.ejs")))
router.get('/all', UserController.findAll);

router.get('/:email', UserController.findOne);
router.post('/', UserController.create);

router.patch('/:email', UserController.update);

router.delete('/:email', UserController.delete);

module.exports = router