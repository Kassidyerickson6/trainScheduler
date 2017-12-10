$(document).ready(function(){
  // Link to Firebase
  var trainData = new Firebase("https://train-scheduler-45f2e.firebaseio.com/");


  $("#add-train").on("click", function(){


    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    // Creates local "temporary" object for holding train data
    // Will push this to firebase
    var newTrain = {
     name:trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency,
    }

    // pushing trainInfo to Firebase
    trainData.push(newTrain);

    // clear text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    // Prevents page from refreshing
    return false;
  });

  trainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // assign firebase variables to snapshots.
    var firebaseName = childSnapshot.val().name;
    var firebaseDestination = childSnapshot.val().destination;
    var firebaseTrainTimeInput = childSnapshot.val().trainTime;
    var firebaseFrequency = childSnapshot.val().frequency;
    
    var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
    var minutes = firebaseFrequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
    
    // Test for correct times and info
    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("hh:mm A"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));

    // Append train info to table on page
    $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

  });
});