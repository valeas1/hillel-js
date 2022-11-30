import State from './State.js';

export default class ListItem {
    constructor(stateItem) {
        this.title = stateItem.title;
        this.completed = stateItem.completed;
        this.editable = stateItem.editable;
        this.id = stateItem.id;

        this.state = State.getInstance();

        this.removeTask = this.removeTask.bind(this);
    }
    //event
    removeTask(event) {
        let index = this.state.findIndexTask();
        // console.log(this.state.getState()[index]);
        this.state.removeTaskFromState(this.state.getState()[index].id);
    }

    //render
    createLi() {
        let li = document.createElement('li');
        li.style.position = 'relative';

        let idConteiner = document.createElement('span');
        idConteiner.innerText = `Id: ${this.id}`;

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // checkbox.addEventListener('click', completeTask);
        if (this.completed) {
            checkbox.checked = true;
        }

        let titleContainer = document.createElement('span');
        titleContainer.innerText = this.title;
        // titleContainer.addEventListener('click', showDatailsTask);

        let buttonEdit = document.createElement('button');
        buttonEdit.innerText = 'Edit';
        // buttonEdit.addEventListener('click', editTask);

        let buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'Remove';
        buttonRemove.addEventListener('click', this.removeTask);

        li.append(idConteiner, checkbox, titleContainer, buttonEdit, buttonRemove);
        li.dataset.id = this.id;

        return li;
    }

    createEditableLi() {
        let li = document.createElement('li');

        let input = document.createElement('input');
        input.value = this.title;

        let buttonSave = document.createElement('button');
        buttonSave.innerText = 'Save';
        // buttonSave.addEventListener('click', saveTask);

        let buttonCancel = document.createElement('button');
        buttonCancel.innerText = 'Cancel';
        // buttonCancel.addEventListener('click', cancelSaveTask);

        li.append(input, buttonSave, buttonCancel);
        li.dataset.id = this.id;

        return li;
    }
    render() {
        if (this.editable) {
            return this.createEditableLi();
        } else {
            return this.createLi();
        }
    }
}
