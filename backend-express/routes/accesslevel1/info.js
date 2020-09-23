const router = require('express').Router();
const User = require('../../model/user');
const Light = require('../../model/light');
//api/l2/info/sensors
router.post('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            status: true,
            users
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: false,
            error: err.message
        })
    }
})

router.post('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const user = await User.findOne({
            _id: id
        });
        if (user) {
            res.status(200).json({
                status: true,
                user
            })
        } else {
            res.status(200).json({
                status: false,
                message: "No User"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: false,
            error: error.message
        })
    }
})

router.post('/light/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const light = await Light.findOne({
            _id: id
        });

        if (light) {
            res.status(200).json({
                status: true,
                light
            })
        } else {
            res.status(404).json({
                status: false,
                message: "No Light"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: false,
            error: error.message
        })
    }
})






module.exports = router;