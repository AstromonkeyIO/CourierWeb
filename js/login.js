Parse.initialize("bApG86aXpX3SmPNPqTVdK0I0RanLQtRI0VhtkQko", "3HRXp5Sq9uB4COWJw6KoAglmJdZjwfHEhTFMZSgB");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '1648410668762441', 
        status     : true, 
        cookie     : true, 
        xfbml      : true
    });


};

(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


var myApp = angular.module('Courier',['ngRoute']);

myApp.controller('facebookLoginController', ['$scope', function($scope) 
{

    $scope.loginWithFacebookButtonClicked = function() 
    {

    	console.log("event called");
	    Parse.FacebookUtils.logIn(null, {
	        success: function(user) {
	            if (!user.existed()) 
	            {

	                alert("User signed up and logged in through Facebook!");
					if (!Parse.FacebookUtils.isLinked(user)) 
					{

					  Parse.FacebookUtils.link(user, null, {
					    success: function(user) {
					      alert("Woohoo, user logged in with Facebook!");
						  //$state.go('app.main')
					    },
					    error: function(user, error) {
					      alert("User cancelled the Facebook login or did not fully authorize.");
					    }
					  });

					}

	            }
	            else 
	            {

	                alert("User logged in through Facebook!");

	            }
	        },
	        error: function(user, error) {
	            alert("User cancelled the Facebook login or did not fully authorize.");
	        }
	    });    	


    }


}]);


myApp.controller('mainController', ['$scope', function($scope) 
{



}]);


var arrayOfLoginPromoTexts =  ["Social Lending Platform", "Lease or Lend Items with Your Neighbors", "Help and Get to Know Your Community!"];
var currentIndexOfArrayOfLoginPromoTexts = 0;

/*
var user = new Parse.User();
user.set("username", "my name");
user.set("password", "my pass");
user.set("email", "email@example.com");
  
// other fields can be set just like with Parse.Object
user.set("phone", "650-555-0000");
  
user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
    console.log("user logged in!");
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
    console.log("failed");
  }
});
*/

function changeLoginPromoText()
{

	if(currentIndexOfArrayOfLoginPromoTexts == 2)
	{

		currentIndexOfArrayOfLoginPromoTexts = 0;

	}
	else
	{

		currentIndexOfArrayOfLoginPromoTexts++;

	}

	console.log("index " + currentIndexOfArrayOfLoginPromoTexts);

	$('#loginText').fadeOut("slow", function() {

		$('#loginText').text(arrayOfLoginPromoTexts[currentIndexOfArrayOfLoginPromoTexts]).fadeIn("slow");	

	});

}

setInterval(function() {
   changeLoginPromoText();
}, 2500);


/*
myApp.config(function ($routeProvider, $locationProvider) {
//not sure if it matters with ngRoute but try templateUrl then controller
      $routeProvider
        .when('#/main', {
          templateUrl:'main.html',
          controller:'mainController'
      });/*
       .when('/past_events', {      
          templateUrl:'partials/past_events.html',
          controller:'PastEventsCtrl'
      })
        //other routes here
      .otherwise({ 
        redirectTo:'/news'
      });*/
  //$locationProvider.html5Mode(true);
//});


/*
myApp.config(function($stateProvider, $urlRouterProvider) {

$stateProvider.state('app.main', {
url: "/main",
views: {
  'main' :{
      templateUrl: "main.html",
      controller: "mainController"
  }
}
});


});
/*
    // configure our routes
myApp.config(function($routeProvider) {

    $routeProvider.when('/main', {
    	    controller  : 'mainController',
            templateUrl : 'main.html'

        })

        // route for the home page
        /*
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
		*/
        // route for the about page


        /*
        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
		*/
//})


