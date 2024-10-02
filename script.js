document.getElementById("secondBox").style.display = "none"
let buttonPlay = document.querySelector("#buttonPlay")
let buttonNewGame = document.getElementById("buttonNewGame")
let buttonReset = document.getElementById("buttonReset")
let clickCount = 0
let player1Clicks = []
let player2Clicks = []
let currentPlayer = 1

// Start the game
buttonPlay.addEventListener('click', () => {
    let player1 = document.querySelector("#player1").value
    let player2 = document.querySelector("#player2").value
    let gameSize = document.querySelector("#gameSize").value 

    document.getElementById("firstBox").style.display = "none" 
    document.getElementById("secondBox").style.display = "block" 
    document.getElementById("player1Name").textContent = player1 
    document.getElementById("player2Name").textContent = player2 
    document.getElementById("currentPlayer").textContent = player1 

    buildDeck(gameSize) 
}) 

// Build the game deck
function buildDeck(gameSize) {
    const board = document.querySelector(".board") 
    board.innerHTML = "" 

    let rows = 0, cols = 0 
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

        // console.log(clickCount)

        if (clickCount === 2){
            let firstCard = flippedCards[0]
            let secondCard = flippedCards[1]

            if (firstCard.emoji === secondCard.emoji){
                console.log('they match')
                flippedCards = []
                clickCount = 0
                switchPlayer()  
            } else {
                console.log('NOT match')
               // firstCard.emojiSpan.style.visibility = 'hidden'
              //  secondCard.emojiSpan.style.visibility = 'hidden'
                firstCard.card.classList.remove('flipped')
                secondCard.card.classList.remove('flipped')
                flippedCards = []
                clickCount = 0
                switchPlayer()  
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
    let currentPlayerName = document.querySelector(`#player${currentPlayer}`).value
    document.getElementById("currentPlayer").textContent = currentPlayerName
}




function createEmojiPairs(numCards) {
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
    let emojis = [] 
    const numPairs = numCards / 2 

    for (let i = 0; i < numPairs; i++) {
        emojis.push(emojiList[i]) 
        emojis.push(emojiList[i]) 
    }
    return emojis 
}

buttonNewGame.addEventListener('click', () => {
    document.getElementById("firstBox").style.display = "block" 
    document.getElementById("secondBox").style.display = "none" 
    document.querySelector("#player1").value = '' 
    document.querySelector("#player2").value = '' 
}) 

buttonReset.addEventListener('click', () => {
    const cards = document.getElementsByClassName("card") 
    for (let card of cards) {
        card.classList.remove('flipped') 
    }
}) 
