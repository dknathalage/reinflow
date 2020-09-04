const jwt = require('jsonwebtoken')

module.exports = function (req, res, next, level) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied')

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified
        if (req.user.access > level) return res.status(403).send("unauthorised access")
        next();
    } catch (err) {
        res.status(403).send("invalid token")
    }
}