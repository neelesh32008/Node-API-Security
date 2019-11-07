const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const dataController = require('../controller/data.controller');

router.post('/register', userController.create);

router.post('/authenticate', userController.authenticate);

router.post('/detail', dataController.detail);

router.post('/upload', dataController.upload);

router.get('/:id/photos', dataController.photos);

module.exports = router;