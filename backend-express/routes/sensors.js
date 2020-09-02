const router = require('express').Router();
const verify = require('../functions/verifyToken')
const Sensor = require('../model/sensor')
const {registerValidation} = require('../functions/sensorValidation')

router.post('/register', 
  (req, res, next) => verify(req, res, next, 3),
  async (req, res)=>{
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const pointExists = await Sensor.findOne({location:[req.body.lon, req.body.lat]})
    if(pointExists) return res.status(400).send("point already exists")

    const sensor = new Sensor({
      location:{type:'Point',
      coordinates:[req.body.lon, req.body.lat]}
    })
    try{
      const savedSensor = await sensor.save()
      return res.status(200).send(savedSensor)
    }catch(err){
      res.status(400).send(err)
    }
})

router.get('/', 
  (req, res, next) => verify(req, res, next, 3),
  async (req, res) => {
    try{
      const sensors = await Sensor.find({})
      return res.status(200).send(sensors)
    }catch(err){
      return res.status(400).send(err)
    }
  }
)

module.exports = router