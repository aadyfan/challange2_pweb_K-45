let tasks = [
    {
        text: "Membuat Website to-do list",
        completed: false
    },
    {
        text: "Kerjain Jarkom Modul 2",
        completed: false
    },
    {
        text: "Beli Geprek Mazzeh",
        completed: false
    }
];

// menyimpan data
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// mengambil data
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// menampilkan task
function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="deleteButton">
                Delete
            </button>
        `;

        taskList.appendChild(li);

    });
}


loadTasks();
renderTasks();
