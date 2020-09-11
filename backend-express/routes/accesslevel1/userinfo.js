const router = require('express').Router();
const User = require('../../model/user');

router.post('/setlevel/:id/:level', async (req, res) => {
    try {
        const userid = req.params.id;
        const userlevel = parseInt(req.params.level);
        const user = await User.findOne({
            _id: userid
        });

        if (user) {
            user.accessLevel = userlevel;
            user.save();
            res.status(200).json({
                status: true,
                message: "User Updated",
                user
            })
        } else {
            res.status(404).json({
                status: false,
                message: "User Not Found"
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(404).json({
            status: false,
            message: error.message
        })
    }
})


module.exports = router;