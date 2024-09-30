let buttonPlay = document.querySelector("#buttonPlay");
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
});


// const playerSelect = document.querySelectorAll('.card')

// playerSelect.forEach(card => {
//     card.addEventListener('click', () => {
//         const spanElement = card.querySelector('span')
//         if (card.classList.contains('emoji1')) {
//             spanElement.classList.add('emoji')
//         }
//         console.log(card)
//     });
// })
