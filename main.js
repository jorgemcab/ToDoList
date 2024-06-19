const tasksContainer = document.querySelector(".task-container");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const addForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const taskInputName = document.getElementById("nombre");
const taskInputTime = document.getElementById("horario");

let taskList = JSON.parse(localStorage.getItem("task")) || [];

const saveLocalStorage = () => {
    localStorage.setItem("task", JSON.stringify(taskList))
}

const renderTask = () => {
    tasksContainer.innerHTML = taskList.map((task) => {
        return `
            <li class = "task-added">
            <span class="task-name-span"> ${task.name} </span>
            <span class="task-time-span"> ${task.time} </span>
            <i class="fa-regular fa-trash-can delete-btn" data-id= "${task.id}"></i>
            <li/>
        `
        /*<img 
            class="delete-btn"
            src="./img/delete-btn.png" 
            data-id= "${task.id}">*/
    }).join("")
};

const toggleDeleteAllButton = () =>{
    if(!taskList.length){
        deleteAllBtn.classList.add("hidden");
        return
    }
    deleteAllBtn.classList.remove( "hidden");
};

const taskNameLimpio = () => {
    return taskInputName.value.trim().replace(/\s+/g, " ");
}
const validName = (taskNameLimpio) => {
    let isValid = true;
    if( !taskNameLimpio.length) {
        alert("ingresar una tarea rata maldita");
        isValid = false;
    } return isValid;
}
const taskTimeLimpio = () => {
    return taskInputTime.value.trim().replace(/\s+/g, " ");
}
const validTime = (taskTimeLimpio) => {
    let isValid = true;
    if( !taskTimeLimpio.length) {
        alert("ingresar el horario rata vaga");
        isValid = false;
    } return isValid;
}

const addTask = (e) => {
    e.preventDefault();

    const taskNameValue = taskNameLimpio();
    const taskTimeValue = taskTimeLimpio();     
    if( validName(taskNameValue) && validTime(taskTimeValue)){
    taskList = [
        ...taskList,
        {
            name: taskNameValue,
            time: taskTimeValue,
            id: Date.now()
        }
    ];};

    console.log(taskList);
    addForm.reset();
    updateUI();
};

const removeTask = (e) => {
    if( !e.target.classList.contains("delete-btn")){
        return;
    }
    const filterId = Number(e.target.dataset.id)
    taskList = taskList.filter((task) => {  
        return task.id !== filterId;
    });
    updateUI();
 }

const removeAll = () => {
    taskList = [];
    updateUI()
}

const updateUI = () =>{
    renderTask();
    saveLocalStorage();
    toggleDeleteAllButton();
}

const init = () => {
    document.addEventListener("DOMContentLoaded", renderTask);
    addForm.addEventListener("submit", addTask);
    tasksContainer.addEventListener("click", removeTask);
    deleteAllBtn.addEventListener("click", removeAll)
    document.addEventListener("DOMContentLoaded", toggleDeleteAllButton);
};

init()

























































