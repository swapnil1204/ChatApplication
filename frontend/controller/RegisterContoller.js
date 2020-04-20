app.controller('controlRegister',function($scope,serviceRegister){
    $scope.register=function(){
        var user = {
            'firstname':$scope.firstName,
            'lastname':$scope.lastName,
            'email':$scope.email,
            'password':$scope.password
        }
        console.log("register calling",user);  
    serviceRegister.registerUser(user,$scope);
    }
});