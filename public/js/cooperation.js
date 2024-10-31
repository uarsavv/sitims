const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const task = todoInput.value.trim();

    if (task !== '') {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        const deleteButton = document.createElement('button');

        taskText.textContent = task;
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete');

        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        todoInput.value = '';

        const tasks = getTasksFromJson(); //json
        tasks.push(task);
        saveTasksToJson(tasks);
    }
});

function getTasksFromJson() {
    const savedTasks = localStorage.getItem('tasks'); // тут получаем сохр задачи из локал
    if (savedTasks !== null) {
        return JSON.parse(savedTasks);
    }
    return [];
}

function saveTasksToJson(tasks) { // преобразуем в джисонку и сохраняем под ключом таск
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

todoList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentNode.remove();
    }
});

todoList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI' || event.target.parentNode.tagName === 'LI') {
        const listItem = event.target.tagName === 'LI' ? event.target : event.target.parentNode;
        listItem.classList.toggle('completed');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const tasks = getTasksFromJson();
    if (tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
            const listItem = document.createElement('li');
            const taskText = document.createElement('span');
            const deleteButton = document.createElement('button');

            taskText.textContent = tasks[i];
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete');

            listItem.appendChild(taskText);
            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
        }
    }
});

window.addEventListener('beforeunload', function () {
    const tasks = [];
    const listItems = todoList.querySelectorAll('li');
    for (let i = 0; i < listItems.length; i++) {
        tasks.push(listItems[i].querySelector('span').textContent); // для каждого эл списка задач добавляем текст задачи в массив задач
    }
    saveTasksToJson(tasks);
});