app.service('practiceService',function($http,$location){
    this.practiceUser=function(data,$scope){
        console.log("data on service practice PRACTICE---",data);
        $http({
            method:'POST',
            url:'http://localhost:4000/register',
            data:data

        }).then(
            function successCallback(response){
                console.log("register successful");
                console.log(response);
                $scope.message="register successful";
                $location.path('/Login');
            },
            function errorCallback(response){
                console.log("register unsuccessful");
                $scope.message=response.data.message.message;
            });
        }
});