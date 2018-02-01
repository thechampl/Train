

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


  var now = moment();
  var currentTime= now._d.toTimeString();
  var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years")
  var diffTime= moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
 var tMinutesTillTrain = frequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  
  

  // Global Variables
  var trainName;
  var destination;
  var trainTime;
  var frequency;

 
 
// Database listens for a change
   database.ref().on("child_added", function (snapshot){   
   var tableBody = $("#trainTable");
   var snapshot = snapshot.val();
   var row = $("<tr>");
   var columns = $('<td>' + snapshot.name + '</td><td>' + snapshot.location + '</td><td>' + snapshot.speed + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td>')
   $(row).append(columns);
   $(tableBody).append(row);
    trainName= snapshot.val().name;
    destination= snapshot.val().location;
    trainTime= snapshot.val().time;
    frequency= snapshot.val().speed;
    



      
        
   
// Error function
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });



// On button click
$("#addtrain").on("click", function (event){
  event.preventDefault();
  trainName= $("#trainName").val();
  destination=$("#destination").val()
  trainTime=$("#trainTime").val();
  frequency=$("#frequency").val();
 
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  console.log("DIFFERENCE IN TIME: " + diffTime);
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Pushes data from form to database
  database.ref().push({
    name: trainName,
    location: destination,
    originaltime: trainTime,
    speed: frequency,
    

    
  });

 
});





  