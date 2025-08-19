let togg1 = document.querySelector("#toggle");
let newGame = document.querySelector("#newgame");
let newGame2 = document.querySelector("#newgame2");
let msgCtn = document.querySelector(".msg-ctn");
let message = document.querySelector("#msg");
let resetBtn = document.querySelector("#reset");
let boxes = document.querySelectorAll(".box");
let drawCtn = document.querySelector(".draw");
let drawMsg = document.querySelector("#msgdraw");

let turnO = true;
let count = 0;

togg1.addEventListener("click", () => {
    document.body.classList.toggle("Dark");
    togg1.innerText = document.body.classList.contains("Dark") ? "Light" : "Dark";
});

const resetGame = () => {
    turnO = true;
    count = 0;
    message.textContent = "";
    drawMsg.textContent = "";
    msgCtn.classList.add("hide");
    drawCtn.classList.add("hide");
    enableBoxes();
};

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 4, 8], [2, 4, 6],
    [0, 3, 6], [1, 4, 7], [2, 5, 8]
];

const showWinner = (winner) => {
    message.textContent = `Congratulations ! 
    Winner Is : '${winner}'`;
    +  msgCtn.classList.remove("hide");
    drawCtn.classList.add("hide");
    disableBoxes();
};

const showDraw = () => {
    drawMsg.textContent = "Match Is Draw";
    drawCtn.classList.remove("hide");
    msgCtn.classList.add("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const v1 = boxes[a].innerText;
        const v2 = boxes[b].innerText;
        const v3 = boxes[c].innerText;
        if (v1 && v1 === v2 && v1 === v3) {
            showWinner(v1);
            return true;          // winner found
        }
    }
    return false;             // no winner after checking all patterns
};

const disableBoxes = () => {
    for (let box of boxes) box.disabled = true;
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.disabled = true;
        count++;

        const isWinner = checkWinner();
        if (count === 9 && !isWinner) showDraw();
    });
});

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
newGame2.addEventListener("click", resetGame);