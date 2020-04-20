app.service('serviceForgotPassword',function($http,$location){
    console.log(" forgot password in 1111 service at frntend ")
    this.forgotPassword=function(data,$scope){
        console.log(" forgot password in 2222 service at frntend ")
        $http({
            method:'POST',
            url:'http://localhost:4000/forgotpassword',
            data:data,
        }).then(
            function successfulCallback(response){
                console.log("Forgot password successful");
                var userid=response.data.message[0]._id ;
                var name=response.datamessage[0].firstName;
                var token=response.data.token;
                localStorage.setItem("userid",userid);
                localStorage.setItem("name",name);
                localStorage.setItem("token",token);   
                $scope.loginMessage="login Successful"  ;     
            },
            function errorCallback(response){
                console.log("register unsuccessful");
                console.log(response);
                $scope.loginMessage="EmailId Incorrect";
            }
        );
    }
});