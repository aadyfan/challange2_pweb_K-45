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

let currentFilter = "all";

// menyimpan data
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// mengambil data
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
        return;
    }

    try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
            tasks = parsedTasks;
        }
    } catch (error) {
        console.error("Gagal membaca data task:", error);
    }
}

// mengembalikan task yang sudah difilter sesuai currentFilter
function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter((task) => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter((task) => task.completed);
    }

    return tasks;
}

// menampilkan task
function renderTasks() {
    const taskList = document.getElementById("taskList");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task);
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" class="completeCheckbox" data-index="${originalIndex}" ${task.completed ? "checked" : ""}>
                <span style="${task.completed ? "text-decoration: line-through; color: #999;" : ""}">${task.text}</span>
            </span>
            <button class="deleteButton" data-index="${originalIndex}">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

// menambah task baru
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
    input.focus();
}

// menghapus task berdasarkan index
function deleteTask(index) {
    const taskIndex = Number(index);

    if (Number.isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        return;
    }

    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();
}

function toggleTaskComplete(index) {
    const taskIndex = Number(index);

    if (Number.isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        return;
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
    renderTasks();
}

// mengganti filter aktif
function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

// event delegation buat tombol delete
document.getElementById("taskList").addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".deleteButton");

    if (deleteButton) {
        const index = deleteButton.getAttribute("data-index");
        deleteTask(index);
    }
});

// event delegation buat checkbox complete
document.getElementById("taskList").addEventListener("change", (e) => {
    if (e.target.classList.contains("completeCheckbox")) {
        const index = e.target.getAttribute("data-index");
        toggleTaskComplete(index);
    }
});

// tombol Add
document.getElementById("addButton").addEventListener("click", addTask);

// bisa tambah task pakai Enter di input
document.getElementById("taskInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// tombol filter
document.getElementById("allButton").addEventListener("click", () => setFilter("all"));
document.getElementById("activeButton").addEventListener("click", () => setFilter("active"));
document.getElementById("completedButton").addEventListener("click", () => setFilter("completed"));

loadTasks();
renderTasks();