//Ready document
$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDFIfZZcOntbvkq2aJ732z1j8rHaU-qAE8",
        authDomain: "schedjmoowal.firebaseapp.com",
        databaseURL: "https://schedjmoowal.firebaseio.com",
        projectId: "schedjmoowal",
        storageBucket: "schedjmoowal.appspot.com",
        messagingSenderId: "12930270687"
    };

    window.firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    database.ref().on("value", function(snapshot) {
        // Capture Button Click
        $("#add-user").on("click", function(event) {
            // prevent form from trying to submit/refresh the page
            event.preventDefault();

            // Capture User Inputs and store them into variables
            var train = $("#train-input").val().trim();
            var destination = $("#destination-input").val().trim();
            var arrival = $("#arrival-input").val().trim();
            var frequency = $("#frequency-input").val().trim();

            // Console log each of the user inputs to confirm we are receiving them
            console.log(train);
            console.log(destination);
            console.log(arrival);
            console.log(frequency);

            // Output all of the new information into the relevant HTML sections
            $("#train-display").text(train);
            $("#destination-display").text(destination);
            $("#arrival-display").text(arrival);
            $("#frequency-display").text(frequency);

        });

        //Clear Storage
        localStorage.clear();

        //Store all content into localStorage
        var storageArray = ["train", "destination", "arrival", "frequency"];
        for (var i = 0; i < storageArray.length; i++) {
            localStorage.setItem(storageArray[i], $(`#${storageArray[i]}-input`).val().trim());
        }

        // localStorage.setItem("train", train);
        // localStorage.setItem("destination", destination);
        // localStorage.setItem("arrival", arrival);
        // localStorage.setItem("frequency", frequency);
    });

    //Store all content into the localStorage
    var storageGetArray = ["train", "arrival", "age", "frequency"];
    for (var i = 0; i < storageGetArray.length; ++i) {
        $(`#${storageGetArray[i]}-display`).text(localStorage.getItem(`${storageGetArray[i]}`));
    }
    // $("#train-display").text(localStorage.getItem("train"))
    // $("#arrival-display").text(localStorage.getItem("arrival"))
    // $("#age-display").text(localStorage.getItem("age"))
    // $("#frequency-display").text(localStorage.getItem("frequency"));
})