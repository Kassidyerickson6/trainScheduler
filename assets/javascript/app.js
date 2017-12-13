// The page runs once the DOM is ready for Javascript
$(document).ready(function(){
  // This links to firebase
  var Data = new Firebase("https://train-scheduler-45f2e.firebaseio.com/");

// button for adding a train
  $("#add-train").on("click", function(){

// variables created for user input
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequency = $("#frequency-input").val().trim();

//logs the name, destination, time, and frequency in the console
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

// pushing this information to firebase
    var newTrain = {
     name:trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency,
    }

    Data.push(newTrain);

    // clears the text-boxes and sets empty strings
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    // Keeps the current input information on the page
    return false;
  });

//function created with selector for childSnapshot
// child_added retrieves a list of items from the database
  Data.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // firebase variables attached to the snapshots
    var fbName = childSnapshot.val().name;
    var fbDestination = childSnapshot.val().destination;
    var fbTime = childSnapshot.val().trainTime;
    var fbFrequency = childSnapshot.val().frequency;

    // moment.js
    //.diff difference
    // unix timestamp
    var diffTime = moment().diff(moment.unix(fbTime), "minutes");
    var timeRemainder = moment().diff(moment.unix(fbTime), "minutes") % fbFrequency ;
    var minutes = fbFrequency - timeRemainder;

    var nextArrival = moment().add(minutes, "m").format("hh:mm A"); 
    
    
    console.log(minutes);
    console.log(nextArrival);
    console.log(moment().format("hh:mm A"));
    console.log(nextArrival);
    console.log(moment().format("X"));

    // train info is appended to the page
    $("#trainTable > tbody").append("<tr><td>" 
      + fbName + "</td><td>" + fbDestination + "</td><td>" 
      + fbFrequency + " mins" + "</td><td>" 
      + nextArrival + "</td><td>" + minutes + "</td></tr>");

  });
});


