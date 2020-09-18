const router = require('express').Router();
const Ligth = require('../../model/light')
const Route = require('../../model/routing');


const routesArr = new Array();


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

router.get('/routedata/:token/:username', async (req, res) => {
    try {
        const token = req.params.token;
        const username = req.params.username;
        const {
            start_point,
            end_point,
            coords
        } = req.body;
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
                message: "Action logged."
            })

        }
    } catch (error) {
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