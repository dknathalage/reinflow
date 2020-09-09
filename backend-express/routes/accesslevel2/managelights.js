const router = require('express').Router();
const verify = require('../../functions/verifyToken')
const Light = require('../../model/light')
const { registerValidation } = require('../../functions/lightValidation')

router.post('/register',
  (req, res, next) => verify(req, res, next, 3),
  async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) {
      return res.status(404).json({
        status: false,
        error: error.details[0].message
      });
    }
    const pointExists = await Light.findOne({ location: [req.body.lon, req.body.lat] })
    if (pointExists) return res.status(400).json({
      status: false,
      error: 'Point already exists'
    });

    const light = new Light({
      light_name: req.body.lightName,
      light_description: req.body.lightDescription,
      location: {
        type: 'Point',
        coordinates: [req.body.lon, req.body.lat]
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

module.exports = router;