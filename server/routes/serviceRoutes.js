const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.post('/services', serviceController.addService);
router.post('/save', serviceController.saveService);
router.post('/hire', serviceController.hireService);
router.get('/saved', serviceController.getSavedServices);
router.get('/hired', serviceController.getHiredServices);

module.exports = router;
