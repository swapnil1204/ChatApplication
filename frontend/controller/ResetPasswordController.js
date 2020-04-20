app.controller('resetPasswordController',function($scope,resetPasswordServices){ //2
    console.log("in frontend  controller");
    $scope.ResetPassword=function(){           //resetPassword         
        console.log("okay frontend reset password  controller")
        var data={
            'password':$scope.password
        }
        console.log("in reset password controller "+data);
        resetPasswordServices.resetPass(data,$scope);    //2
    }
});
