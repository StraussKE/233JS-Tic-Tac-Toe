// start with these global variables
var xIsNext = true;
var winner = null;
var squares = Array(9).fill(null);
var winningLine = Array();
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

function init()
{
    // Add an onclick handler to all of the squares
    // The name attribute for all of the divs is square
    // Use the function handleClick to handle the event 

    var myBoard = document.getElementsByName("square");
    squares = Array.from(myBoard);
    for (let i = 0; i < 9; i++) {
        squares[i].onclick = handleClick;
    }
    
}

function handleClick() {

    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    var clicked = this.id;

    // Set the element in the squares array to the player's symbol
    // Update the inner html for this square in the UI
    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
    // Update the variable xIsNext
    if (xIsNext) {
        this.innerHTML = 'X';
        squares[clicked] = 'X';
        xIsNext = false;
    }
    else {
        this.innerHTML = 'Y';
        squares[clicked] = 'Y';
        xIsNext = true;
    }

    this.onclick = null;

    // If calculateWinner returns true
    // highlight the winner and disable all of the squares
        // highlight winner function indicates that all squares should be disabled within it, not doing it here as well - Katie
    // otherwise update the status in the UI to display the player
    if (calculateWinner()) {
        highlightWinner();
        disableAll();
    }
    else {
        document.getElementById("status").innerHTML = 'Next Player: Y';
        if (xIsNext) {
            document.getElementById("status").innerHTML = 'Next Player: X';
        }
    }
}

function calculateWinner() {
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];       
        if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    winner = null;
    winningLine = Array();
    return false;
}


function highlightWinner() {

    // Update the status in the UI to display the winner
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    //      get the next square using the current index in the winningLine array as the id
    //      add the class red to the square
    if (xIsNext) {
        document.getElementById("status").innerHTML = 'Winner is: Y';
    }
    else {
        document.getElementById("status").innerHTML = 'Winner is: X';
    }

    for (let i = 0; i < 3; i++) {
        document.getElementById(winningLine[i]).className += ' red'; // I now understand how to do multiple classes and successfully use bootstrap
    }
    
}

function disableAll() {

    // Set the onclick handler for all squares to function that does nothing
    // The id of the square is a number 0 - 8
    for (let i = 0; i < 9; i++) {
        squares[i].onclick = null;
    }
}

// When the page has finished loading, call the function init    
window.onload = init;