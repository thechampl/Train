

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDhwKlUHQkNjNPqMaVc9A0Se5PvMv1JVS4",
  authDomain: "train-ab718.firebaseapp.com",
  databaseURL: "https://train-ab718.firebaseio.com",
  projectId: "train-ab718",
  storageBucket: "train-ab718.appspot.com",
  messagingSenderId: "241738445441"
};
firebase.initializeApp(config);

var database = firebase.database();


// Global Variables
var trainName;
var destination;
var trainTime;
var frequency;
var now;
var currentTime;
var firstTimeConverted;
var diffTime;
var tRemainder;
var tMinutesTillTrain;




 
  

 







// Database listens for a change
database.ref().on("child_added", function (snapshot) {
 

  var tableBody = $("#trainTable");

 
  
  // calculate the difference in time using moment
  now = moment();
  currentTime = now._d.toTimeString();
  trainName = snapshot.val().name;
  destination = snapshot.val().location;
  frequency = snapshot.val().speed;
  trainTime = snapshot.val().originaltime;
  firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(trainTime, "---")
  tRemainder = parseInt(diffTime % frequency);
  tMinutesTillTrain = frequency - tRemainder;
  
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// adding the values to the table
  var snapshot = snapshot.val();
  var row = $("<tr>");
  var columns = $('<td>' + snapshot.name + '</td><td>' + snapshot.location + '</td><td>' + snapshot.speed + '</td><td>' + nextTrain.format("h:mm") + '</td><td>' + tMinutesTillTrain + '</td>')
  $(row).append(columns);
  $(tableBody).append(row);
  



  // Error function
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#clear").on("click", function (event){
  firebase.database().ref().remove();
  $("#trainTable").empty();
});





// On button click
$("#addtrain").on("click", function (event) {
  event.preventDefault();
  trainName = $("#trainName").val();
  destination = $("#destination").val()
  trainTime = $("#trainTime").val();
  frequency = $("#frequency").val();

 

 

  // Pushes data from form to database
  database.ref().push({
    name: trainName,
    location: destination,
    originaltime: trainTime,
    speed: frequency,



  });


});





