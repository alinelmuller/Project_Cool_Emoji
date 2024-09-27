// Player Infomation
const player1 = " "
const player2 = " "

// Board Size
const boardSize = {
    "3x3": [3, 3],
    "4x4": [4, 4],
    "6x3": [6, 3],
    "8x4": [8, 4]
};
let selectBoardsize = boardSize

// Player Turns
let turn = true  // if player1 or player2 
let scorePlayer1 = 0
let scroreplayer2 = 0

//Cards
let cards = []
let flippedCards = []
let unFlippedCards = []
let checkCards = "" // boolian: true or false

// Check Winner
let winner = "" // player1 or player2 


// FUNCTIONS //

function buildDeck () { /*check selectBoardsize and build it*/ } 
function turns () { /*return player*/ } 
function checkCards (){ /*return winner or keepPlaying*/ } 
function resetGame () { }
function playAgain () { }







