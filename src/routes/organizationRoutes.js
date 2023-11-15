const express = require('express');
const OrganizationController = require('../controllers/organizationController');

const router = express.Router();

router.get('/get', OrganizationController.getByName);
router.get('/getAll', OrganizationController.getOrganizations);
router.post('/insert', OrganizationController.insert);

module.exports = router;