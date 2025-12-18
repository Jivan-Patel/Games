// DOM elements

var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

var filterAll = document.getElementById("all");
var filterRem = document.getElementById("rem");
var filterCom = document.getElementById("com");

// Variable

var completedTask = null;
var totalTask = null;


function addTask() {
    var task = todoInput.value.trim();
    if (task == "") {
        alert(`Content is compulsory and no empty content is allowed`);
        return;
    }

    // each task -> trace...

    todoList.push({
        content: task,
        id: Date.now().toString(),
        complete: false
    });

    todoList.forEach(data => {
        // console.log(data);
    });

    updateList();       // filter and complete list update
    appendTask(todoList);
}

function updateList() {
    comdoList = todoList.filter((data) => {
        if (data.complete == true) {
            return data;
        }
    });

    remList = todoList.filter((data) => {
        if (data.complete == false) {
            return data;
        }
    });

    document.querySelector('#c-count').textContent = comdoList.length;
    document.querySelector('#r-count').textContent = todoList.length;
}

function appendTask(todoList) {
    allTodos.innerHTML = ""; // empty... -> task

    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
        <p id="task"> ${element.complete ? `<strike>${element.content}</strike>` : element.content} </p>
        <div class="todo-actions">
            <button class="complete btn btn-success">
                <i class="ci bx bx-check bx-sm"></i>
            </button>

            <button class="delete btn btn-error">
                <i class="di bx bx-trash bx-sm"></i>
            </button>
        </div>
        </li>`

        allTodos.innerHTML += x;
    });
}

function deleteTask(event) {
    // console.log(event.target.parentElement);
    // console.log(event.target.parentElement.parentElement);
    // console.log(event.target.parentElement.parentElement.id);

    let id = event.target.parentElement.parentElement.id;
    todoList = todoList.filter((data) => {
        return data.id != id;
    });
    updateList();
    appendTask(todoList);

}


function completeTask(event) {

    let id = event.target.parentElement.parentElement.getAttribute('id');

    todoList.forEach(data => {
        if (data.id == id) {
            if (data.complete == false) {
                data.complete = true;
                event.target.parentElement.parentElement.querySelector('#task').classList.add('line');

            }
            else if (data.complete == true) {
                data.complete = false;
                event.target.parentElement.parentElement.querySelector('#task').classList.remove('line');

            }
        }
    });

    updateList();
    appendTask(todoList);
}

function deleteAll() {
    todoList = [];
    updateList();
    appendTask(todoList);
}
function deleteS() {
    todoList = remList;
    updateList();
    appendTask(todoList);
}

// event Listner for add and delete

addButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (event) => {
    // console.log(event.key);
    if (event.key === 'Enter') {
        addTask();
    }
});


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        // console.log(event.target);
        deleteTask(event);
    }
    else if (event.target.classList.contains('complete')) {
        // console.log(event.target);
        completeTask(event);
    }
})


deleteAllButton.addEventListener('click', deleteAll);
deleteSButton.addEventListener('click', deleteS);


filterAll.addEventListener('click', () => {
    appendTask(todoList);
})
filterCom.addEventListener('click', () => {
    appendTask(comdoList);
})
filterRem.addEventListener('click', () => {
    appendTask(remList);
})