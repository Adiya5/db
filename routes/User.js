const express = require('express')
const UserController = require('../controllers/User')
const router = express.Router();
router.get('/', UserController.findAll);
router.get('/:email', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:ID', UserController.update);
router.delete('/:ID', UserController.delete);
module.exports = router