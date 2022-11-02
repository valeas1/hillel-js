(()=>{
    (()=> {
        let newTask = document.createElement('div');
        newTask.classList.add('new-task');
        let newTaskInput = document.createElement('input');
        newTaskInput.classList.add('new-task__input');
        newTaskInput.placeholder = 'Enter new task!';
        let newTaskBtn = document.createElement('input');
        newTaskBtn.classList.add('new-task__btn');
        newTaskBtn.type = 'button';
        newTaskBtn.value = 'Add!'
        let clearAllABtn = document.createElement('input');
        clearAllABtn.type = 'button';
        clearAllABtn.value = 'Clear all!';
        clearAllABtn.addEventListener('click', cleanAllTask);
        newTask.append(newTaskInput, newTaskBtn,clearAllABtn);
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('task-conteiner');
        let taskList = document.createElement('ul');
        taskList.classList.add('task-list');
        taskContainer.append(taskList);
        document.body.prepend(newTask, taskContainer);
        addStyle();
    })()
    const taskInput = document.querySelector('.new-task__input');
    const taskBtn = document.querySelector('.new-task__btn');
    const taskList = document.querySelector('.task-list');
    function addTask () {
        let li = document.createElement('li');
        let span = document.createElement('span');
        if (!taskInput.value.trim()) {
            taskInput.value = '';
            return;
        };
        span.innerText = taskInput.value;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.append(checkbox, span, ...createBtns('task'));
        taskList.append(li);
        taskInput.value = '';
    }
    taskBtn.addEventListener('click', addTask)
    function createBtns (string) {
        if (string === 'task') {
            let btnE = document.createElement('input');
            btnE.type = 'button';
            btnE.name = 'edit';
            btnE.value = 'Edit!';
            btnE.addEventListener('click', editTask);
            let btnR = document.createElement('input');
            btnR.type = 'button';
            btnR.value = 'Remove!'
            btnR.addEventListener('click', removeTask);
            return [btnE, btnR];
        } else if (string === 'edit') {
            let btnOk = document.createElement('input');
            btnOk.type = 'button';
            btnOk.value = 'Ok!'
            let btnCancel = document.createElement('input')
            btnOk.addEventListener('click', okEdit);
            btnCancel.type = 'button';
            btnCancel.value = 'Cancel!'
            btnCancel.addEventListener('click', cancelEdit);
            return [btnOk, btnCancel];
        }
    }
    function removeEl (arr) {
        [...arr].forEach(el => {
            if(el.tagName === 'INPUT' && el.type === 'text' || el.type === 'button') {
                el.remove();
            }
        })
    }
    function removeTask (e) {
        e.target.parentElement.remove();
    }
    function editTask (e) {
        let input = document.createElement('input');
        input.value = e.target.previousElementSibling.innerText;
        let perent = e.target.parentElement;
        perent.children[0].style.display = 'none';
        perent.children[1].style.display = 'none';
        removeEl(perent.children);
        perent.append(input, ...createBtns('edit'));
    }
    function cancelEdit(e) {
        let perent = e.target.parentElement;
        removeEl(perent.children);
        perent.children[0].style.display = 'block';
        perent.children[1].style.display = 'block';
        perent.append(...createBtns('task'));
    }
    function okEdit(e) {
        let perent = e.target.parentElement;
        perent.children[1].innerText = perent.children[2].value;
        removeEl(perent.children);
        perent.children[0].style.display = 'block';
        perent.children[1].style.display = 'block';
        perent.append(...createBtns('task'));
    }
    function cleanAllTask () {
        taskList.innerHTML = '';
    }
    function addStyle () {
        let tagStyle = document.createElement('style');
        tagStyle.innerHTML = `.new-task {
            width: 80vw;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            padding-top: 20px;
            padding-bottom: 40px;
            border-bottom: 2px solid black;
            gap: 5px;
        }
        .task-list > li {
            display: flex;
            gap: 5px;
            margin-bottom: 5px;
            margin-top: 5px;
        }
        input:checked + span {
            text-decoration: line-through;
        }
        input:checked ~ [name = 'edit'] {
            display: none;
        }`;
        document.head.append(tagStyle);
    }
})()