/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/
$('#myForm').submit((event) => {
    event.preventDefault();
    let input = $('#arrays').val().trim();
    if (input.length !== 0) {
        let flag = true;
        $('#error').hide();
        if (!input.includes('[') || !input.includes(']') || input.includes('.')) {
            $('#error').show();
            $('#error').html('You must enter valid input array!');
            $('#myForm').trigger('reset');
            $('#arrays').focus();
            flag = false;
        }
        input = input.replaceAll(" ", "");
        input = input.replaceAll("],", "");
        input = input.replace("]", "");
        input = input.replaceAll("[", ",");
        input = input.substring(1, input.length);
        const sArray = input.split(",");
        const nArray = [];
        for (const temp of sArray) {
            nArray.push(parseInt(temp));
        }
        for (const temp of nArray) {
            if (isNaN(temp)) {
                $('#error').show();
                $('#error').html('You must enter valid input array!');
                $('#myForm').trigger('reset');
                $('#arrays').focus();
                flag = false;
            }
        }
        if (flag) {
            nArray.sort(function (a, b) {
                return a - b
            });
            let ulLength = $("#results li").length;
            let li;
            if (ulLength === 0 || ulLength % 2 === 0) {
                li = `<li class="is-green">[${nArray}]</li>`;

            } else {
                li = `<li class="is-red">[${nArray}]</li>`;
            }
            $('#results').append(li);
            $('#results').append();
            $('#myForm').trigger('reset');
            $('#arrays').focus();

        }
    } else {
        $('#error').show();
        $('#error').html('You must enter an input!');
        $('#arrays').focus();
    }
});