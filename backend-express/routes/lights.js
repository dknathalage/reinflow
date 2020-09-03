const router = require('express').Router();
const verify = require('../functions/verifyToken')
const Light = require('../model/light')
const {registerValidation} = require('../functions/lightValidation')

router.post('/register', 
  (req, res, next) => verify(req, res, next, 3),
  async (req, res)=>{
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const pointExists = await Light.findOne({location:[req.body.lon, req.body.lat]})
    if(pointExists) return res.status(400).send("point already exists")

    const light = new Light({
      location:{type:'Point',
      coordinates:[req.body.lon, req.body.lat]}
    })
    try{
      const savedLight = await light.save()
      return res.status(200).send(savedLight)
    }catch(err){
      res.status(400).send(err)
    }
})

router.get('/', 
  (req, res, next) => verify(req, res, next, 3),
  async (req, res) => {
    try{
      const lights = await Light.find({})
      return res.status(200).send(lights)
    }catch(err){
      return res.status(400).send(err)
    }
  }
)

module.exports = router