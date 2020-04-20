app.controller('practiceControl',function($scope,practiceService){
    $scope.register=function(){
        var user = {
            'firstname':$scope.firstName,
            'lastname':$scope.lastName,
            'email':$scope.email,
            'password':$scope.password
        }
        console.log(" PRACTICE CONTROLLER  ",user);  
        practiceService.practiceUser(user,$scope);
    }
});