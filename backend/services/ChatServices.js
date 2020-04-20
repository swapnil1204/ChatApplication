const chatModel = require('../app/models/ChatModel.js');
/**
 * @function : settingMessages()
 * @description : this method write to set message in db.
 * @param  : { req }
 * @return : { result }
 * @file : ChatServices.js
 * @exports : settingMessages()
 */
exports.settingMessages = (req, callback) => {
    try {
        console.log("service sett all message 333", req)
        chatModel.savingChat(req, (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result);
            }
        })
    } catch (err) {
        console.log("error in setting message srvice bcend")
    }
}
/**
 * @function : gettingMessages()
 * @description : this method write to get message in db.
 * @param  : { req }
 * @return : { result }
 * @file : ChatServices.js
 * @exports : gettingMessages()
 */
exports.gettingMessages = (req, callback) => {
    try {
        chatModel.getMessage(req, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
    } catch (error) {
        //callback(err);
        console.log("error in getting message chat service ")
    }
}