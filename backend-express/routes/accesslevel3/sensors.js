const router = require('express').Router();
const Sensor = require('../../model/sensor');

/** 
* @api { get } / fetches the sensor data from MongoDB database
* @apiGroup Sensor
* @apiSuccessExample { json } Success - Response:
*{
*   data: [
*   {
*    _id: df3ydsb3s,
*    longitude:123.42321,
*    latitude:-23.24523,
*    sensor-value:23
*   }    
* ]
*  
*}
* @apiErrorExample { json } Error - Response:
* {
*     "Error 400: Bad Request"
* } 
*/
router.get('/',
    async (req, res) => {
        try {
            const sensors = await Sensor.find({}); // Fetch data from sensor collection of mongodb
            return res.status(200).json({ status: true, sensors }); // successful response
        } catch (err) {
            return res.status(400).json({ // failed response
                status: false,
                error: err
            });
        }
    }
);

module.exports = router;