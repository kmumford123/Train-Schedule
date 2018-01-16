// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFIfZZcOntbvkq2aJ732z1j8rHaU-qAE8",
    authDomain: "schedjmoowal.firebaseapp.com",
    databaseURL: "https://schedjmoowal.firebaseio.com",
    projectId: "schedjmoowal",
    storageBucket: "schedjmoowal.appspot.com",
    messagingSenderId: "12930270687"
};

firebase.initializeApp(config);

//Ready document
$(document).ready(function() {

    // Create a variable to reference the database
    var database = firebase.database();

    var connectionsRef = database.ref("/connections");

    // '.info/connected' is a special location provided by Firebase that is updated
    // every time the client's connection state changes.
    // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
    var connectedRef = database.ref(".info/connected");

    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {

        // If they are connected..
        if (snap.val()) {

            // Add user to the connections list.
            var con = connectionsRef.push(true);
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });

    // When first loaded or when the connections list changes...
    connectionsRef.on("value", function(snap) {

        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
        $("#connected-viewers").text(snap.numChildren());
    });

    // Initial Values
    var inTrain = "No train Selected"
    var inDestination = "Destination"
    var inArrival = "00:00:00 AM/PM"
    var inFrequency = "ASAP"

    database.ref("/trainData").on("value", function(snapchat) {

        //If Firebase has a stored variables (first case)

        if (snapchat.child("train").exists() && snapchat.child("destination").exists() && snapchat.child("arrival").exists() && snapchat.child("frequency").exists()) {

            // Set the local variables equal to the stored values in firebase.
            dbtrain = snapchat.val().train;
            dbdestination = snapchat.val().destination;
            dbarrival = parseInt(snapchat.val().arrival);
            dbfrequency = snapchat.val().frequency;

            $("#train-display").append(dbtrain);
            $("#destination-display").append(dbdestination);
            $("#arrival-display").append(dbarrival);
            $("#frequency-display").append(dbfrequency);

            consol.log(dbtrain);
            consol.log(dbdestination);
        }

        // Else Firebase doesn't have stored variables, so use the initial local values.
        else {

            // Change the HTML to reflect the local value in firebase
            $("#train-display").text(inTrain);
            $("#destination-display").text(inDestination);
            $("#arrival-display").text(inArrival);
            $("#frequency-display").text(inFrequency);

            // Print the local data to the console.
            console.log(inTrain);
            console.log(inArrival);
            console.log(inDestination);
            console.log(inFrequency);
        }

        // If any errors are experienced, log them to console.
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $("#add-newTrain").on("click", function(event) {
        event.preventDefault();

        // Get the input values
        var dbtrain = $("#train-input").val().trim();
        var ddbbdestination = $("#destination-input").val().trim();
        var dbarrival = $("#arrival-input").val().trim();
        var dbfrequency = $("#frequency-input").val().trim();

        console.log(dbtrain);

        // Log the train values
        // console.log(train);
        // console.log(destination);
        // console.log(arrival);
        // console.log(frequency);


        // Save the new price in Firebase
        database.ref("/newtrainData").push({
            trainName: train,
            trainDest: destination,
            arrivalTime: arrival,
            trainFreq: frequency
        });
        console.log(database.ref("/newtraindata"));

        // Log the new High Price
        // console.log(train);
        // console.log(arrival);

        // Change the HTML to reflect the added values
        $("#data").append('<tr><td>' + snapchat.child("train") + '</td><td>' + snapchat.child("destination") + '</td></tr>')

    });
});