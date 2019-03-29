var validAlphabets = new Set(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
    "u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T", 
    "U","V","W","X","Y","Z"]); 
var validNums = new Set(["0","1","2","3","4","5","6","7","8","9"]);
var validPuncs = new Set(["#",";","'","?","!",":","-",","," ", "."])



function printBraille() {
    var input = document.getElementById('myTextArea').value;
    console.log(input);
    // check if the input is valid
    var isNum = false;
    var sum = 0;
    if (input.length == 0) {
        document.getElementById('modalTitle').innerHTML = "Submission Failed!";
        document.getElementById('modalBody').innerHTML = "Empty input";
        return;
    } 
    for (var i=0; i<input.length; i++) {
        if(!validAlphabets.has(input[i]) && !validNums.has(input[i]) && !validPuncs.has(input[i]) && input[i]!=" "){
            document.getElementById('modalTitle').innerHTML = "Submission Failed!";
            document.getElementById('modalBody').innerHTML = "Invalid Input: ' ".concat(input[i], " '", '.');
            return;
        }
        if(validNums.has(input[i]) && isNum == false) {
            sum++;
            isNum = true;
            console.log("true");
        }
        
        if(!validNums.has(input[i]) && isNum == true) {
            if (input[i]!=" "){
                sum++;
            }
            isNum = false;
            console.log("false");
        }
        sum++;
    }


    if (sum > 52) {
        document.getElementById('modalTitle').innerHTML = "Submission Failed!";
        document.getElementById('modalBody').innerHTML = "Exceeded max characters allowed by ".concat(sum-52, " characters.");
        return;
    } 

    // disable button and display note to user
    document.getElementById('modalTitle').innerHTML = "Submission Successful!";
    document.getElementById('modalBody').innerHTML = "Printing in progress...";
    document.getElementById('remind').innerHTML = "(Printing in progress... You can resubmit after the robot finishes printing)";
    $('button').prop('disabled', true);
    console.log(sum);

    // send request to server
    // $.ajax({
    //     type:"POST",
    //     contentType: "application/json;charset=utf-8",
    //     url:"/getText",
    //     traditional: "true",
    //     data: JSON.stringify({input}),
    //     dataType: "json"
    // })

}

$(document).ready(function loadText() {
    // $.ajax({
    //     type:"GET",
    //     url:"/updateText",
    //     dataType:"json",
    //     async:false,
    //     success: function(data){
    //         text = data;
    //         updateText(text)
    //     },
    //     complete: function(){
    //         setTimeout(loadText, 1000);
    //     }
    // })


});

function updateText(text) {
    console.log(text)
    document.getElementById('textFromKeypad').innerHTML = text;
}

$(document).ready(function buttonStatus() {
    $.ajax({
        type:"GET",
        url:"/printerStatus",
        dataType:"json",
        async:false,
        success: function(printerBusy){
            if (printerBusy == true)
                disableSubmit()
            else
                enableSubmit()

        },
        complete: function(){
            setTimeout(buttonStatus, 500);
        }
    })

});

function disableSubmit() {
    // disable button and display note to user
    document.getElementById('modalTitle').innerHTML = "Submission Successful!";
    document.getElementById('modalBody').innerHTML = "Printing in progress...";
    document.getElementById('remind').innerHTML = "(Printing in progress... You can resubmit after the robot finishes printing)";
    $("#submit").prop('disabled', true);
}

function enableSubmit() {
    $("#submit").prop('disabled', false);
    document.getElementById('remind').innerHTML = "(Printer is Idle... Ready for Submission...)";
}





