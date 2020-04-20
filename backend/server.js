//server.js is main entry point of our application.
/** express() function is a top level function exported by the express module.*/
const express = require('express');

/** that parses the request (of various content types) and exposes req.body object 
that we can access in our routes.*/
const bodyParser = require('body-parser');

/** creates an express application. return an object of type express.*/
const app = express();

var cors = require('cors');
app.use(cors({credentials: false}));

/** which can decode url data in different formats. */
app.use(bodyParser.urlencoded({
    extended: true
}));
/*** A middleware is a function that has access to the request and response objects. 
It can execute any code, transform the request object to req.body, or return a response.*/
app.use(bodyParser.json());

const expressValidator = require('express-validator');

app.use(expressValidator());

/**  to configure dot env file */
require('dotenv').config();

/** Configuring the database. */
const dbConfig = require('../backend/config/database.config.js');
const mongoose = require('mongoose');

app.use(express.static('../frontend'))

const chatController=require('../backend/controller/ChatController')

const routes = require('./routes/routes.js')
//mongoose.Promise = global.Promise;

//apply routes to our application
app.use('/', routes);

/**when we get http request we will response with a message in a block.
 parameters are route and callback function.
We define a simple GET route which returns a welcome message to the clients. */
app.get('/', (req, res) => {
    res.json("Your DATABASE is Connected sucessfully");
});

//when we host apps port number is assigned by hosting environments dynamically
const port = process.env.port || 4000 //to set 'env var PORT' run command like "export PORT=4000"
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var http = require('http').Server(app);
//var io = require('socket.io')(http);

var server = http.listen(port, function() {
   //console.log(`listening on localhost:${process.env.port}`);
   console.log('listening on : ',port);
});

const io = require('socket.io')(server);

//checking for events connection will be listening  for incoming sockets.
io.on('connection',function(socket){
    console.log("socket is connected");
    //started listening events  and socket.on wait for the event.whenever that event is triggered to callback
    //function is called
    socket.on('createMessage',function(message){
        //saving message to database
        console.log("in server.js file ======="+message)
        chatController.setAllMessage(message,(err,data)=>{
            if(err){
                console.log("Error on message");
                console.log(err);
            }else {
                console.log("@@@@@@@in server@@@@@@"+message);
                //io.emmit is used to emit the message to all sockets connected to it.
                io.emit('newMessageSingle',message);
                console.log("@#@#@#in server"+message);
            }
        })
    });
     //socket emit disconnect event which will be called whenever client disconnect 
    io.on('disconnect',function(socket){
        console.log("socket disconnected..!!!")
    });
});


module.exports = app; //for testing purpose