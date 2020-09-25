const router = require('express').Router();
const namechange = require('./namechange');
const lights = require('./lights');
const sensors = require('./sensors');
const realtime = require('./realtime');

router.get('/', (req, res) => {
    res.json({ "route-access": true });
})
/**
 * @api {post} /tasks Register a new task
 * @apiGroup Tasks
 * @apiParam {String} title Task title
 * @apiParamExample {json} Input
 *    {
 *      "title": "Study"
 *    }
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} title Task title
 * @apiSuccess {Boolean} done=false Task is done?
 * @apiSuccess {Date} updated_at Update date
 * @apiSuccess {Date} created_at Register date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Study",
 *      "done": false,
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */

// route to change names of the user accounts
router.use('/username', namechange); // Change username endpoint
router.use('/lights', lights);       // light data endpoint
router.use('/sensors', sensors);     // sensor data endpoint
router.use('/realtime', realtime)    // realtime data endpoint

module.exports = router;