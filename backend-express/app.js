// imports
const dotenv = require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const lightRoutes = require('./routes/lights')
const sensorRoutes = require('./routes/sensors')
const realtimeRoutes = require('./routes/realtime')
const cors = require('cors')

// port that backend uses to listen to incoming api calls
const PORT = process.env.PORT || 5000;

// starting point
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// serving static docs
app.use(express.static(`${__dirname}/public/generated-docs`))

// connection to mongodb
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connection successful")).catch(error => console.error(error));

// Authroutes
const authRoute = require('./routes/auth')

// middlewares
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/lights', lightRoutes)
app.use('/api/sensors', sensorRoutes)
app.use('/api/realtime', realtimeRoutes)

// endpoint for / route
/**
 * @api {get} / gets the home page of backend
 * @apiDescription This route responds with the root route of the backend
 * @apiGroup Backend
 * @apiSucessExample Success-Response:
 * HTTP 200 OK
 * {
 *	Backend API / route
 * }
 * */
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

// listen on assigned port
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})
