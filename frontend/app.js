/**tell Angular that "ChatApp" is our main module, and depends on the ui.router module. */
var app = angular.module('ChatApp', ['ui.router','btford.socket-io']);
/**Because $stateProvider is an Angular Provider, you must inject it into a .config() block using 
 * AngularJS Dependency Injection. */
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('Register', {
        url: '/register',
        templateUrl: 'Templates/Register.html',
        controller: 'controlRegister'
    })
    $stateProvider.state('Login', {
        url: '/login',
        templateUrl: 'Templates/Login.html',
        controller: 'controlLogin'
    })
    $stateProvider.state('forgotPassword', {
        url: '/forgotpassword',
        templateUrl: 'Templates/forgotPassword.html',
        controller: 'controlForgotPassword'
    })
    $stateProvider.state('ResetPassword', {
        url: '/ResetPassword/:token',
        templateUrl: 'Templates/ResetPassword.html',
        controller: 'resetPasswordController'
    })
    $stateProvider.state('dashBoard',{
        url:'/dashBoard',
        templateUrl:'Templates/Dashboard.html',
        controller:'chatController'
    })
    $stateProvider.state('practice',{
        url:'/practice',
        templateUrl:'Templates/Practice.html',
        controller:'practiceControl'
    })
    $urlRouterProvider.otherwise('/login');
});

// socket io 
app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
return socketFactory({
    ioSocket: io.connect('http://localhost:4000') 
});
}]);
app.config(['$qProvider', function ($qProvider) {
$qProvider.errorOnUnhandledRejections(false);
}]);

/**
$stateProvider.state('ResetPassword '//(also this is state name controller method), {
    url: '/ResetPassword/:token'//(this part will attached to url),
    templateUrl: 'Templates/ResetPassword.html'//(this file will render when this state is active),
    controller: 'resetPasswordController'(this will controller)
})
 */

// //for env var setup
// var env = {};

// // Import variables if present (from env.js)
// if(window){  
//   Object.assign(env, window.__env);
// }

// // Define AngularJS application
// var ngModule = angular.module('ChatApp', []);

// // Register environment in AngularJS as constant
// ngModule.constant('__env', env);

// function disableLogging($logProvider, __env){  
//     $logProvider.debugEnabled(__env.enableDebug);
//   }
  
//   // Inject dependencies
//   disableLogging.$inject = ['$logProvider', '__env'];
  
//   ngModule.config(disableLogging);  

//    // Inject dependencies
// serviceLogin.$inject = ['__env']; 