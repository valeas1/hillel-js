let id = [];

let newTask = document.createElement('div');
newTask.classList.add('new-task');

let taskInput = document.createElement('input');
taskInput.classList.add('new-task__input');
taskInput.placeholder = 'Enter new task!';

let taskBtn = document.createElement('input');
taskBtn.classList.add('new-task__btn');
taskBtn.type = 'button';
taskBtn.value = 'Add!';

let clearAllABtn = document.createElement('input');
clearAllABtn.type = 'button';
clearAllABtn.value = 'Clear all!';
clearAllABtn.addEventListener('click', cleanAllTask);
newTask.append(taskInput, taskBtn, clearAllABtn);

let taskContainer = document.createElement('div');
taskContainer.classList.add('task-conteiner');

let taskList = document.createElement('ul');
taskList.classList.add('task-list');
taskContainer.append(taskList);
document.body.prepend(newTask, taskContainer);

renderTasksFromLocalStorage();

addStyle();

function addTask() {
    let li = document.createElement('li');
    li.dataset.id = new Date().getTime();

    let span = document.createElement('span');
    if (!taskInput.value.trim()) {
        taskInput.value = '';
        return;
    }

    span.innerText = taskInput.value;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', addStateToCheckbox);

    li.append(checkbox, span, ...createBtns('task'));
    taskList.append(li);

    taskInput.value = '';

    idUpdate();
    addTasksToLocalStorage();
}
taskBtn.addEventListener('click', addTask);
function addStateToCheckbox(e) {
    if (e.target.dataset.state === 'checked') {
        e.target.dataset.state = 'unchecked';
    } else {
        e.target.dataset.state = 'checked';
    }
    addTasksToLocalStorage();
}
function createBtns(string) {
    if (string === 'task') {
        let btnE = document.createElement('input');
        btnE.type = 'button';
        btnE.name = 'edit';
        btnE.value = 'Edit!';
        btnE.addEventListener('click', editTask);

        let btnR = document.createElement('input');
        btnR.type = 'button';
        btnR.name = 'remove';
        btnR.value = 'Remove!';
        btnR.addEventListener('click', removeTask);

        return [btnE, btnR];
    } else if (string === 'edit') {
        let btnOk = document.createElement('input');
        btnOk.type = 'button';
        btnOk.name = 'ok';
        btnOk.value = 'Ok!';
        btnOk.addEventListener('click', okEdit);

        let btnCancel = document.createElement('input');
        btnCancel.type = 'button';
        btnCancel.name = 'cancel';
        btnCancel.value = 'Cancel!';
        btnCancel.addEventListener('click', cancelEdit);

        return [btnOk, btnCancel];
    }
}

function removeEl(arr) {
    [...arr].forEach((el) => {
        if ((el.tagName === 'INPUT' && el.type === 'text') || el.type === 'button') {
            el.remove();
        }
    });
}

function removeTask(e) {
    localStorage.removeItem(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();
    idUpdate();
}

function editTask(e) {
    let input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('value', e.target.previousElementSibling.innerText);
    let perent = e.target.parentElement;
    perent.children[0].style.display = 'none';
    perent.children[1].style.display = 'none';
    removeEl(perent.children);
    perent.append(input, ...createBtns('edit'));
    addTasksToLocalStorage();
}

function cancelEdit(e) {
    let perent = e.target.parentElement;
    removeEl(perent.children);
    perent.children[0].style.display = 'block';
    perent.children[1].style.display = 'block';
    perent.append(...createBtns('task'));
    addTasksToLocalStorage();
}

function okEdit(e) {
    let perent = e.target.parentElement;
    perent.children[1].innerText = perent.children[2].value;
    removeEl(perent.children);
    perent.children[0].style.display = 'block';
    perent.children[1].style.display = 'block';
    perent.append(...createBtns('task'));
    addTasksToLocalStorage();
}

function cleanAllTask() {
    taskList.innerHTML = '';
    localStorage.clear();
    id = [];
}

function addStyle() {
    let tagLink = document.createElement('link');
    tagLink.setAttribute('href', 'style.css');
    tagLink.setAttribute('rel', 'stylesheet');
    document.head.append(tagLink);
}

function idUpdate() {
    let li = document.querySelectorAll('li');
    id = [];
    [...li].forEach((el) => {
        id.push(el.dataset.id);
    });
    localStorage.setItem('id', id);
}

function addTasksToLocalStorage() {
    localStorage.setItem('id', id);
    id = localStorage.getItem('id');
    id.split(',').forEach((el) => {
        localStorage.setItem(el, document.querySelector(`[data-id = '${el}']`).outerHTML);
    });
}

function renderTasksFromLocalStorage() {
    id = localStorage.getItem('id');
    if (!id) {
        id = [];
        return;
    }
    id.split(',').forEach((el) => {
        taskList.innerHTML += localStorage.getItem(el);
    });
    let checkbox = document.querySelectorAll('[data-state = "checked"]');
    [...checkbox].forEach((el) => {
        el.checked = true;
    });

    renderAddListener();
}

function renderAddListener() {
    let inputs = document.querySelectorAll('input');
    [...inputs].forEach((el) => {
        if (el.name === 'edit') {
            el.addEventListener('click', editTask);
        } else if (el.name === 'remove') {
            el.addEventListener('click', removeTask);
        } else if (el.name === 'ok') {
            el.addEventListener('click', okEdit);
        } else if (el.name === 'cancel') {
            el.addEventListener('click', cancelEdit);
        } else if (el.type === 'checkbox') {
            el.addEventListener('click', addStateToCheckbox);
        }
    });
}
