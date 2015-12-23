var mainApp = angular.module("mainApp", ['ngRoute', 'ngDialog']);

mainApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            url: '/login',
            templateUrl: '/html/login.html',
            controller: 'facebookLoginController'
        })
        .when('/index', {
            url: '/index',
            templateUrl: 'index.html',
            controller: 'mainController'
        })
        .when('/home', {
            url: '/home',
            templateUrl: '/html/home.html',
            controller: 'homeController'
        })
        .otherwise({
            redirectTo: '/login'
        });

        $locationProvider.html5Mode(true);
});

//login page serve

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


//var myApp = angular.module('Courier',['ngRoute']);

mainApp.controller('mainController', ['$scope', function($scope)
{



}]);

mainApp.controller('facebookLoginController'/*, ['$scope'*/, function($scope, ngDialog) 
{
    
    /*
    var arrayOfLoginPromoTexts =  ["Courier is a Shipping and Delivery Platform for the Sharing Economy", "Have Something that You Want to Ship?", "Find Someone in Your Area Who Can Deliver to Your Shipping Destination", "Connect and Ship Your Package!"];
    var currentIndexOfArrayOfLoginPromoTexts = 0;

    function changeLoginPromoText()
    {

      if(currentIndexOfArrayOfLoginPromoTexts == 3)
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
    }, 3700);
    */
    
                   
         
    /*
    $(document).ready(function ()
    {
                     
     $(".player").mb_YTPlayer();
                     
     });
    */

    $scope.loginWithFacebookButtonClicked = function() 
    {

      console.log("event called");
      Parse.FacebookUtils.logIn(null, {
          success: function(user) {
              if (!user.existed()) 
              {

                  //alert("User signed up and logged in through Facebook!");
                if (!Parse.FacebookUtils.isLinked(user)) 
                {

                  Parse.FacebookUtils.link(user, null, {
                    success: function(user) {
                      alert("page redirect");
                        FB.api('/me', function(me) {
                            console.log("me " + me);
                            user.set("displayName", me.name);
                            user.set("email", me.email);

                            console.log("/me response", me);
                            FB.api("/me/picture?width=180&height=180",  function(response) {

                              console.log("fb picture" + response.data.url);
                              user.set("profileImageURL", response.data.url);
                              user.save();
                              window.location = '/#/home';

                            });
       
                        });
                      //window.location = '/#/home';
                      //window.location.reload(); 

                    },
                    error: function(user, error) {
                      //alert("User cancelled the Facebook login or did not fully authorize.");
                    }
                  });

                }

              }
              else 
              {

                  //alert("User logged in through Facebook!");

                  FB.api('/me', function(me) {
                      console.log("me " + me);
                      user.set("displayName", me.name);
                      user.set("email", me.email);

                      console.log("/me response", me);
                      FB.api("/me/picture?width=180&height=180",  function(response) {

                        console.log("fb picture" + response.data.url);
                        user.set("profileImageURL", response.data.url);
                        user.save();
                        window.location = '/#/home';

                      });
 
                  });

                  //window.location = '/#/home';
                  //window.location.reload(); 

              }
          },
          error: function(user, error) {
              alert("User cancelled the Facebook login or did not fully authorize.");
          }
      });     


    }
                   
                   
    $scope.init = function()
   {
   
       $(".player").mb_YTPlayer();
                   
   }


}/*]*/);


//Home Section

mainApp.controller('homeController', function($scope, ngDialog)  
{

  //$( "#datepicker" ).datepicker();

  var currentUser = Parse.User.current();
  if (currentUser) 
  {
      console.log("current user " + currentUser.get("profileImageURL"));

      $("#profile-image").attr("src", currentUser.get("profileImageURL"));
      $("#profile-name").html(currentUser.get("displayName"));

  } else {
      // show the signup or login page
  }

  var shippingGeoLocationDataObject = 
  {
    pickupAddressLatLng: '',
    shippingAddressLatLng :''
  };

  navigator.geolocation.getCurrentPosition(function (p) 
  {

    $('#pickupAddressInputAutocomplete').val('Searching for your current location...');
    $("#pickupAddressInputAutocomplete").prop('disabled', true);

    var pickupAddressLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);

    shippingGeoLocationDataObject.pickupAddressLatLng = pickupAddressLatLng;

    console.log("current location" + pickupAddressLatLng);
    var geocoder = new google.maps.Geocoder();
    console.log("geocoder " + geocoder);
     geocoder.geocode({'location': pickupAddressLatLng}, function(results, status) 
     {

        console.log("I'n");
        if (status === google.maps.GeocoderStatus.OK) 
        {
            //infowindow.setContent(results[1].formatted_address);
            console.log("I'n" + results[1].formatted_address);
            $scope.shippingForm = {
              pickupAddress: results[1].formatted_address
            };
            $('#pickupAddressInputAutocomplete').val(results[1].formatted_address);
            $("#pickupAddressInputAutocomplete").prop('disabled', false);

        } 
        else 
        {
            //window.alert('No results found');
            $("#pickupAddressInputAutocomplete").prop('disabled', false);
        }
      });

  });

  $(document).ready(function() {
      $('.input-group input[required], .input-group textarea[required], .input-group select[required]').on('keyup change', function() {
      var $form = $(this).closest('form'),
              $group = $(this).closest('.input-group'),
        $addon = $group.find('.input-group-addon'),
        $icon = $addon.find('span'),
        state = false;
              
        if (!$group.data('validate')) {
        state = $(this).val() ? true : false;
      }else if ($group.data('validate') == "email") {
        state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
      }else if($group.data('validate') == 'phone') {
        state = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test($(this).val())
      }else if ($group.data('validate') == "length") {
        state = $(this).val().length >= $group.data('length') ? true : false;
      }else if ($group.data('validate') == "number") {
        state = !isNaN(parseFloat($(this).val())) && isFinite($(this).val());
      }

      if (state) {
          $addon.removeClass('danger');
          $addon.addClass('success');
          $icon.attr('class', 'glyphicon glyphicon-ok');
      }else{
          $addon.removeClass('success');
          $addon.addClass('danger');
          $icon.attr('class', 'glyphicon glyphicon-remove');
      }
          
          if ($form.find('.input-group-addon.danger').length == 0) {
              $form.find('[type="submit"]').prop('disabled', false);
          }else{
              $form.find('[type="submit"]').prop('disabled', true);
          }
    });
      
      $('.input-group input[required], .input-group textarea[required], .input-group select[required]').trigger('change');
      
      
  });

  $scope.showFindCourierForm = function()
  {


    $("#findShipperForm").css("display", "none").fadeOut("slow");
    $("#findCourierForm").css("display", "inline").fadeIn("slow");
    /*
    $("#findShipperForm").css("display", "none").fadeOut(4000, function() {

      $("#findCourierForm").css("display", "inline").fadeIn(4000);

    });
    */

  }

  $scope.showFindShipperForm= function()
  {

    $("#findCourierForm").css("display", "none").fadeOut(4000, function() {

      $("#findShipperForm").css("display", "inline").fadeIn(4000);

    });

  }

  /*
  $scope.couriers = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
  */

  $scope.couriers = [];

  $scope.findCouriersButtonPressed = function(shippingForm)
  {

   var geocoder = new google.maps.Geocoder();
   geocoder.geocode( { 'address': shippingForm.shippingAddress}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK)
    {

      console.log("destination cooridnates" + results[0].geometry.location.lat() + results[0].geometry.location.lng());
      var destinationLatitude = results[0].geometry.location.lat();
      var destinationLongitude = results[0].geometry.location.lng();

      var destinationGeoPoint = new Parse.GeoPoint({latitude: destinationLatitude, longitude: destinationLongitude});

      var ShipperTravelRoutes = Parse.Object.extend("ShipperTravelRoutes");                
      var queryCouriers = new Parse.Query(ShipperTravelRoutes);
      // Interested in locations near user.
      queryCouriers.near("destinationGeoPoint", destinationGeoPoint);
      // Limit what could be a lot of points.
      queryCouriers.limit(10);
      // Final list of objects
      queryCouriers.find({
      success: function(couriers) 
      {

      console.log("couriers found" + couriers);
      for(var i = 0; i < couriers.length; i++)
      {

        var parseUserObject = couriers[i].get("user");
        console.log("user object" + parseUserObject);
        var userObject = {'name': parseUserObject.get("displayName"), 'profileImageURL': parseUserObject.get("profileImageURL")};
        console.log("user element" + userObject.name);
        console.log("user element" + userObject.profileImageURL);
        $scope.couriers.push(userObject);
        console.log("scope.couriers length" + $scope.couriers.length);

      }

      ngDialog.open({            
        template:'<div style="width: 450px; height: 300px; text-align:center;"><ul style="list-style-type: none; max-width: 400px; max-height: 300px; white-space:nowrap; overflow-y: scroll;"><li ng-repeat="courier in couriers" style="height:290px;"><div class="profile-sidebar"><div class="profile-userpic-other"><img id="profile-image" src="https://scontent.xx.fbcdn.net/hprofile-xfp1/v/t1.0-1/c33.0.200.200/p200x200/1919122_1142741789342_7118268_n.jpg?oh=7a856de2b3098e1b3e0671fe693ebec3&oe=56FAED32" class="img-responsive" alt="" style="width:40% height: 40%;"></div><div class="profile-usertitle"><a id="profile-name" class="profile-usertitle-name">{{courier.name}}</a><div class="profile-usertitle-job">Arrives 5 miles from destination</div></div><div class="profile-userbuttons"><button type="button" class="btn btn-success btn-sm">Score: 5</button><button type="button" class="btn btn-danger btn-sm">Message</button></div></div></li></ul></div>',plain: true,scope: $scope
        ,preCloseCallback:function(){ $scope.couriers = [];}});

      },
      error: function(couriers, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
      });


      }
   });




/*
   if (navigator.geolocation) 
   {

      navigator.geolocation.getCurrentPosition(function (p) 
      {
      
        var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        console.log("current location" + LatLng);
        console.log("geocoder" + geocoder);
          //var address = document.getElementById("address").value;
        //var address = "new york";
        //var address = "1600 Amphitheatre Parkway, Mountain View, CA"
        var address = shippingForm.address + ' , ' + shippingForm.city + ' ' + shippingForm.country;
        console.log("address" + address);
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
                // do something with the geocoded result
                //
          console.log("destination cooridnates" + results[0].geometry.location.lat() + results[0].geometry.location.lng());
          var destinationLatitude = results[0].geometry.location.lat();
          var destinationLongitude = results[0].geometry.location.lng();

          var destinationGeoPoint = new Parse.GeoPoint({latitude: destinationLatitude, longitude: destinationLongitude});
   
          var ShipperTravelRoutes = Parse.Object.extend("ShipperTravelRoutes");                
          var queryCouriers = new Parse.Query(ShipperTravelRoutes);
          // Interested in locations near user.
          queryCouriers.near("destinationGeoPoint", destinationGeoPoint);
          // Limit what could be a lot of points.
          queryCouriers.limit(10);
          // Final list of objects
          queryCouriers.find({
          success: function(couriers) 
          {

            console.log("couriers found" + couriers);
            for(var i = 0; i < couriers.length; i++)
            {

              var parseUserObject = couriers[i].get("user");
              console.log("user object" + parseUserObject);
              var userObject = {'name': parseUserObject.get("displayName"), 'profileImageURL': parseUserObject.get("profileImageURL")};
              console.log("user element" + userObject.name);
              console.log("user element" + userObject.profileImageURL);
              $scope.couriers.push(userObject);
              console.log("scope.couriers length" + $scope.couriers.length);

            }

            ngDialog.open({            
              template:'<div style="width: 450px; height: 300px; text-align:center;"><ul style="list-style-type: none; max-width: 400px; max-height: 300px; white-space:nowrap; overflow-y: scroll;"><li ng-repeat="courier in couriers" style="height:290px;"><div class="profile-sidebar"><div class="profile-userpic-other"><img id="profile-image" src="https://scontent.xx.fbcdn.net/hprofile-xfp1/v/t1.0-1/c33.0.200.200/p200x200/1919122_1142741789342_7118268_n.jpg?oh=7a856de2b3098e1b3e0671fe693ebec3&oe=56FAED32" class="img-responsive" alt="" style="width:40% height: 40%;"></div><div class="profile-usertitle"><a id="profile-name" class="profile-usertitle-name">{{courier.name}}</a><div class="profile-usertitle-job">Arrives 5 miles from destination</div></div><div class="profile-userbuttons"><button type="button" class="btn btn-success btn-sm">Score: 5</button><button type="button" class="btn btn-danger btn-sm">Message</button></div></div></li></ul></div>',plain: true,scope: $scope
              ,preCloseCallback:function(){ $scope.couriers = [];}});

          },
          error: function(couriers, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              alert('Failed to create new object, with error code: ' + error.message);
          }
          });


            }
        });
          //alert("yooyo");
          //ngDialog.open({ template: 'templateId' });


      });

    } 
    else 
    {

      alert('Geo Location feature is not supported in this browser.');

    }
*/

}
                   
                   
var placeSearch, autocomplete, pickupAddressInputAutocomplete;

var componentForm = {
street_number: 'short_name',
route: 'long_name',
locality: 'long_name',
administrative_area_level_1: 'short_name',
country: 'long_name',
postal_code: 'short_name'
};
                   
var destinationForm = {
street_name: '',
city: '',
region: '',
country: '',
postal_code: ''
};
/*
var componentForm = {
street_name: 'street_name'

};
*/


// Create the autocomplete object, restricting the search to geographical
// location types.
autocomplete = new google.maps.places.Autocomplete(/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),{types: ['geocode']});


pickupAddressInputAutocomplete = new google.maps.places.Autocomplete(/** @type {!HTMLInputElement} */(document.getElementById('pickupAddressInputAutocomplete')),{types: ['geocode']});



// When the user selects an address from the dropdown, populate the address
// fields in the form.
autocomplete.addListener('place_changed', fillInAddress);

pickupAddressInputAutocomplete.addListener('place_changed', autocompletePickupAddress);

// $('#street_name').val('yo');

function autocompletePickupAddress() {
// Get the place details from the autocomplete object.
    console.log("inside fill in address");
    var place = pickupAddressInputAutocomplete.getPlace();

    for (var component in componentForm) {
    console.log("yo");
    //document.getElementById(component).value = '';
    //document.getElementById(component).disabled = false;
    }

                   
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    
    for (var i = 0; i < place.address_components.length; i++)
    {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType])
    {
        var val = place.address_components[i][componentForm[addressType]];
        if(i == 0)
       {
                   destinationForm.street_number = val;
                   
       }
       else if(i == 1)
       {
       
                   destinationForm.street_number = destinationForm.street_number + val;
                   
       }
       else if(i == 2)
       {
       
                   destinationForm.city = val;
                   
       }
       else if(i == 3)
       {
       
                   destinationForm.region = val;
       
       }
       else if(i == 4)
       {
       
           destinationForm.country = val;
       
       }
       else if(i == 5)
       {
       
           destinationForm.postal_code = val;
       
       }
        
        console.log("address " + addressType + " " + val);

    }                   
                   
    }
   
}

function fillInAddress() {
// Get the place details from the autocomplete object.
    console.log("inside fill in address");
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
    console.log("yo");
    //document.getElementById(component).value = '';
    //document.getElementById(component).disabled = false;
    }

                   
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    
    for (var i = 0; i < place.address_components.length; i++)
    {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType])
    {
        var val = place.address_components[i][componentForm[addressType]];
        if(i == 0)
       {
                   destinationForm.street_number = val;
                   
       }
       else if(i == 1)
       {
       
                   destinationForm.street_number = destinationForm.street_number + val;
                   
       }
       else if(i == 2)
       {
       
                   destinationForm.city = val;
                   
       }
       else if(i == 3)
       {
       
                   destinationForm.region = val;
       
       }
       else if(i == 4)
       {
       
           destinationForm.country = val;
       
       }
       else if(i == 5)
       {
       
           destinationForm.postal_code = val;
       
       }
        
        console.log("address " + addressType + " " + val);

    //document.getElementById(addressType).value = val;
    }
                   
                   
    }

    
    
}
                                      
$scope.$watch('search.model', function(newVal, oldVal)
{
              
    console.log("Search was changed to:"+newVal);
    $scope.search.watch = newVal;
    console.log("component form" + componentForm);
              
});


$scope.findShippersButtonPressed = function(shippingForm)
{


    var geocoder = new google.maps.Geocoder();

   if (navigator.geolocation) 
   {

      navigator.geolocation.getCurrentPosition(function (p) 
      {
      
        var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        console.log("current location" + LatLng);
        console.log("geocoder" + geocoder);
          //var address = document.getElementById("address").value;
        //var address = "new york";
        //var address = "1600 Amphitheatre Parkway, Mountain View, CA"
        var address = shippingForm.address + ' , ' + shippingForm.city + ' ' + shippingForm.country;
        console.log("address" + address);
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {

          console.log("destination cooridnates" + results[0].geometry.location.lat() + results[0].geometry.location.lng());
          var destinationLatitude = results[0].geometry.location.lat();
          var destinationLongitude = results[0].geometry.location.lng();

          var destinationGeoPoint = new Parse.GeoPoint({latitude: destinationLatitude, longitude: destinationLongitude});

          var ShipperTravelRoutes = Parse.Object.extend("ShipperTravelRoutes");
          var shipperTravelRoutesObject = new ShipperTravelRoutes();

          shipperTravelRoutesObject.set("user", currentUser);
          shipperTravelRoutesObject.set("destinationGeoPoint", destinationGeoPoint);

          shipperTravelRoutesObject.save(null, {
            success: function(shipperTravelRoutesObject) {
              // Execute any logic that should take place after the object is saved.
              alert('New object created with objectId: ' + shipperTravelRoutesObject.id);
              ngDialog.open({ template: '/html/listOfCouriers.html',
                controller: 'homeController' 
              });

            },
            error: function(shipperTravelRoutesObject, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              alert('Failed to create new object, with error code: ' + error.message);
            }
            });


            }
        });

      });

    } 
    else 
    {

      alert('Geo Location feature is not supported in this browser.');

    }


}
                   
                   


});


//
/*
mainApp.controller('StudentController', function($scope) {
    $scope.students = [
        {name: 'Mark Waugh', city:'New York'},
        {name: 'Steve Jonathan', city:'London'},
        {name: 'John Marcus', city:'Paris'}
    ];
 
    $scope.message = "Click on the hyper link to view the students list.";
*/
//});