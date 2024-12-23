const jwt = require("jsonwebtoken")
const SECRET_KEY = "d2f78ec5c4eb64c0bfe582ae6228a6059806a082724c9193836754dd3b8f14c4"

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied: No token provided")
    }
    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified;
        next()

    } catch (e) {
        res.status(400).send("Invalid token")
    }


}


module.exports = { authenticateToken }