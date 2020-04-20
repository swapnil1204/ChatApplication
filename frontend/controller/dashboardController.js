app.controller('chatController', function ($scope, SocketService, $location, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    $scope.currUser = localStorage.getItem('userid');

    var token = localStorage.getItem("token");
    console.log(token);
    if (token === null) { 
        //if the tocken is null then go to login page
        console.log("in front controller token is null")
        //$state.go('Login'); and change to $state
        $location.path('/login')
    }
    //listening to the evnts
    SocketService.on('newMessageSingle', (message) => { 
        try {
            console.log("!!!!!frontend controller prited msg coming msg from server" + message)
            if (localStorage.getItem('userid') == message.senderUserId 
            || (localStorage.getItem('userid') == message.recieverUserId 
            && localStorage.getItem('ruserId') == message.senderUserId)) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message; //assighning message to variable
                } else {
                    $scope.allUserArr.push(message);
                }
            }
        } catch (err) {
            console.log("error in finding message")
        }
    })

    $scope.getAllUsers = function () {
        console.log("get all users token inside " + token);
        chatServices.getAllUsers($scope, token);
    }

    $scope.getAllUsers();
    
    $scope.person = function (userData) { //select person from list
        $scope.allUserArr = '';
        localStorage.setItem('rusername', userData.firstname); //getting data from localstorage
        localStorage.setItem('ruserId', userData._id);
        $scope.recieverUserName = localStorage.getItem('rusername');
        $scope.getUserMsg();
    }

    //get all message
    $scope.getUserMsg = function () {
        console.log(" user msg () called from controller");
        chatServices.getUserMsg($scope);
    }
    //$scope.getUserMsg();

    $scope.sendmessage = function () { //send message function
        try {
            var msg = {
                'senderUserId': localStorage.getItem('userid'),
                'senderName': localStorage.getItem('name'),
                'reciverUserId': localStorage.getItem('ruserId'),
                'reciverName': localStorage.getItem('rusername'),
                'message': $scope.message
            };
            $scope.message = '';
            console.log("frntend dash controller")
            console.log(msg)
            SocketService.emit('createMessage', msg); //emittin the message to the browser
        } catch (err) {
            console.log("error in sending message to the reciever")
        }}
    
        $scope.logout = function () {
            try {
                console.log("in logout button dash.. controller")
                localStorage.clear();
                // $state.go('/login') //return back to login page//change  /login
                $location.path('/login');
                SocketService.emit('disconnect', msg);
                
            } catch (err) {
                console.log("error in logging out")
            }
        }
});