/** imported UserService and created instance of it */
const userService = require('../services/UserServices.js');
const tokenObj = require('../middleware/jwtToken.js');
var jwt = require('jsonwebtoken')
const sendingMail = require('../middleware/SendingMail')

//const {body} = require('express-validator/check')
//     body('firstname', 'firstname is required to register').exists();
//     body('lastname', 'laststname is required to register').exists();
//     body('email', 'email is required to register').exists().isEmail();
//     body('password', 'password is required to register').isLength({min: 5});
//     var validation = req.getValidationResult()
//     console.log(validation)
//     if (validation) {
//         res.status(422).send("error while validating credintials in register()")
//    } 
//     else {

/**
 * @function : registration() 
 * @description : this method write to register user.
 * @param  : { req(firstname,lastname,email,password) }
 * @file : UserController.js
 * @exports : registration()
 */
exports.registration = (req, res) => {
    req.checkBody('firstname','firstname should have min three chars').isLength( {min:3}).isAlpha();
    req.checkBody('lastname','firstname should have min three chars').isLength( {min:3}).isAlpha();
    req.checkBody('email','email is not correct').isEmail();
    req.checkBody('password','password is not correct');

 /**    
  * var requestBody = {
  * firstname = req.firstname,
  * lastname = req.lastname,
  * email = req.email,
  * password = req.password,
    } pass this as parameter
*/

    var errors = req.validationErrors();
    var responseResult = {};
    if(errors){
        responseResult.success = false;
        responseResult.error = errors
        return res.status(422).send(responseResult);
    }else{
    try {
        let data = req.body;
        userService.registration(data, (err, result) => {
            if (err) {
                console.log("ctrl in backend registercontroller if block");
                responseResult.success = false;
                responseResult.message = "email id is already taken!"
                responseResult.error = err;
                res.status(500).send(responseResult);
            } else {
                console.log("ctrl in backend registercontroller else block");
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
}
}

/**
 * @function : login() 
 * @description : this method write to login user.
 * @param  : { req(email,password) }
 * @file : UserController.js
 * @exports : login()
 */
module.exports.login = (req, res) => {
    req.checkBody("email", "email is not valid").isEmail();
    req.checkBody("password", "pass word is not valid").isLength({ min: 3 });
    var errors = req.validationErrors();
    var responseResult = {}
    if (errors) {
        responseResult.success = false;
        responseResult.error = errors
        return res.status(422).send(responseResult)
    }
    else {
    try {
        userService.login(req.body, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                var token = jwt.sign({
                    email: req.body.email,
                    id: data._id
                }, 'secret', {
                    expiresIn: 86400000
                });
                console.log("from usercontrol" + data)
                return res.status(200).send({
                    message: data,
                    "token": token
                });
            }
        })
    } catch (error) {
        console.log("exception in login method")
        //res.status(500).send(error);
    }
}
}

/**
 * @function : forgetPassword()
 * @description : this method write to check email is valid or not.
 * @param  : { req(email) }
 * @file : UserController.js
 * @exports : forgetPassword()
 */
exports.forgetPassword = (req, res) => {
    req.checkBody("email", "email is not valid").isEmail();
    var errors = req.validationErrors();
    var responseResult = {};
    if (errors) {
        responseResult.success = false;
        responseResult.error = errors;
        return res.status(422).send(responseResult);
    } else {
    try {
        let data = req.body;
        userService.checkUser(data, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.result = err;
                res.status(500).send(responseResult);
            } else {
                console.log("result is true : " + result);
                responseResult.success = true;
                responseResult.result = result;
                const payload = {
                    user_id: responseResult.result._id
                }
                const obj = tokenObj.generateToken(payload);
                console.log("ggfdfisddsfd" + obj)
                //give this link in frontend at service method
                const url = `http://localhost:4000/#!/ResetPassword/${obj}`;
                //invoke function to send mail
                sendingMail.sendingMail(url);
                res.status(200).send(url);
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
}
}

/**
 * @function : setPassword()
 * @description : this method write update password.
 * @param  : { req(password) }
 * @file : UserController.js
 * @exports : setPassword()
 */
exports.setPassword = (req, res) => {
    var responseResult = {};
    req.checkBody('password', 'password is not valid')
    var errors = req.validationErrors();
    if (errors) {
        responseResult.success = false;
        responseResult.error = errors
        return res.status(422).send(responseResult)
    }
    else {
    try {
        console.log("password receive in controller @reset password" + req.body)
        userService.settingPassword(req, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.result = err;
                res.status(500).send(responseResult);
            } else {
                responseResult.success = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
}
}

/**
 * @function : getAllUser()
 * @description : this method write to get all users data from db.
 * @return  : { result(all userdata from database) }
 * @file : UserController.js
 * @exports : getAllUser()
 */
exports.getAllUser = (req, res) => {
    try {
        let responseResult = {}
        userService.gettingUser(req, (err, data) => {
            if (err) {
                console.log("err in controller");
                responseResult.sucess = false;
                responseResult.result = err;
                res.status(500).send(responseResult);
            } else {
                console.log(" controller working fine.. ");
                responseResult.success = true;
                responseResult.result = data;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
}