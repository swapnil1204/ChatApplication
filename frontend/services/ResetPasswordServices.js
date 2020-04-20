app.service('resetPasswordServices',function($http,$location){
    console.log(" resetPasswordServices in 1111 service at frntend ")
    this.resetPass=function(data,$scope){
        console.log(" resetPasswordServices in 2222 service at frntend ")
        $http({
            method:'POST',
            url:'http://localhost:4000/ResetPassword/token',
            data:data,
        }).then(
            function successfulCallback(response){
                console.log("reset password successful yooo");
                $scope.message="reset password successful" ;  
                $location.path('/login');   
            },
            function errorCallback(response){
                console.log("reset unsuccessful");
                $scope.message=response.data.message;
            }
        );
    }
});