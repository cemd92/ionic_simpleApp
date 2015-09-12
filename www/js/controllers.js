angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
/*
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
*/
  $scope.addUser = function() {

    var alertPopup = $ionicPopup.alert({
     title: 'Success!',
     template: 'User registered.'
   });

    $timeout(function() {

      $state.go('app.login');
      
    }, 1000);
  };

  $scope.gotoRegister = function() {
    $timeout(function() {

      $state.go('app.register');
      
    }, 1000);
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {

      $state.go('app.dash');
      
    }, 1000);
  };
})


.controller('DashCtrl', function($scope, $stateParams, $filter, $cordovaDevice) {

  console.log($scope.loginData);

  $scope.u = {text : $scope.loginData.username};
  $scope.p = {text : $scope.loginData.password};
  $scope.date = new Date();
  //$scope.d = $cordovaDevice.getPlatform();

/*
  var device = $cordovaDevice.getDevice();
 
  $scope.manufacturer = device.manufacturer;
  $scope.model = device.model;
  $scope.platform = device.platform;
  $scope.uuid = device.uuid;
*/
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('contactsCtrl', function($scope, $cordovaContacts){



  $scope.getContacts = function() {
    $scope.phoneContacts = [];
  };

  function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
    };
    function onError(contactError) {
      alert(contactError);
    };
    var options = {};
    options.multiple = true;
    $cordovaContacts.find(options).then(onSuccess, onError);
  
})


.controller('MapCtrl', function($scope, $ionicLoading) {

  $scope.positions = [{
    lat: 40.963978,
    lng: 29.0655593
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){

    $ionicLoading.show({
      template: 'Loading...'
    });


    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.positions.push({lat: pos.k,lng: pos.B});
      console.log(pos);
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });

  };

})





.controller('DateCtrl', function($scope, $stateParams) {

  var disabledDates = [];
    var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    var datePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    $scope.select = val;
    console.log('Selected date is : ', val)
  }
};

  $scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2100, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };

    




});