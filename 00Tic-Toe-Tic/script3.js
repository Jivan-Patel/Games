const boxes = document.querySelectorAll(".btn");
// document.querySelector("")
// document.querySelectorAll("")
// document.getElementById("")
// document.getElementsByClassName("")


var winbox = document.querySelector(".winnerprint");
// console.log(boxes);
var player = true

const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function disable() {
    for (let b of boxes) {
        b.innerHTML = "";
        b.disabled = true;
    }
}



function displaywinner() {
    for (let a of winner) {
        var con1 = boxes[a[0]].innerHTML;
        var con2 = boxes[a[1]].innerHTML;
        var con3 = boxes[a[2]].innerHTML;
        if (con1 != "" && con2 != "" && con3 != "") {
            if (con1 === con2 && con1 === con3) {
                // console.log("The winner is " +con1);

                if (con1 === "O") {
                    console.log("The winner is player O");
                    winbox.innerHTML = "The winner is player O";
                }
                else if (con1 === "X") {
                    console.log("The winner is player X");
                    winbox.innerHTML = "The winner is player X";
                }
                disable();
            }
        }
    }
}




function resert() {
    resert.addEventListener("click", () => {
        boxes.disabled = 0;
    })
}



// const saveGamebtn = document.getElementById("saveSession");
// const backSaveGamebtn = document.getElementById("backSave");
// var allbtl = document.querySelectorAll();

// function save() {
//     saveGamebtn.addEventListener("click", () => {
//         localStorage.setItem("data", allbtl);
//         saveGamebtn.innerHTML = "Game saved";
//     });

//     backSaveGamebtn.addEventListener("click", () => {
//         localStorage.getItem
//     })
// }



let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (player) {
            // console.log(box.innerHTML);
            box.innerHTML = "O";
            player = false;
        }
        else {
            box.innerHTML = "X";
            player = true;
        }
        count++;
        if (count == 9) {
            winbox.innerHTML = "The game is Draw";
        }
        box.disabled = true;
        displaywinner();
    })
    // save();

})