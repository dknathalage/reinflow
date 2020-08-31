// imports
const express = require('express');

// port that backend uses to listen to incoming api calls
const PORT = process.env.PORT || 5000;

// starting point
const app = express()


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
app.get('/', (req, res)=>{
	res.status(200).send('Backend API / route');
});


// listen on assigned port
app.listen(PORT, ()=>{
	console.log(`listening on http://localhost:${PORT}`);
})
