 var myApp = angular.module('webApp', ['ui.router']);
 
myApp.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/main');



   $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html'
      })

   

  var mainState = {
    name: 'main',
    url: '/main',
    templateUrl: 'views/main.html',
    controller:'mainCtrl'
  }

  var iosState = {
    name: 'ios',
    url: '/ios',
    templateUrl: 'views/ios.html'
  }

  var androidState = {
    name: 'android',
    url: '/android',
    templateUrl:'views/android.html'
  }

  var webdesignState = {
    name: 'webdesign',
    url: '/webdesign',
    templateUrl: 'views/webdesign.html'
  }

  var sitemapState={
    name:'sitemap',
    url:'/sitemap',
    templateUrl:'views/sitemap.html'
  }

  var webdevelopmentState = {
    name: 'webdevelopment',
    url: '/webdevelopment',
    templateUrl:'views/webdevelopment.html'
  }

 

   var aboutState = {
    name: 'about',
    url: '/about',
    templateUrl: 'views/about.html'
  }

  var testimonial1State={
    name:'testimonial1',
    url:'/testimonial1',
    templateUrl :'views/testimonial1.html',
    controller:'testimonialCtrl'
  }
   var testimonial2State={
    name:'testimonial2',
    url:'/testimonial2',
    templateUrl :'views/testimonial2.html'
  }

   var testimonial3State={
    name:'testimonial3',
    url:'/testimonial3',
    templateUrl :'views/testimonial3.html'
  }

  var seoState={
    name:'seo',
    url:'/seo',
    templateUrl :'views/seo.html'
  }

  var privacyPolicyState={
    name:'privacy-policy',
    url:'/privacy-policy',
    templateUrl :'views/privacy-policy.html'
  }

  

  // var portfolio3State={
  //   name:'portfolio3',
  //   url:'portfolio3',
  //   templateUrl :'views/portfolio3.html'
  // }

  // var portfolio2State={
  //   name:'portfolio2',
  //   url:'portfolio2',
  //   templateUrl :'views/portfolio2.html'
  // }

  var portfolio1State={
    name:'portfolio1',
    url:'/portfolio1',
    templateUrl :'views/portfolio1.html',
    controller:'portfolioCtrl'
  }
  
  
  var contactState={
    name:'contact',
    url:'/contact',
    templateUrl:'views/contact.html',
    controller:'contactCtrl'
  }



  $stateProvider.state(mainState);
  $stateProvider.state(sitemapState);
  $stateProvider.state(iosState);
  $stateProvider.state(androidState);
  $stateProvider.state(webdesignState);
  $stateProvider.state(webdevelopmentState);
  $stateProvider.state(aboutState);
  $stateProvider.state(testimonial3State);
  $stateProvider.state(testimonial2State);
  $stateProvider.state(testimonial1State);

  $stateProvider.state(seoState);
  $stateProvider.state(privacyPolicyState);
  
  // $stateProvider.state(portfolio3State);
  // $stateProvider.state(portfolio2State);
  $stateProvider.state(portfolio1State);
  
  $stateProvider.state(contactState);



}]);



myApp.controller('mainCtrl',function($scope,$http){

 $scope.accordion = {
      current: null
    };
    
  
  $http.get('/get-mainData').then(function(response){

      $scope.tests=response.data.dataOne;
      $scope.services =response.data.dataTwo;
      $scope.ports=response.data.dataThree;
      console.log($scope.tests);
     
  })
})








myApp.controller('testimonialCtrl',function($scope,$http){
  
     $scope.curPage = 0;
     $scope.pageSize = 6;
    $http.get('/get-testimonial').then(function(response){
        
        
         $scope.names=response.data;
           // console.log($scope.names);
        
       })



    $scope.numberOfPages = function() 
     {
        return Math.ceil($scope.names.length / $scope.pageSize);
     };

       
  })


myApp.filter('pagination', function()
{
 return function(input, start)
 {
   if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
 };
});
 
 


myApp.controller('portfolioCtrl',function($scope,$http){
   // var parameter = JSON.stringify({ $scope.service_id: _id})

    $scope.curPage = 0;
     $scope.pageSize = 20;
         $http.get('/get-portfolio').then(function(response){
        
        
         $scope.data=response.data;
              //console.log($scope.data);
         // alert($scope.names[0].clientname);
       })





     $scope.numberOfPages = function() 
     {
        return Math.ceil($scope.data.length / $scope.pageSize);
     };

  })



myApp.controller('contactCtrl',function($scope,$http,$state){
  
$scope.submit=function(){   

  var Data={
    name:$scope.name,
    email:$scope.email,
    message:$scope.message
      }  
        $http( {
            method: 'POST',
            url: 'http://localhost:3000/sendmail', 
            data: JSON.stringify(Data)
           
        }).then(function (response) {
               alert("mail sent")
            $state.go($state.current, {}, {reload: true}); 

           

    }).error(function(response){
        alert("hello there is some error")
    });
  };
});


