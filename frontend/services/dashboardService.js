  app.service('chatServices', function ($http) {
          this.getAllUsers = function ($scope, usertoken) {
            try {
              $http({
                  method: 'GET', //assigning value to http proprties 
                  url: 'http://localhost:4000/getalluser', //changes here...
                  headers: {
                      'token': usertoken,
                  }
              }).then(
                  function successCallback(response) { //call back function of http service
                      $scope.allUser = response.data.result;
                  },
                  function errorCallback(response) {
                      console.log("not getting users from database ");
                      console.log(response);
                  });
          }
       catch (err) {
          console.log("error found here in getting users")
      }
    }
      this.getUserMsg = function ($scope) {
          try {
              var arr = [];
              var usertoken = localStorage.getItem('token');
              $http({
                  method: 'GET', //assigning value to http proprties 
                  url: 'http://localhost:4000/getallMessage', //assigning value to http proprties 
                  headers: {
                      'token': usertoken,
                  }
              }).then(
                  function successCallback(response) {
                      for (let i = 0; i < (response.data.result.length); i++) { //(response.data.message).length *change was done
                          var a = response.data.result[i];
                          console.log("a is print is values" + a.senderUserId)
                          if (((localStorage.getItem('userid') == a.senderUserId) &&
                                  (localStorage.getItem('ruserId') == a.reciverUserId)) ||
                              ((localStorage.getItem('userid') == a.reciverUserId &&
                                  localStorage.getItem('ruserId') == a.senderUserId))) {
                              // console.log("local user is ", localStorage.getItem('userid'), "a user is ", a.senderUserId, " local rcvrid is ", localStorage.getItem('ruserId'), "  reciver is ", a.recieverUserId);
                              arr.push(a); //pushing all message to array
                              console.log("after if loop" + arr)
                          }
                      }
                      $scope.allUserArr = arr;
                      console.log("Users msg successfull ", arr);
                  },
                  function errorCallback(response) {
                      console.log("Unsuccessfull ");
                      console.log(response);
                  });
          } catch (err) {
              console.log("founr error in getting message")
          }
      }
  })