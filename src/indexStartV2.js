// Create a class called TTT
class TTT
{
    /*
        Add a constructor that 
        -   defines and initializes all variables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */
    constructor() {
        this.xIsNext = true;
        this.winner = null;
        this.squares = Array(9).fill(null);
        this.winningLine = Array();
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        this.init.bind(this);
        this.calculateWinner.bind(this);
        this.highlightWinner.bind(this);
        this.disableAll.bind(this);

        this.init();
    }

    /*
        Convert each function to a method
        -   move it inside the class
        -   remove the keyword function
        -   add this to all of the variables that belong to the class
        -   change var to let or const for local variables
        -   add this to all method calls
     
        Init
        -   bind both this and i to handleClick
            -   this.handleClick.bind(this, i);
    */
    init()
    {

        let myBoard = document.getElementsByName("square");
        this.squares = Array.from(myBoard);
        for (let i = 0; i < 9; i++) {
            this.squares[i].onclick = this.handleClick.bind(this, i);
        }

    }



    /*
        CalculateWinner
        -   use destructuring assingment to assign values to
            a b and c in one line
    */

    calculateWinner() {
        let lines = this.lines;
        let squares = this.squares;
        for (let i = 0; i < lines.length; i++) {
            let a = lines[i][0];
            let b = lines[i][1];
            let c = lines[i][2];
            if (squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]) {
                this.winner = squares[a];
                this.winningLine = lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }


    /*
        HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local variable i
        -   add a local variable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8
    */
    handleClick(clicked) {


        if (this.xIsNext) {
            document.getElementById(clicked).innerHTML = 'X';
            this.squares[clicked] = 'X';
            this.xIsNext = false;
        }
        else {
            document.getElementById(clicked).innerHTML = 'Y';
            this.squares[clicked] = 'Y';
            this.xIsNext = true;
        }

        this.squares[clicked].onclick = null;

        if (this.calculateWinner()) {
            this.highlightWinner();
            this.disableAll();
        }
        else {
            document.getElementById("status").innerHTML = 'Next Player: Y';
            if (this.xIsNext) {
                document.getElementById("status").innerHTML = 'Next Player: X';
            }
        }
    }

    /*
    Update the status in the UI to display the winner
    Iterate through the winningLine array.  It contains the indices of the winning squares
         get the next square using the current index in the winningLine array as the id
         add the class red to the square
    */
    highlightWinner() {    
        if (this.xIsNext) {
            document.getElementById("status").innerHTML = 'Winner is: Y';
        }
        else {
            document.getElementById("status").innerHTML = 'Winner is: X';
        }

        for (let i = 0; i < 3; i++) {
            document.getElementById(this.winningLine[i]).className += ' red';
        }   
    }

    disableAll() {

        // Set the onclick handler for all squares to function that does nothing
        // The id of the square is a number 0 - 8
        for (let i = 0; i < 9; i++) {
            this.squares[i].onclick = null;
        }
    }
}

// declare a variable ttt
let ttt;
// add an onload handler to the window that assigns ttt to a TTT
window.onload = () => { ttt = new TTT(); };