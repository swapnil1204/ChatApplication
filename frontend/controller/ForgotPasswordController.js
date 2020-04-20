app.controller('controlForgotPassword',function($scope,serviceForgotPassword){
    console.log("forget pwd in frontend ")
    $scope.forgotPassword=function(){
        var data ={
            'email':$scope.email
        }
        console.log("forget pwd in frontend "+data)
    serviceForgotPassword.forgotPassword(data,$scope);
    }
});