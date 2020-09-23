const router = require('express').Router()
const cron = require('node-cron')

SensorBuffer = {};
LightBuffer = {};

router.get('/sensor-buffer', (res, req) => {
    req.json(SensorBuffer)
})

router.get('/light-buffer', (res, req) => {
    req.json(LightBuffer)
})

cron.schedule('*/15 * * * * *', ()=>{
    SensorBuffer = {};
    LightBuffer = {};
    console.log("clearing buffers")
})

cron.schedule('*/1 * * * * *', ()=>{
    /** Append to Arrays */
    console.log('appending to buffers')
})

module.exports = router;