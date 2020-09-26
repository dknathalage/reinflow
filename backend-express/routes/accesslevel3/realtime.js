const router = require('express').Router()
const cron = require('node-cron')
const axios = require('axios')

SensorBuffer = {};
LightBuffer = {};

/**
 * @api {get} /tasks List all tasks
 * @apiGroup Realtime
 * @apiSuccess {String} title Realtime title
 * @apiSuccess {Boolean} done=false realtime is done?
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
*   data: [
*   {
*    _id: df3ydsbqsqsq3s,
*    longitude:13.42321,
*    latitude:-43.24523,
*    lights-value:233
*   }    
* ]
*  
*}
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

app.get('/tasks', function (req, res) {
    // business logic for listing all tasks...
});
router.get('/sensorbuffer', (res, req) => {
    req.status(200).json(SensorBuffer)
})

router.get('/lightbuffer', (req, res) => {
    axios.get(`${process.env.SOCKET_URL}/devicedata/lights`, { headers: { Authorization: req.header('Authorization') } })
        .then(res => {
            LightBuffer = res.data
        }).catch(err => { console.log(err) })
    res.send(LightBuffer);
})

router.get('/', (req, res) => { res.status(200).json({ "route-access": true }) })

cron.schedule('*/1 * * * * *', () => {
    // axios.get(`${process.env.SOCKET_URL}/devicedata/lights`, {headers:{Authorization:}})
    //     .then(res => {
    //         LightBuffer = res.data
    //     }).catch(err => {  })
})

module.exports = router;