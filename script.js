// Accessing all the button cell
let boxes = document.body.querySelectorAll(".boxes");
let turn_info = document.body.querySelector(".turn-info");
let restart = document.body.querySelector("#restart");
let reset = document.body.querySelector("#reset");
let graphical_player1_score = document.body.querySelector(".player1_score");
let graphical_player2_score = document.body.querySelector(".player2_score");
let graphical_draw = document.body.querySelector(".graphical_draw");
let graphical_player1_name = document.body.querySelector(".player1_name");
let graphical_player2_name = document.body.querySelector(".player2_name");

// All variables
let player1_name = prompt("Enter player 1 name:(X) ");
let player2_name = prompt("Enter player 2 name:(O) ");
graphical_player1_name.innerText = player1_name.toUpperCase();
graphical_player2_name.innerText = player2_name.toUpperCase();
let sArr = ["X", "O"];
let cSym = "cross";
turn_info.textContent = "Turn: " + player1_name.toUpperCase();
let player1_score = 0; // X
let player2_score = 0; // O
let draw_score = 0;
graphical_player1_score.textContent = player1_score;
graphical_player2_score.textContent = player2_score;
graphical_draw.textContent = draw_score;
let winner = false;
let number_clicks = 0;

// Alternating between cross and zero
function symChoose() {
    if (cSym === "cross") {
        cSym = "oval";
        return sArr[0];
    }
    cSym = "cross";
    return sArr[1];
}

// function to change symbol background for better user interface
function colorChange() {
    if (cSym !== "cross") {
        return "#EE7674";
    }
    if (cSym !== "oval") {
        return "#987284";
    }
}

// function to make every button unclickable after winning
function nullButtonEvents() {
    for (let box of boxes) {
        box.onclick = null;

    }
}

// function to display next symbol in the box given
function turnSymbol() {
    if (cSym === "cross") {
        turn_info.textContent = "Turn: " + player1_name.toUpperCase();
    }
    else {
        turn_info.textContent = "Turn: " + player2_name.toUpperCase();
    }
}

// Setting the button attribute
function setButtonAttribute(div) {
    div.innerHTML = symChoose();
    div.style.backgroundColor = colorChange();
    turnSymbol();
    div.onclick = null;
    number_clicks += 1;
    if (number_clicks >= 3) {
        winning();
    }
}


// function to reset all button after pressing reset button
function setNewButtonAttribute(div) {
    div.innerHTML = "";
    div.style.backgroundColor = "white";
    div.onclick = () => {
        setButtonAttribute(div);
    }

}

// Button first time event
for (let box of boxes) {
    box.onclick = () => {
        setButtonAttribute(box);
    }
}

// Restart Game
restart.onclick = () => {
    turn_info.textContent = "Turn: " + player1_name.toUpperCase();
    cSym = "cross";
    number_clicks = 0;
    winner = false;
    for (let box of boxes) {
        setNewButtonAttribute(box);
    }

}

// Reset Game
reset.onclick = () => {
    player1_name = prompt("Enter player 1 name: ");
    player2_name = prompt("Enter player 2 name: ");
    graphical_player1_name.innerText = player1_name.toUpperCase();
    graphical_player2_name.innerText = player2_name.toUpperCase();
    graphical_player1_score.innerText = 0;
    graphical_player2_score.innerText = 0;
    graphical_draw.innerText = 0;
    draw_score = 0;
    number_clicks = 0;
    winner = false;
    turn_info.textContent = "Turn: " + player1_name.toUpperCase();
    cSym = "cross";
    for (let box of boxes) {
        setNewButtonAttribute(box);
    }
}

// Updating player score and determine which player has won the match
function updatePlayerScore(player_score, player) {
    turn_info.textContent = player + " Won" + " (Press reset or restart)";
    nullButtonEvents();
}

// Display the pattern by which the player has won
function changeButtonColorAfterWin([b1, b2, b3]) {
    [b1, b2, b3].forEach(button => {
        button.style.backgroundColor = "#798448";
    });
}

// All possible wining condition
const win_cond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2],
]
function winning() {
    for (let i = 0; i < win_cond.length; i++) {
        const [a, b, c] = win_cond[i];
        const val1 = document.querySelector(`#box${a}`).innerHTML;
        const val2 = document.querySelector(`#box${b}`).innerHTML;
        const val3 = document.querySelector(`#box${c}`).innerHTML;

        if (val1 === "X" && val2 === "X" && val3 === "X") {
            player1_score++;
            winner = true;
            graphical_player1_score.innerText = player1_score;
            changeButtonColorAfterWin([
                document.querySelector(`#box${a}`),
                document.querySelector(`#box${b}`),
                document.querySelector(`#box${c}`)
            ]);
            updatePlayerScore(player1_score, player1_name.toUpperCase());
            return;
        } else if (val1 === "O" && val2 === "O" && val3 === "O") {
            player2_score++;
            winner = true;
            graphical_player2_score.innerText = player2_score;
            changeButtonColorAfterWin([
                document.querySelector(`#box${a}`),
                document.querySelector(`#box${b}`),
                document.querySelector(`#box${c}`)
            ]);
            updatePlayerScore(player2_score, player2_name.toUpperCase());
            return;
        }
    }
    if (number_clicks === 9 && winner == false) {
        draw_score++;
        turn_info.textContent = "Draw";
        graphical_draw.innerText = draw_score;

    }
}
