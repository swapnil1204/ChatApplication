/** imported UserService class and created instance of it */
const controller = require('../controller/UserController.js');
const chatController = require('../controller/ChatController.js');
const middleware = require('../middleware/Authentication.js')
var express = require('express')
var router = express.Router()

/**it will routes to registration method */
//app.post('/register', controller.registration);
router.post('/register', controller.registration)

/**it will routes to login method */
router.post('/login', controller.login)

/**it will routes to forgotpassword method */
router.post('/forgotpassword', controller.forgetPassword);

/**it will routes to setPassword method */
router.post('/ResetPassword/token', middleware.checkToken, controller.setPassword);

/**it will routes to getAllUser method */
router.get('/getalluser', controller.getAllUser);

/**it will routes to setallMessage method */
router.post('/setallMessage', chatController.setAllMessage);

/**it will routes to getallMessage method */
router.get('/getallMessage', chatController.getAllMessage);

module.exports = router