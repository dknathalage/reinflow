// const router = require('express').Router()
// const cron = require('node-cron')
// const axios = require('axios')

// SensorBuffer = {};
// LightBuffer = {};
/**
 * Deprecation warning
 * 
 * Endpoints in these files have been moved to respective accesslevel folders
 * use accesslevel endpoints from the given folders for more secure routes
 */

// these endpoints have been moved to accesslevel3/realtime.js file
// router.get('/sensorbuffer', (res, req) => {
//     req.status(200).json(SensorBuffer)
// })

// router.get('/lightbuffer', (res, req) => {
//     req.status(200).json(LightBuffer)
// })

// cron.schedule('*/1 * * * * *', () => {
//     axios.get(`${process.env.SOCKET_URL}/devicedata/lights`)
//         .then(res => {
//             LightBuffer = res.data
//             console.log(LightBuffer);
//         }).catch(err => { console.log(err) })
// })

// module.exports = router;