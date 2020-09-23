// imports
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const lightRoutes = require('./routes/lights');
const sensorRoutes = require('./routes/sensors');
const realtimeRoutes = require('./routes/realtime');
const verify = require('./functions/verifyToken');

// endpoints by accesslevels
const accessL1 = require('./routes/accesslevel1');
const accessL2 = require('./routes/accesslevel2');
const accessL3 = require('./routes/accesslevel3');

const manageRoutes = require('./routes/manage')
const infoRoutes = require('./routes/info')
const cors = require('cors');

// port that backend uses to listen to incoming api calls
const PORT = process.env.PORT || 5000;

// starting point
const app = express();

app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        await next();
    }
});

// serving static docs
app.use(express.static(`${__dirname}/public/generated-docs`));

// connection to mongodb
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connection successful")).catch(error => console.error(error));

// Authroutes
const authRoute = require('./routes/auth');
const verifyToken = require('./functions/verifyToken');

// middlewares
app.use(express.json());

app.use('/api/user', authRoute);

// these routes will be moved to secure routes.
// app.use('/api/lights', lightRoutes); // deprecated
// app.use('/api/sensors', sensorRoutes); // deprecated 
// app.use('/api/realtime', realtimeRoutes); // deprecated
app.use('/api/l1', (req, res, next) => verify(req, res, next, 1), accessL1); // Endpoints for toplevel users (Systems admin)
app.use('/api/l2', (req, res, next) => verify(req, res, next, 2), accessL2); // Endpoints for midlevel users (System developers)
app.use('/api/l3', (req, res, next) => verify(req, res, next, 3), accessL3); // Endpoints for lowlevel users (Users)

// app.use('/api/manage/update', manageRoutes)

/**
 * Enpoints of this router have been changed. refere the original file for more details.
 */
//app.use('/api/info', infoRoutes)

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
    res.sendFile(`/public/generated-docs/index.html`);
});

// listen on assigned port
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});