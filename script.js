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

// ==========================================
// BAGIAN 3: JavaScript Logic + Filter (Arul)
// ==========================================

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
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
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

// mengganti filter aktif
function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

// menampilkan task
function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach((task) => {

        // cari index asli task ini di array "tasks" (bukan di array hasil filter)
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

// event delegation buat tombol delete
document.getElementById("taskList").addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteButton")) {
        const index = e.target.getAttribute("data-index");
        deleteTask(index);
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