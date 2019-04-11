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


    /*
        HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local variable i
        -   add a local variable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8
    */
    handleClick(i) {

        let clicked = i;

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
}

// declare a variable ttt
let ttt;
// add an onload handler to the window that assigns ttt to a TTT
window.onload = () => { ttt = new TTT(); };