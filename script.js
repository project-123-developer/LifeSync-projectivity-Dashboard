//Get HTML Elements
const taskForm = document.getElementById("taskForm");
const taskInput= document.getElementById("taskInput");
const taskpriority=document.getElementById("taskPriority");
const taskList=document.getElementById("taskList");

//load save tasks
let tasks = JSON.parse(localStorage.getItem("lifeSyncTasks")) ||[];

//save tasks in local storage
function saveTasks(){

    localStorage.setItem("lifeSyncTasks", JSON.stringify(tasks));

}

//Display Tasks

function displayTasks(){
    taskList.innerHTML = "";

if (tasks.length === 0) {
    taskList.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">✓</div>
            <h3>Your day starts here!</h3>
            <p>Add your first task to get started.</p>
        </div>
    `;
}
    const filterValue = document.getElementById("taskFilter").value;
const filteredTasks =  tasks.filter(task =>{
    if(filterValue ==="pending"){
        return task.completed === false;
    }
    if (filterValue === "completed"){
        return task.completed;
    }
    return true;
}) ;   
    filteredTasks.forEach((task, index)=>{
        const taskItem = document.createElement("div");

        taskItem.className ="task-item";
const taskInfo = document.createElement("div");

const title = document.createElement("h3");
title.textContent =task.title;


if(task.completed){
    title.style.textDecoration = "line-through";

}

const priority = document.createElement("span");
priority.textContent= task.priority + "priority";


taskInfo.appendChild(title);
taskInfo.appendChild(priority);

      const buttons = document.createElement("div");
      const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => completeTask(index));

        const  deleteButton =document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(index));

        buttons.appendChild(completeButton);
        buttons.appendChild(deleteButton);

        taskItem.appendChild(taskInfo);
        taskItem.appendChild(buttons);

        taskList.appendChild(taskItem);

    });
    updateStats();

}//Add new task
taskForm.addEventListener("submit", function(event){
    event.preventDefault();

    const taskTitle= taskInput.value.trim();

    if(taskTitle === ""){
        alert("please enter a task!");
        return;
    }

    const newTask ={
        title: taskTitle,
        priority: taskpriority.value,
        completed: false

    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();


    taskInput.value = "";



});
//Complete task
function completeTask(index){
    tasks[index].completed = !tasks[index].completed;


    saveTasks();
    displayTasks();

}
//Delete Task

function deleteTask(index){
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
    
}

//update Statistics
function updateStats(){
    const total= tasks.length;
    const completed= tasks.filter(task => task.completed).length;
    const pending = total - completed;

    const percentage = total === 0
    ? 0
    :Math.round((completed / total)* 100);


    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;


    document.getElementById("analyticsTotal").textContent = total;
    document.getElementById("analyticsCompleted").textContent = completed;
    document.getElementById("analyticsPending").textContent =pending;
    
    document.getElementById("productivity").textContent = percentage + "%";


    document.getElementById("progressPercentage").textContent = percentage + "%";
    document.getElementById("progressBar").style.width = percentage +"%";


}
//Show saved tasks when page opens
displayTasks();
//Dark mode
const themeToggle = document.getElementById("themeToggle");
//Load save theme

if (localStorage .getItem("lifeSyncTheme") === "dark"){
document.body.classList.add("dark-mode");
themeToggle.textContent = "Light mode";
}
themeToggle.addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")){
        localStorage.setItem("lifeSyncTheme", "dark");
        themeToggle.textContent= "Light mode";

    }else{
        localStorage.setItem("lifeSyncTheme", "light");
        themeToggle.textContent ="Dark mode";

    }
});
//Task filter Event
const taskFilter = document.getElementById("taskFilter");
taskFilter.addEventListener("change",  function(){
    displayTasks();
});
//My goal
const goalForm= document.getElementById("goalForm");
const goalInput =document.getElementById("goalInput");
const goalList= document.getElementById("goalList");

let goals =JSON.parse(localStorage.getItem("lifeSyncGoals")) || [];

function saveGoals(){
    localStorage.setItem("lifeSyncGoals", JSON.stringify(goals));
    
}
function displayGoals(){
    goalList.innerHTML = "";
    goals.forEach ((goalText, index)=> {

        const goalItem = document.createElement("div");
        goalItem.className = "goal-item";

        const goalTitle = document.createElement("h3");
        goalTitle.textContent = goalText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent ="Delete";

        deleteButton.addEventListener("click", function(){
            goals.splice(index, 1);
            saveGoals();
            displayGoals();

        });

        goalItem.appendChild(goalTitle);
        goalItem.appendChild(deleteButton);

        goalList.appendChild(goalItem);



    });
    

}
displayGoals();

goalForm.addEventListener("submit", function(event){
    event.preventDefault();

    const goalText = goalInput.value.trim();
    if(goalText=== ""){
        alert("Please enter a goal!");
        return;
    }

    const goalItem = document.createElement("div");
    goalItem.className = "goal-item";

    const goalTitle = document.createElement("h3");
    goalTitle.textContent = goalText;



const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete";

deleteButton.addEventListener("click", function(){
    goals = goals.filter(goal => goal !== goalText);
    saveGoals();
    displayGoals();

});

goalItem.appendChild(goalTitle);
goalItem.appendChild(deleteButton);

goalList.appendChild(goalItem);

goals.push(goalText);
saveGoals();
goalInput.value ="";
});