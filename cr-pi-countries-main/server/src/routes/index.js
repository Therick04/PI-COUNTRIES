const express = require('express');
const router = express.Router();
const { CountriesGET,IdCountryGET,CountryNameGET,ActivityPOST,ActivitiesGET } = require('../controllers/index')

router.get('/countries',CountriesGET)
router.get('/countries/search',CountryNameGET)
router.get('/countries/:id',IdCountryGET)
router.post('/activities',ActivityPOST)
router.get('/activities',ActivitiesGET)



module.exports = router;
