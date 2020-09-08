const router = require('express').Router();
const verify = require('../functions/verifyToken')
const Light = require('../model/light')
const {
  registerValidation
} = require('../functions/lightValidation')

/**
 * Deprecation warning
 * 
 * Endpoints in these files have been moved to respective accesslevel folders
 * use accesslevel endpoints from the given folders for more secure routes
 */

// This endpoint has been moved to accesslevel2/managelights.js file 
router.post('/register',
  (req, res, next) => verify(req, res, next, 3),
  async (req, res) => {
    const {
      error
    } = registerValidation(req.body)
    if (error) {
      return res.status(404).json({
        status: false,
        error: error.details[0].message
      });
    }
    const pointExists = await Light.findOne({
      location: [req.body.lon, req.body.lat]
    })
    if (pointExists) return res.status(400).json({
      status: false,
      error: 'Point already exists'
    });

    const light = new Light({
      light_name: req.body.lightName,
      light_description: req.body.lightDescription,
      lon: req.body.lon,
      lat: req.body.lat,
      location: {
        type: 'Point',
      }
    })
    try {
      const savedLight = await light.save()
      return res.status(200).json({
        status: true,
        message: 'Sensor Added!',
        data: savedLight
      });
    } catch (err) {
      res.status(400).send({
        status: false,
        error: err
      });
    }
  })
// This endpoint has been moved to accesslevel3/lights.js
router.get('/',
  (req, res, next) => verify(req, res, next, 3),
  async (req, res) => {
    try {
      const lights = await Light.find({})
      return res.status(200).send(lights)
    } catch (err) {
      return res.status(400).send(err)
    }
  }
)

module.exports = router