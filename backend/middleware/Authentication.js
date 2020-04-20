var jwt = require('jsonwebtoken');
/**
 * @function : checkToken()
 * @description : this method write to verify token.
 * @param  : { req(token) }
 * @file : Authentication.js
 * @exports : checkToken()
 */
exports.checkToken = (req, res, next) => {
    try {
        var auth = req.headers['token'];
        if (auth) {
            jwt.verify(auth, 'secretkey', (err, decoded) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Invalid token'
                    });
                } else {
                    console.log(decoded + "token checked")
                    req.decoded = decoded;
                    console.log("token validation successfull", );
                    next();
                }
            });
        } else {
            return res.send({
                success: false,
                message: 'No token provided.'
            });
        }
    } catch (error) {
        res.status(403).send(error); //forbidden i.e not allowed
    }
}