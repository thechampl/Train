

  // Initialize Firebase
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

  var trainName;
  var destination;
  var trainTime;
  var frequency;

   database.ref().on("value", function (snapshot){
     trainName= snapshot.val().name;
     destination= snapshot.val().location;
     trainTime= snapshot.val().time;
     frequency= snapshot.val().speed;

     $("#trainName").text(trainName);
     $("#destination").text(destination);
     $("#trainTime").text(trainTime);
     $("frequency").text(frequency);

     console.log(trainName);
     console.log(destination);
     console.log(trainTime);
     console.log(frequency);
   

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });




$("#addtrain").on("click", function (event){
  event.preventDefault();
  trainName= $("#trainName").val();
  destination=$("#destination").val()
  trainTime=$("#trainTime").val();
  frequency=$("#frequency").val();

  // database.ref().set({
  //   name: trainName,
  //   location: destination,
  //   time: trainTime,
  //   speed: frequency

  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);
});


// });


 


  // }



  