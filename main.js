

const tasks =  [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null; 

const bAdd = document.querySelector("#bAdd");
const oneTask = document.querySelector("#oneTask");
const formId = document.querySelector("#formId");
// const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();

formId.addEventListener('submit', e => { 
    e.preventDefault();
    if (oneTask.value !=  '') {
        createTask(oneTask.value);
        oneTask.value = '';
        renderTasks();
    }
})

function createTask(value) {
    
    const newTask = { 
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
    };

    tasks.push(newTask);
}

function renderTasks(){
    
    const html = tasks.map(task => {
        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Completado</span>` : 
                `<button class="startButton" data-id="${task.id}">Comenzar</button></div>`}
                <div class="title">${task.title}</div>
            </div>
        `;
    });
    const tasksContainer = document.querySelector("#allTasks");
    tasksContainer.innerHTML = html.join("");

    const startButtons = document.querySelectorAll('.task .startButton');

    startButtons.forEach(startButton => {
        startButton.addEventListener("click", () => {
            if (!timer) {
                const id = startButton.getAttribute("data-id");
                startButtonHandler(id);
                startButton.textContent = "Tarea en progreso..."
            }
        })
    })
}


function startButtonHandler(id) {
    time = 0.1 * 60;
    current = id;
    const taskId = tasks.findIndex((task) => task.id === id);

    document.querySelector("#time #taskName").textContent = tasks[taskId].title;
    renderTime();
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
}

function timeHandler(id){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTasks();
        startBreak();
    }
}

function renderTime() {
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
}

function markCompleted(id){

    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}

function startBreak(){
    time = 3;
    taskName.textContent = 'Break';
    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
}

function timerBreakHandler(){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timerBreak);
        markCompleted(id);
        current = null;
        timerBreak = null;
        taskName.textContent = "";
        renderTasks();
    }
}