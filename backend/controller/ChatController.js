var chatservices = require('../services/ChatServices.js')
/**
 * @function : setAllMessage()
 * @description : this method write to get all users data from db.
 * @param : { req(senderId,receiverId,message,senderName,receiverName) }
 * @file : ChatController.js
 * @exports : setAllMessage()
 */
exports.setAllMessage = (req, callback) => {
    try {
        var responseResult = {};
        chatservices.settingMessages(req, (err, data) => {
            if (err) {
                responseResult.status = false;
                responseResult.error = err;
                callback(err)
            } else {
                responseResult.status = true;
                responseResult.data = data;
                callback(null, data)
            }
        })
    } catch (err) {
        console.log("error in set alll message chat controller bckend")
        //callback(err)
    }
}

/**
 * @function : getAllMessage()
 * @description : this method write to get all messages db.
 * @return  : { result(user message from database) }
 * @file : ChatController.js
 * @exports : getAllMessage()
 */
exports.getAllMessage = (req, res) => {
    try {
        chatservices.gettingMessages(req, (err, data) => {
            var responseResult = {};
            if (err) {
                console.log("error in  controllers");
                data.responseResult = false;
                data.responseResult = err;
                //responseResult.sucess = false;
                //responseResult.result = err;
                res.status(500).send(responseResult);
            } else {
                console.log("controller working fine");
                responseResult.sucess = true;
                responseResult.result = data;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.status(500).send(err);
    }
}