const boxes = document.querySelectorAll(".btn");
// document.querySelector("")
// document.querySelectorAll("")
// document.getElementById("")
// document.getElementsByClassName("")

var winbox = document.querySelector(".winnerprint");
// console.log(boxes);
var player = true

const winner = [

    // vertical
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],

    // Horizontal
    [0, 6, 12, 18, 24, 30],
    [1, 7, 13, 19, 25, 31],
    [2, 8, 14, 20, 26, 32],
    [3, 9, 15, 21, 27, 33],
    [4, 10, 16, 22, 28, 34],
    [5, 11, 17, 23, 29, 35],

    // Diagonal
    [5, 10, 15, 20, 25, 30],
    [0, 7, 14, 21, 28, 35]
]

function disable() {
    for (let b of boxes) {
        b.innerHTML = ""
        b.disabled = true;
    }
}



function displaywinner() {
    for (let a of winner) {
        var con1 = boxes[a[0]].innerHTML;
        var con2 = boxes[a[1]].innerHTML;
        var con3 = boxes[a[2]].innerHTML;
        var con4 = boxes[a[3]].innerHTML;
        var con5 = boxes[a[4]].innerHTML;
        var con6 = boxes[a[5]].innerHTML;
        if (con1 != "" && con2 != "" && con3 != "" && con4 != "" && con5 != "" && con6 != "") {
            if (con1 === con2 && con2 === con3 && con3 === con4 && con4 === con5 && con5 === con6) {
                // console.log("The winner is " +con1);

                if (con1 === "O") {
                    console.log("The winner is player O");
                    winbox.innerHTML = "The winner is player O";
                }
                else {
                    console.log("The winner is player X");
                    winbox.innerHTML = "The winner is player X";
                }
                disable();
            }
        }
    }
}


var resert = document.querySelector(".resert");


function resert() {
    resert.addEventListener("click", () => {
        boxes.disabled = 0;
    })
}




/************************************************ Main Code ***************************************************************************/

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
        box.disabled = true;
        count ++;
        displaywinner();

        if(count == 36){
            winbox.innerHTML = "The game is Draw";
        }
        console.log(count)
    })
})