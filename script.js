document.getElementById("secondBox").style.display = "none"
document.getElementById("winnerBox").style.display = "none" 
let buttonPlay = document.querySelector("#buttonPlay")
let buttonNewGame = document.getElementById("buttonNewGame")
let buttonNewGameWinner = document.getElementById("buttonNewGameWinner")
let buttonReset = document.getElementById("buttonReset")
let buttonPlayAgain = document.getElementById("buttonPlayAgain")
let clickCount = 0
let player1Clicks = []
let player2Clicks = []
let currentPlayer = 1
let scoreP1 = 0
let scoreP2 = 0
let player1, player2
let rows, cols    
let gameSize = document.querySelector("#gameSize").value 

buttonPlay.addEventListener('click', () => {
    player1 = document.querySelector("#player1").value || ('Player 1')
    player2 = document.querySelector("#player2").value || ('Player 2')


    document.getElementById("firstBox").style.display = "none" 
    document.getElementById("secondBox").style.display = "block" 
    document.getElementById("player1Name").textContent = player1 
    document.getElementById("player2Name").textContent = player2 
    document.getElementById("currentPlayer").textContent = player1 + (`, it is your turn`)

    buildDeck(gameSize) 
}) 

function buildDeck(gameSize) {
    const board = document.querySelector(".board") 
    board.innerHTML = "" 
   
    switch (gameSize) {
        case "2x3":
            cols = 2  
            rows = 3  
            break 
        case "3x4":
            cols = 3  
            rows = 4  
            break 
        case "4x4":
            cols = 4  
            rows = 4  
            break 
        case "6x8":
            cols = 6  
            rows = 8  
            break 
        case "8x8":
            cols = 8  
            rows = 8  
            break 
        default:
            cols = 2  
            rows = 3 
    }

    const numCards = rows * cols 
    const emojis = createEmojiPairs(numCards) 

    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)` 
    board.style.gridTemplateRows = `repeat(${rows}, 1fr)` 

    for (let i = 0 ; i < numCards; i++) {
        const card = document.createElement('div') 
        card.classList.add('card') 
        card.dataset.value = emojis[i] 

        const emojiSpan = document.createElement('span') 
        emojiSpan.textContent = emojis[i] 
        emojiSpan.style.visibility = 'hidden' 

        card.appendChild(emojiSpan) 

        card.addEventListener('click', () => cardClicked(card, emojiSpan)) 

        board.appendChild(card) 
    }
}

function flipCard(card, emojiSpan) {
    card.classList.toggle('flipped') 
    console.log(emojiSpan.textContent) 
}

let flippedCards = []

function cardClicked(card, emojiSpan) {
    if (!card.classList.contains('flipped')) {
        emojiSpan.style.visibility = 'visible' 
        flipCard(card, emojiSpan) 

        flippedCards.push({
            card: card,
            emojiSpan: emojiSpan,
            emoji: emojiSpan.textContent
        })
        clickCount ++

        if (clickCount === 2){
            let firstCard = flippedCards[0]
            let secondCard = flippedCards[1]

            if (firstCard.emoji === secondCard.emoji){
                flippedCards = []
                clickCount = 0

                if (currentPlayer === 1) {
                    scoreP1++
                    document.getElementById("scoreP1").textContent = scoreP1
                } else {
                    scoreP2++;
                    document.getElementById("scoreP2").textContent = scoreP2
                }
                switchPlayer()  
            } else {
                setTimeout(() => {
                    firstCard.card.classList.remove('flipped')
                    secondCard.card.classList.remove('flipped')
                    flippedCards = []
                    clickCount = 0
                    switchPlayer() 
                }, 800);
            }
        } 
    }
}

function switchPlayer() { 
    if (currentPlayer === 1) {
        currentPlayer = 2
    } else {
        currentPlayer = 1
    }
    let currentPlayerName = (currentPlayer === 1) ? player1 : player2
        
    if (checkWinner()) {
        document.getElementById("currentPlayer").textContent = declareWinner()
    } else{
        document.getElementById("currentPlayer").textContent = (`${currentPlayerName} , it is your turn`) 
    }
}

function checkWinner() {
    let flippedCards = document.querySelectorAll(".card.flipped")
    let totalCards = document.querySelectorAll(".card").length
    return flippedCards.length === totalCards
}

function declareWinner() {
    document.getElementById("firstBox").style.display = "none" 
    document.getElementById("secondBox").style.display = "none"
    document.getElementById("winnerBox").style.display = "block" 
    console.log(scoreP1)
    console.log(scoreP2)
    if (scoreP1 > scoreP2) {
        document.getElementById('winnersName').textContent = player1
    } else if (scoreP2 > scoreP1) {
        document.getElementById('winnersName').textContent = player2
    } else {
       document.getElementById('currentPlayer').textContent = ("It's a tie!")
    }
}

function createEmojiPairs(numCards) {
    //Fisher-Yates Shuffle
    const shuffle = (array) => {
        let oldElement;
        for (let i = array.length - 1; i > 0; i--) {
          let rand = Math.floor(Math.random() * (i + 1));
          oldElement = array[i];
          array[i] = array[rand];
          array[rand] = oldElement;
        }
        return array;
    } 

    const emojiList = [
        '😀', '😂', '😎', '😍', '😜', '😱', '🤔', '😇', '🥳', '🥶', '🤠', '😈',
        '👻', '💀', '🤖', '👽', '😺', '🙈', '🙉', '🙊', '🐶', '🐱', '🐭', '🐹',
        '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦄',
        '🐝', '🐢', '🐍', '🐙', '🦑', '🦀', '🦞', '🐡', '🐬', '🐳', '🦋', '🐌',
        '🌞', '🌝', '🌚', '🌍', '🌈', '🌟', '🔥', '💧', '🌪️', '🌊', '🪐', '⚡',
        '🎃', '🎄', '🎁', '🎉', '🎈', '🎶', '🎵', '🎧', '🎮', '🎲', '🏆', '🎯',
        '🍎', '🍊', '🍉', '🍓', '🍒', '🍌', '🍍', '🍇', '🍔', '🍕', '🍟', '🍩',
        '🍦', '🍫', '🍿', '🍪', '🍭', '🧁', '🥨', '🍻', '🥂', '🍷', '🍸', '🍹'
    ] 

   shuffle(emojiList)

    let emojis = [] 
    const numPairs = numCards / 2 
   
    for (let i = 0; i < numPairs; i++) {
        emojis.push(emojiList[i]) 
        emojis.push(emojiList[i]) 
    }
    return shuffle(emojis)   
 }

 let reloadPage = function (){
    location.reload();
 }
 
 let samePlayers = function (){
   // let numCard = rows * cols 
   buildDeck(gameSize) 
    
    document.getElementById("firstBox").style.display = "none" 
    document.getElementById("secondBox").style.display = "block"
    document.getElementById("winnerBox").style.display = "none" 
    
    clickCount = 0
    player1Clicks = []
    player2Clicks = []
    currentPlayer = 1
    scoreP1 = 0
    scoreP2 = 0
    const cards = document.getElementsByClassName("card") 
    document.getElementById("scoreP1").textContent = scoreP1
    document.getElementById("scoreP2").textContent = scoreP2
    for (let card of cards) {
        card.classList.remove('flipped') 
    }
    
 }

buttonNewGame.addEventListener('click', reloadPage) 
buttonNewGameWinner.addEventListener('click', reloadPage) 
buttonReset.addEventListener('click', samePlayers) 
buttonPlayAgain.addEventListener('click', samePlayers) 
