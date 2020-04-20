app.service('serviceLogin',function($http,$location){
    console.log("frontend login service")
    this.login=function(data,$scope){
        $http({
            method:'POST',
            url:'http://localhost:4000/login',
            data:data,
        }).then(
            function successfulCallback(response){
                var userid = response.data.message._id ;
                var name = response.data.message.firstname;
                var token=response.data.token;
                localStorage.setItem("userid",userid);
                localStorage.setItem("name",name);
                localStorage.setItem("token",token);
                console.log("login successful at servicelogin in client side and redirect to login page ");  
                $location.path('/dashBoard');      
            },
            function errorCallback(response){
                console.log("Login unsuccessful please check your username and password");
                console.log(response);
                $scope.loginMessage="EmailId or Password Incorrect";
            }
        );
    }
});
