const jwt = require('jsonwebtoken')

module.exports = function (req, res, next, level) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ "route-access": false, "message": "invalid token" })

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified
        if (req.user.access > level) return res.status(400).json({ "route-access": false, "token-status": "valid", "message": "insufficient access rights" })
        next();
    } catch (err) {
        res.status(400).json({ "route-access": false, "token-status": "invalid" })
    }
}