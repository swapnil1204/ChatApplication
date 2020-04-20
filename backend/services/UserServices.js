/** imported UserModel and created instance of it */
const userModel = require('../app/models/UserModel.js');

/**
 * @function : registration()
 * @description : this method write to create newUser in db.
 * @param  : { data }
 * @return : { result }
 * @file : UserServices.js
 * @exports : registration()
 */
exports.registration = (data, callback) => {
    try {
        userModel.registration(data, (err, result) => {
            if (err) {
                console.log("ctrl in backend registerservice if block");
                callback(err);
            } else {
                console.log("ctrl in backend registerservice else block");
                callback(null, result);
            }
        })
    } catch (error) {
        console.log("ctrl in backend register services");
        callback(err);
    }
}

/**
 * @function : login()
 * @description : this method write login.
 * @param  : { data }
 * @return : { result }
 * @file : UserServices.js
 * @exports : login()
 */
exports.login = (data, callback) => {
    try {
        userModel.login(data, (err, result) => {
            if (err) {
                console.log("ctrl in backend loginservices if block");
                callback(err);
            } else {
                console.log("ctrl in backend loginservices else block");
                callback(null, result);
            }
        })
    } catch (error) {
        console.log("ctrl in backend loginservices");
        callback(err);
    }
}

/**
 * @function : checkUser()
 * @description : this method write to check user present in db or not.
 * @param  : { data }
 * @return : { result }
 * @file : UserServices.js
 * @exports : checkUser()
 */
exports.checkUser = (data, callback) => {
    try {
        userModel.checkValid(data, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
    } catch (error) {
        console.log("ctrl in backend checkuser() in services of forgetpassword");
        callback(err);
    }
}

/**
 * @function : settingPassword()
 * @description : this method write to set password.
 * @param  : { data }
 * @return : { result }
 * @file : UserServices.js
 * @exports : settingPassword()
 */
exports.settingPassword = (data, callback) => {
    try {
    console.log(" in setPass services ", data.body);
    userModel.updatePassword(data, (err, result) => {
        if (err) {
            console.log("ctrl in backend set password in if block service");
            callback(err);
        } else {
            console.log("ctrl in backend set password in else block service");
            callback(null, result);
        }
    })    
} catch (error) {
    console.log("ctrl in backend set password service");
    callback(err);
}
}

/**
 * @function : gettingUser()
 * @description : this method write to get users.
 * @return : { result }
 * @file : UserServices.js
 * @exports : gettingUser()
 */
exports.gettingUser = (req, res) => {
try{
    userModel.getUsers(req, (err, result) => {
        if (err) {
            console.log("ctrl in backend get user in if block service");
            res(err);
        } else {
            console.log("ctrl in backend get user in else block service");
            res(null, result);
        }
    })
}catch(error){
    console.log("ctrl in backend get user in service");
    callback(err);
}
}