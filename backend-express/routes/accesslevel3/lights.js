const router = require('express').Router();
const Ligth = require('../../model/light')
const Route = require('../../model/routing');


let routesArr = new Array();


router.get('/',
    async (req, res) => {
        try {
            const sensors = await Ligth.find({});
            res.status(200).json({
                status: true,
                sensors: sensors
            })
        } catch (error) {
            console.log(error)
            res.send(404).json({
                status: false,
                error
            })
        }
    }
)
/**
 * @api {get} /routedata/:token/:username Update route data - Backend
 * @apiDescription This endpoint will update the backend with the with the latest coordinates from the frontend for the lights to be updated to green
 * @apiGroup Level 3 
 * @apiParam (Parameter) {String} token User unique JWT token
 * @apiParam (Parameter) {String} username User username
 * @apiParam (Body) {String} starting_point Staring point coordinates
 * @apiParam (Body) {String} ending_point Ending point coordinates
 * @apiParam (Body) {String} coords Coordinate collection of the path route visualized on the map.
 * @apiSuccess {Boolean} status Statius of the request true | false.
 * @apiSuccess {String} message Response message of the request.
 * @apiSuccessExample {json} Success-Response:
                {  "status": true, 
                   "message": "Action logged" 
                }
    @apiError NoStartingOrEndingPoints The <code>starting</code> and <code>ending</code> points are not available. 
    @apiError ErrorOnSaving An error occured when saving to mongoodb. 
    @apiErrorExample {json} Error-Response:
                 {
                     status: false,
                     "message": ErrorOnSaving
                 }
 * */  
router.post('/routedata/:token/:username', async (req, res) => {
    try {
        const token = req.params.token;
        const username = req.params.username;
        const {
            start_point,
            end_point,
            coords
        } = req.body;
        console.log(req.body);
        if (!start_point || !end_point) {
            res.status(404).json({
                status: false,
                message: "No starting or ending points"
            })
        } else {

            //TODO: initiate the lights changing bit. because we have the coordinates. 
            //This should also happen on a per user basis, if not if will affect all the users. 
            //There should be an implementation to check if there is a special route in action, if not 
            //display the normal

            //this feature might also not be needed because the color lights are changed for everyone. 
            //and this must be displayed on users map. 

            //can either fetch the mongoodb, or else use the built in get req to get the coords used.

            //adding to array
            const route_DataSet = {
                token: token,
                user: username,
                coordinates: coords
            }

            routesArr = [...routesArr, route_DataSet]; //pushes the route_Dataset into the array

            //saving
            const route = new Route({
                user_name: username,
                auth: token,
                starting_point: start_point,
                ending_point: end_point,
                geometry: {
                    coordinates: coords
                }
            })
            const savedRoute = await route.save();
            res.status(200).json({
                status: true,
                message: "Action logged.",
                savedRoute
            })
            console.log(routesArr)

        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status: false,
            message: `Error on Saving`,
            error: error.message
        })
    }
})


router.get('/routedata/requests', async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            routing: routesArr
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error.message
        })
    }
})

module.exports = router;