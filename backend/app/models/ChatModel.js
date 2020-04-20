var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var chatSchema = new mongoSchema({

    senderUserId: {
        type: String
    },
    senderName: {
        type: String
    },
    reciverUserId: {
        type: String
    },
    reciverName: {
        type: String
    },
    message: {
        type: String
    }
}, {
    timestamps: true
});

function chatModel() {}

var chat = mongoose.model('userchats', chatSchema);


/**
 * @function : savingChat() 
 * @description : this method write to save chatting data to the database.
 * @param : {chatData}
 * @file : ChatModel.js
 * @exports : chatModel()
 */
chatModel.prototype.savingChat = (chatData, callback) => {
    try {
        const newMsg = new chat({
            'senderUserId': chatData.senderUserId,
            'senderName': chatData.senderName,
            'reciverUserId': chatData.reciverUserId,
            'reciverName': chatData.reciverName,
            'message': chatData.message
        });
        console.log("new Msg in model==>", newMsg);
        newMsg.save((err, result) => {
            if (err) {
                console.log("Storing data failed , error occured", err);
                return callback(err); //return
            } else {
                console.log("Chat data saved sucessfully");
                return callback(null, result); //return
            }
        });
    } catch (err) {
        console.log("result not found in chatmodel adding message")
    }
}

/**
 * @function : savingChat() 
 * @description : this method write to get chatting data from the database.
 * @return : all messages.
 * @file : ChatModel.js
 * @exports : chatModel()
 */

chatModel.prototype.getMessage = (req, callback) => {
    try {
        chat.find({}, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data);
            }

        })
    } catch (err) {
        console.log("Cannot find data")
    }
}

module.exports = new chatModel();