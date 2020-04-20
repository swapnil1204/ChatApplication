const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
let saltRounds = 10;

mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: [true, "firstname is require to register"]
    },
    lastname: {
        type: String,
        require: [true, "lastname is require to register"]
    },
    email: {
        type: String,
        unique: true,
        require: [true, "email is require to register"]
    },
    password: {
        type: String,
        require: [true, "password is require to register"]
    }
}, {
    timestamps: true
});


userSchema.plugin(uniqueValidator);

function userModel() {}

var userDatas = mongoose.model('userdatas', userSchema);

function hash(password) {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

/**
 * @function : registration() 
 * @description : this method write to create new user in userModel.
 * @param : {reqbody}
 * @file : UserModel.js
 * @exports : userModel()
 */
userModel.prototype.registration = (body, callback) => {
    try {
        const newUser = new userDatas({
            "firstname": body.firstname,
            "lastname": body.lastname,
            "email": body.email,
            "password": hash(body.password)
        });
        newUser.save((err, result) => {
            if (err) {
                console.log("email id is already taken!");
                callback(err);

            } else {
                console.log("you are sucessfully registered!!!");
                callback(null, result);
            }
        })
    } catch (error) {
        console.log("ctrl in backend register model entered");
        callback(err);
    }
}

/**
 * @function : login() 
 * @description : this method write to login user with valid credentials.
 * @param : { reqbody(emailid,password) }
 * @file : UserModel.js
 * @exports : userModel()
 */
userModel.prototype.login = (body, callback) => {
    try {
        userDatas.findOne({
            "email": body.email
        }, (err, data) => {
            if (err) {
                callback(err);
            } else if (data != null) {
                bcrypt.compare(body.password, data.password, (err, res) => {
                    if (err) {
                        callback(err);
                    } else if (res) {
                        console.log("login succesfully!!!");
                        callback(null, data);
                    } else {
                        callback("password you entered is incorrect");
                    }
                });
            } else {
                console.log("Invalid user");
                callback("invalid user");
            }
        })
    } catch (error) {
        console.log("ctrl in backend login model")
    }
}

/**
 * @function : checkValid() 
 * @description : this method write to check email id is present in db.
 * @param : { reqbody(email) }
 * @file : UserModel.js
 * @exports : userModel()
 */
userModel.prototype.checkValid = (body, callback) => {
    try {
        userDatas.findOne({
            "email": body.email
        }, (err, data) => {
            console.log("in model data:", data);
            if (err) {
                console.log("error");
                callback(err);
            } else {
                console.log("data in model class " + data);
                callback(null, data);
            }
        })
    } catch (error) {
        console.log("ctrl in backend checkvalid() in model entered");
        callback(err);
    }
}

/**
 * @function : updatePassword() 
 * @description : this method write to update password in db.
 * @param : { reqbody(password) }
 * @file : UserModel.js
 * @exports : userModel()
 */
userModel.prototype.updatePassword = (res, callback) => {
    console.log("IN MODELS :", res.body.password);
    console.log("IN MODEL DECODE :", res.decoded);
    try {
        var newPassword = hash(res.body.password);
        userDatas.updateOne({
            _id: res.decoded.payload.user_id
        }, {
            password: newPassword
        }, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    } catch (error) {
        console.log("ctrl in update passworf from usermodel");
        callback(err);
    }
}

/**
 * @function : getUsers() 
 * @description : this method write to get all users data from db.
 * @return  : { result(all Users data) }
 * @file : UserModel.js
 * @exports : userModel()
 */
userModel.prototype.getUsers = (res, callback) => {
    try {
        userDatas.find({}, (err, result) => {
            if (err) {
                console.log("ctrl in get user from if block");
                callback(err);
            } else {
                console.log("ctrl in get user from else block ");
                callback(null, result)
            }
        })
    } catch (error) {
        console.log("ctrl in update getuser from usermodel");
        callback(err);
    }
}

module.exports = new userModel();