//Define our UI Vars
const form = document.querySelector('form');;
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all events listener
loadEventListeners();

//load all event listener
function loadEventListeners(e){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add new Task 
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter task event
    filter.addEventListener('keyup', filterTask);
}

//Get Tasks
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.textContent = task;

        // create new link
        const link = document.createElement('a');

        // add class to link
        link.className = 'delete-item secondary-content';

        // add remove button
        link.innerHTML = '<i class="fa fa-remove"></li>';

        // append link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    })
}

// Add New Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = taskInput.value;

    // create new link
    const link = document.createElement('a');

    // add class to link
    link.className = 'delete-item secondary-content';

    // add remove button
    link.innerHTML = '<i class="fa fa-remove"></li>';

    // append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    // save in local storage
    storeTaskInLockStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

//Remove task 
function removeTask(e){
    if(e.target.parentElement.className === "delete-item secondary-content"){
        if(confirm('Are you Sure?')){
            let task = e.target.parentElement.previousSibling;
            e.target.parentElement.parentElement.remove();
            // console.log(e.target.parentElement.previousSibling);

            // Remove task from LS
            removeTaskInLockStorage(task);
        }
    }
}

//
function removeTaskInLockStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(ta, index){
        if(task.textContent === ta){
            tasks.splice(index, 1);
            console.log(task.textContent)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(e){
    taskList.innerHTML = '';
    // Clear LS
    clearLocalStorage();
}

// Clear LS
function clearLocalStorage(){
    localStorage.clear();
}

//Filter task 
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    });
}

//Store Task
function storeTaskInLockStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}