const jwt = require('jsonwebtoken');

/**
 * @function : generateToken()
 * @description : this method write to generate token for given payload.
 * @param  : { payload }
 * @return : { token }
 * @file : jwtToken.js
 * @exports : generateToken()
 */

module.exports = {
    generateToken(payload) {
        const token = jwt.sign({
            payload
        }, 'secretkey', {
            expiresIn: '2h'
        }) // expires in 2 hours
        // const obj = {        
        //     success: true,
        //     message: 'Token Generated!',
        //     token: token
        // }
        //return obj;
        return token
    }
}