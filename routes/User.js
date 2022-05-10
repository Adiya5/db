const express = require('express')
const UserController = require('../controllers/User')
const router = express.Router();
router.get('/', UserController.findAll);
router.get('/:email', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:email', UserController.update);
router.delete('/:email', UserController.destroy);
module.exports = router