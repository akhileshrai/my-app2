/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var start_lat = '';
var start_lng = '';
var start_place = '';
var end_place = '';
var end_lat = '';
var end_lng = '';

var map = '';
var mapOptions = '';
var dist = 0;

var modeTravel = 'auto'; //auto or meru
var myRoute = '';



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        initializeMap();
        console.log('Received Event: ' + id);
    }
};

function initializeMap() {

	//navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 10000, enableHighAccuracy: true });  
	start_autocomplete = new google.maps.places.Autocomplete(
     	/** @type {HTMLInputElement} */(document.getElementById('start_loc'))
      		//{ types: ['geocode'] } //Avoiding so you get all places in drop down
      		);
    end_autocomplete = new google.maps.places.Autocomplete(
     	/** @type {HTMLInputElement} */(document.getElementById('end_loc')) 
      		//{ types: ['geocode'] } //Avoiding so you get all places in drop down
      		);
    
  	// When the user selects an address from the dropdown, populate the address fields in the form.
  	google.maps.event.addListener(start_autocomplete, 'place_changed', function() {
    	changeMap();}
    	); 
    google.maps.event.addListener(end_autocomplete, 'place_changed', function() {
    	changeMap();}
    	); 
    document.getElementById("auto").addEventListener("click", function() {
    	reCalc("auto");
    	});
	document.getElementById("meru").addEventListener("click", function() {
    	reCalc("meru");
    	});
};

function changeMap() {
	start_place = start_autocomplete.getPlace();
	end_place = end_autocomplete.getPlace();
	start_lat = start_place.geometry.location.lat();
	start_lng = start_place.geometry.location.lng();
	end_lat = end_place.geometry.location.lat();
	end_lng = end_place.geometry.location.lng();
	//var end_latlng = (end_lat, end_lng);
	var start_latlng = new google.maps.LatLng(start_lat, start_lng);
	var end_latlng = new google.maps.LatLng(end_lat, end_lng);

	//start_autocomplete.set('place', end_latlng);
	mapOptions = {
		center: new google.maps.LatLng(start_lat, start_lng),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
    logError("Starting");
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var directionsService = new google.maps.DirectionsService();
    var directionDisplay;
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
 
	var request = {
    	origin:start_latlng,
    	destination:end_latlng,
    	travelMode: google.maps.TravelMode.DRIVING
  	};
  	directionsService.route(request, function(result, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		directionsDisplay.setDirections(result);
      		myRoute = result.routes[0].legs[0];
  			dist = myRoute.distance.value/1000;
      		updateFare();
			
    	}
  	});

}

function updateFare () {
	logError('hi'+ myRoute.distance.value/1000);
   	var resultDist = document.getElementById("resultDist");
	resultDist.innerHTML = "Distance: " + myRoute.distance.text;
	var resultFare = document.getElementById("resultFare");
	resultFare.innerHTML = calcFare();
}
function logError(msg) {
    //var s = document.getElementById("debug");
    //s.value += msg;
}
function reCalc(transport) {
	document.getElementById(modeTravel).className = "passive";
	modeTravel = transport;
	document.getElementById(modeTravel).className = "active";
	//calcFare();
	updateFare();
	logError(transport);
}

function calcFare(){
	if (modeTravel == "auto") {
		fare = calcMatrix(1.9, 25, 13)
	}
	if (modeTravel == "meru") {
		fare = calcMatrix(4, 80, 19.50)
	}
	return fare;
}
function calcMatrix(minDist, minFare, unitFare){
	if (dist<=minDist) {
		fare = minFare;
	}
	else fare = dist*unitFare;
	fare = "Fare: Rs. " + fare;
	return fare;
}

var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    start_lat = position.coords.latitude;
    start_lng = position.coords.longitude;
	mapOptions = {
		center: new google.maps.LatLng(start_lat, start_lng),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

};

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
