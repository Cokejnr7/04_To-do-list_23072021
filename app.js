/*Javascript for web summary so far.
You have 3 important headings that you need to understand, they are listed below
1. Selectors
2. Event listener
3. Functions

1. Selectors
These are used to select the html element that you want to apply your Javascript code on.
Selectors usually go in the form shown below for reference.
"const (variableName) = document.querySelector('p');"
This creates a variable by slecting the p tag from your html document.
Visit Code Ninja for more on selecting html elements using the DOM model.

2. Event Listeners
These are basically code lines that we use to create a state or an instance that will activate
make our block of code to run on a particular selector that we made.
For example, if we have created a Javascript element(also known as a Variable), we can apply
a listener to it. 
This will make the code block that we specify to run on that element when the condition is met.

3. Functions
These are the code blocks that are executed when the right event listener is triggered. Pretty 
easy.
*/

//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EventListeners
/*This event listener enables us to add a list when we click on the plus icon button*/
todoButton.addEventListener('click', addTodo);
/*This event listener enables us to delete a list when we click on the delete button*/
todoList.addEventListener('click', deleteCheck);
/*This event listener enables us to filer the list when we make our selection*/
filterOption.addEventListener('change', filterTodo);

//mark complete
document.addEventListener('click', markComplete)

//persist to localstorage
document.addEventListener('DOMContentLoaded', getTasks);

//localStorage.clear();

//Functions
function addTodo(event) {
    //This PreventDefault prevents the form from submitting when you click the button.
    event.preventDefault();
    if (todoInput.value == false) {
        alert("add a task");
        return
    };
    //CREATE TO-DO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');//add a class of todo using the ClassList property and add method
    //CREATE LI ELEMENT
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    //add the innertext element to the li.
    //the .value property let's us assign the value gotten from the input tag in our HTML,
    //and use that value as the innertext for the li.
    newTodo.classList.add('todo-item');//add a class to the element
    todoDiv.appendChild(newTodo);//add that element as a child to a Parent.
    //CREATE COMPLETED BUTTON
    const completedButton = document.createElement('button');
    //to add the icon tag to the button we just created, we use the innerHTML property.
    //we  then type out the entire line like we would do in normal HTML code block.
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.className = 'complete-btn';// add a class to the element
    todoDiv.appendChild(completedButton);// add that element as a child to a Parent.
    //CREATE TRASH BUTTON
    const trashButton = document.createElement('button');
    //to add the icon tag to the button we just created, we use the innerHTML property.
    //we  then type out the entire line like we would do in normal HTML code block.
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');// add a class to the element
    todoDiv.appendChild(trashButton);// add that element as a child to a Parent.
    //APPEND DIV TO LIST.
    todoList.appendChild(todoDiv);
    addToLocalStorage(todoInput.value, "incomplete");
    //DELETES TEXT TYPED BY THE USER
    todoInput.value = "";
    //tis sets the value to nothing(basically deletes the value)
    //notice how we did this code line after we have added the input into the li.
}
function getTasks() {
    let tasks;
    let states;
    localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
    localStorage.getItem('states') ? states = JSON.parse(localStorage.getItem('states')) : states = [];

    tasks.forEach((task, index) => {
        //CREATE TO-DO DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');//add a class of todo using the ClassList property and add method
        //CREATE LI ELEMENT
        const newTodo = document.createElement('li');
        newTodo.innerText = task;
        //add the innertext element to the li.
        //the .value property let's us assign the value gotten from the input tag in our HTML,
        //and use that value as the innertext for the li.
        newTodo.classList.add('todo-item');//add a class to the element
        todoDiv.appendChild(newTodo);//add that element as a child to a Parent.
        //CREATE COMPLETED BUTTON
        const completedButton = document.createElement('button');
        //to add the icon tag to the button we just created, we use the innerHTML property.
        //we  then type out the entire line like we would do in normal HTML code block.
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.className = 'complete-btn';// add a class to the element
        todoDiv.appendChild(completedButton);// add that element as a child to a Parent.
        //CREATE TRASH BUTTON
        const trashButton = document.createElement('button');
        //to add the icon tag to the button we just created, we use the innerHTML property.
        //we  then type out the entire line like we would do in normal HTML code block.
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');// add a class to the element
        todoDiv.appendChild(trashButton);// add that element as a child to a Parent.
        //APPEND DIV TO LIST.
        todoDiv.classList.add(states[index]);
        todoList.appendChild(todoDiv);
    })
}
function addToLocalStorage(task, state) {
    let tasks;
    let states;
    localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
    localStorage.getItem('states') ? states = JSON.parse(localStorage.getItem('states')) : states = [];

    states.push(state)
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('states', JSON.stringify(states));
}

function deleteCheck(e) {
    //Create a variable that stores any item we are clicking.
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        /*The condition says that if the class of what we click is trash-btn, then return true.*/
        const todo = item.parentElement;//save the parent element inside that variable
        console.log(todo.childNodes[0].textContent);
        /*For the animation of deleting the element, we add the fall class to the todo element
        i.e the div element.
        After this, we go to css and define the animation and transiton in the fall class.*/
        if (confirm(`are you sure you want to delete ${todo.textContent.slice(0, 10)}`) === true) {
            todo.classList.add("fall");//adds fall class to the element
            /*To delete the element now, we use this event listner.
            The trigger is now transition end, and the function to execute is defined in the code block*/
            todo.addEventListener('transitionend', function () {

                todo.remove();
                removeFromLocalStorage(todo.childNodes[0].textContent);
                //delete that element(hence deleting the entire div)
            });
        }

    }

}


function removeFromLocalStorage(todoItem) {
    let tasks;
    localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
    tasks.forEach((task, index) => {
        if (task === todoItem) {
            tasks.splice(index, 1);
        }

    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//MARK AS COMPLETED

function markComplete(e) {
    e.preventDefault();

    if (e.target.className === 'complete-btn') {
        /*The condition says that if the class of what we click is complete-btn, then return true.*/
        const todo = e.target.parentElement;//save the parent element inside that variable
        todo.classList.toggle("completed");//change the class to comleted. toggle is a method.
        let states;
        let tasks;
        localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = [];
        localStorage.getItem('states') ? states = JSON.parse(localStorage.getItem('states')) : states = [];

        if (todo.classList.contains("completed")) {
            tasks.forEach((task, index) => {
                if (task === todo.childNodes[0].textContent) {
                    states.splice(index, 1, "completed");
                }

            });
        }
        else {
            tasks.forEach((task, index) => {
                if (task === todo.childNodes[0].textContent) {
                    states.splice(index, 1, "incomplete");
                }

            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('states', JSON.stringify(states));

    }
}

function filterTodo(e) {
    x = e.target
    if (x === filterOption) {
        lists = document.querySelectorAll('.todo')

        switch (x.value) {
            case "completed":
                for (let i = 0; i < lists.length; i++) {
                    if (!lists[i].classList.contains('completed')) lists[i].style.display = "none";
                }
                // code block
                break;
            case "uncompleted":
                for (let i = 0; i < lists.length; i++) {
                    if (!lists[i].classList.contains('completed')) lists[i].style.display = "flex";
                    if (lists[i].classList.contains('completed')) lists[i].style.display = "none";
                }
                // code block
                break;
            default:
                for (let i = 0; i < lists.length; i++) {
                    if (lists[i].classList.contains('completed')) lists[i].style.display = "flex";
                }
            // code block


        }


    }

}
