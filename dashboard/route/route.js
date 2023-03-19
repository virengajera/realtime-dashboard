const router = require('express').Router();

const apiCtrl = require('../controller/controller.js')

router.get('/temperature',apiCtrl.getTemperature)
router.get('/humidity',apiCtrl.getHumidity)
router.get('/systemusage',apiCtrl.getSystemUsage)


module.exports = router