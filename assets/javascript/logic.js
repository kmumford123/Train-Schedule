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

    database.ref("/newtrainData").on("value", function(snapchat) {

        snapchat.forEach(function(child) {
            var html = `
                <tr "recent-member">;
                    <td class="trainName">${child.val().trainName}</td>
                    <td class="trainDest">${child.val().trainDest}</td>
                    <td class="Arrival">${child.val().arrivalTime}</td>
                    <td class="TrainFreq">${child.val().trainFreq}</td>
                </tr>
            `;
            $(".new-train-display").append(html);
            // $(".trainDest").append(child.val().trainDest);
            // $(".arrivalTime").append(child.val().arrivalTime);
            // $(".trainFreq").append(child.val().trainFreq);

            //firebase data populating but not formulating.
            //different data keys stored in firebase database
            //will work to appropriately format values.


        });

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $("#add-newTrain").on("click", function(event) {
        event.preventDefault();

        // Get the input values
        var dbtrain = $("#train-input").val().trim();
        var dbdestination = $("#destination-input").val().trim();
        var dbarrival = $("#arrival-input").val().trim();
        var dbfrequency = $("#frequency-input").val().trim();

        // Save the new table values in Firebase
        database.ref("/newtrainData").push({
            trainName: dbtrain,
            trainDest: dbdestination,
            arrivalTime: dbarrival,
            trainFreq: dbfrequency
        });


    });
});