let buttonPlay = document.querySelector("#buttonPlay")
document.getElementById("secondBox").style.display = "none"

let currentPlayer = 1

// Get player info and game size
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
});

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

    for (let i = 0; i < numCards; i++) {
        const card = document.createElement('div')
        card.classList.add('card')
        card.dataset.value = emojis[i]

        const emojiSpan = document.createElement('span')
        emojiSpan.textContent = emojis[i]
        emojiSpan.style.visibility = 'hidden'

        card.appendChild(emojiSpan)

        card.addEventListener('click', () => {
            emojiSpan.style.visibility = 'visible'
            flipCard(card, emojiSpan)

            console.log(flipCard)
        });

        board.appendChild(card)
    }
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
    ];
    let emojis = [];
    const numPairs = numCards / 2;

    for (let i = 0; i < numPairs; i++) {
        emojis.push(emojiList[i]);
        emojis.push(emojiList[i]);
    }
    return (emojis)

}

function flipCard(card, emojiSpan) {
    card.classList.toggle('flipped');
    console.log("Card flipped with emoji:", emojiSpan.textContent);
}




