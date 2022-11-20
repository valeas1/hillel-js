//page start layout

let inputTask = document.createElement('input');

let buttonAddTask = document.createElement('button');
buttonAddTask.innerText = 'Add Task!';
buttonAddTask.addEventListener('click', addTaskToArray);

let buttonClearTask = document.createElement('button');
buttonClearTask.innerText = 'Clear All!';
buttonClearTask.addEventListener('click', clearTasks);
let taskList = document.createElement('ul');

let searchInput = document.createElement('input');
searchInput.placeholder = 'Input task';
let searchButton = document.createElement('button');
searchButton.innerText = 'Search';
searchButton.addEventListener('click', searchTask);

let sortButton = document.createElement('button');
sortButton.innerText = 'Sort for ID';
sortButton.addEventListener('click', sortForId);

document.body.append(inputTask, buttonAddTask, buttonClearTask, taskList);
document.body.prepend(sortButton, searchInput, searchButton);
document.body.addEventListener('click', removeDivDetails);

let arrayTasks = [];

//utilits function

function findIndexTask() {
    return arrayTasks.findIndex((item) => {
        return item.id == event.target.parentElement.dataset.id;
    });
}

function compareTaskArrays(array1, array2, property) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i][property] != array2[i][property]) {
            return false;
        }
    }
    return true;
}

//render function

function renderLi(arrayTasks) {
    taskList.innerHTML = '';
    arrayTasks.map((item) => {
        if (!item.editable) {
            taskList.append(createTaskLi(item));
        } else {
            taskList.append(createEditableLi(item));
        }
    });
}
function createTaskLi(item) {
    let li = document.createElement('li');
    li.style.position = 'relative';

    let idConteiner = document.createElement('span');
    idConteiner.innerText = `Id: ${item.id}`;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', completeTask);
    if (item.completed) {
        checkbox.checked = true;
    }

    let titleContainer = document.createElement('span');
    titleContainer.innerText = item.title;
    titleContainer.addEventListener('click', showDatailsTask);

    let buttonEdit = document.createElement('button');
    buttonEdit.innerText = 'Edit';
    buttonEdit.addEventListener('click', editTask);

    let buttonRemove = document.createElement('button');
    buttonRemove.innerText = 'Remove';
    buttonRemove.addEventListener('click', removeTask);

    li.append(idConteiner, checkbox, titleContainer, buttonEdit, buttonRemove);
    li.dataset.id = item.id;

    return li;
}

function createEditableLi(item) {
    let li = document.createElement('li');

    let input = document.createElement('input');
    input.value = item.title;

    let buttonSave = document.createElement('button');
    buttonSave.innerText = 'Save';
    buttonSave.addEventListener('click', saveTask);

    let buttonCancel = document.createElement('button');
    buttonCancel.innerText = 'Cancel';
    buttonCancel.addEventListener('click', cancelSaveTask);

    li.append(input, buttonSave, buttonCancel);
    li.dataset.id = item.id;

    return li;
}

function renderDivDetails(json, event) {
    let div = document.createElement('div');
    div.classList.add('div-details');
    div.innerHTML = `
        Task ID: ${json.id}, complited: ${json.completed}, text: ${json.title}; 
    `;
    event.target.parentElement.append(div);
}

function removeDivDetails(event) {
    let removeElement = document.querySelector('.div-details');
    if (!removeElement) return;
    removeElement.remove();
}

//event function

async function addTaskToArray(event) {
    if (!event.target.previousElementSibling.value.trim()) return;
    let task = {
        title: event.target.previousElementSibling.value,
        completed: false,
        editable: false,
    };
    await postTask(task);
    renderLi(arrayTasks);
    event.target.previousElementSibling.value = '';
}

async function removeTask(event) {
    let index = findIndexTask();
    let resoult = await deleteTask(arrayTasks[index]);
    if (!resoult) return;
    arrayTasks.splice(index, 1);
    renderLi(arrayTasks);
}

function editTask(event) {
    let index = findIndexTask();
    arrayTasks[index].editable = true;
    renderLi(arrayTasks);
}

function cancelSaveTask(event) {
    let index = findIndexTask();
    arrayTasks[index].editable = false;
    renderLi(arrayTasks);
}

async function saveTask(event) {
    let index = findIndexTask();
    arrayTasks[index].title = event.target.previousElementSibling.value;
    let patch = await patchTask(arrayTasks[index], index);
    if (!patch) return;
    renderLi(arrayTasks);
}

function completeTask(event) {
    let index = findIndexTask();
    if (!arrayTasks[index].completed) {
        arrayTasks[index].completed = true;
    } else {
        arrayTasks[index].completed = false;
    }
}

function clearTasks(event) {
    taskList.innerHTML = '';
    arrayTasks = [];
}

function searchTask(event) {
    let searchValue = event.target.previousElementSibling.value;
    let searchItem = [...arrayTasks].filter((item) => {
        return item.title.includes(searchValue);
    });

    renderLi(searchItem);
}

function sortForId(event) {
    let sortItem = [...arrayTasks].sort((item1, item2) => item1.id - item2.id);
    if (compareTaskArrays(arrayTasks, sortItem, 'id')) {
        sortItem.reverse();
        renderLi(sortItem);
    } else {
        renderLi(sortItem);
    }
    arrayTasks = sortItem;
}

async function showDatailsTask(event) {
    let id = event.target.parentElement.dataset.id;
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((json) => {
            renderDivDetails(json, event);
        })
        .catch((error) => alert(`${error.message}`));
}

//ajax functon

async function getTaskList() {
    await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((json) => {
            json.map((item) => {
                arrayTasks.push({ ...item, editable: false });
            });
        })
        .catch((error) => alert(`${error.message}`));
    renderLi(arrayTasks);
}
getTaskList();

async function postTask(task) {
    await fetch('https://jsonplaceholder.typicode.com/users/1/todos', {
        method: 'POST',
        body: JSON.stringify({
            userId: 1,
            title: task.title,
            completed: false,
            editable: false,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((json) => arrayTasks.push(json))
        .catch((error) => alert(`${error.message}`));
}
async function deleteTask(task) {
    let resoult = true;
    await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: 'DELETE',
    }).catch((error) => {
        alert(`${error.message}`);
        resoult = false;
    });
    return resoult;
}

async function patchTask(task, index) {
    let resoult = true;
    await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title: task.title,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((json) => {
            console.log(task.id);
            arrayTasks[index] = { ...json, editable: false };
        })
        .catch((error) => {
            alert(`${error.message}`);
            resoult = false;
        });
    return resoult;
}
