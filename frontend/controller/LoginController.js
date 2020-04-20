app.controller('controlLogin',function($scope,serviceLogin){
    console.log("in frontend login controller");
    $scope.login=function(){
        console.log("okay frontend login controller")
        var data={
            'email':$scope.email,
            'password':$scope.password
        }
        console.log(data);
        console.log("data from controller ")
        serviceLogin.login(data,$scope);
    }
});

