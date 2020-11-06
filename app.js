//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filteropt = document.querySelector('.filter-todo');

//EVENT LISTENER
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', check);
filteropt.addEventListener('click',filter);

//FUNCTIONS
function addTodo(event){   
    event.preventDefault(); //Prevent from submitting
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //save local
    saveLocal(todoInput.value);
    //check & delete button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-btn');
    todoDiv.appendChild(checkButton);
    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fas fa-trash"></i>';
    delButton.classList.add('del-btn');
    todoDiv.appendChild(delButton);
    // append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = '';
}


function check(e){
    const item = e.target;
    const todo = item.parentElement;
    if(item.classList[0] === 'del-btn'){
        todo.classList.add('del');
        removeLocal(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }
    if (item.classList[0] === 'check-btn') {
        todo.classList.toggle('completed');
    }
}

function filter(e){
    const todos = todoList.childNodes;
    const opt = e.target.value;
    todos.forEach(function(todo){
        switch(opt){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocal(todo){
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //check & delete button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add('check-btn');
        todoDiv.appendChild(checkButton);
        const delButton = document.createElement('button');
        delButton.innerHTML = '<i class="fas fa-trash"></i>';
        delButton.classList.add('del-btn');
        todoDiv.appendChild(delButton);
        // append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocal(todo){
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(todos.indexOf(todo.children[0].innerText),1);
    localStorage.setItem('todos', JSON.stringify(todos))

}