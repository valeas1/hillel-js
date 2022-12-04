import State from './State.js';
import Services from './Services.js';

export default class ListItem {
    constructor(stateItem) {
        this.title = stateItem.title;
        this.completed = stateItem.completed;
        this.editable = stateItem.editable;
        this.id = stateItem.id;

        this.state = State.getInstance();

        this.liRef = document.createElement('li');
        this.liRef.style.position = 'relative';
        this.liRef.dataset.id = this.id;

        this.removeTask = this.removeTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.cancelSaveTask = this.cancelSaveTask.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.showDatailsTask = this.showDatailsTask.bind(this);
    }
    //event
    removeTask(event) {
        this.state.removeTaskFromState(this.id);
        this.liRef.remove();
    }

    editTask(event) {
        this.editable = true;

        this.render();
    }

    cancelSaveTask(event) {
        this.editable = false;

        this.render();
    }

    async saveTask(event) {
        let response = this.state.updateTaskInState(this.id, {
            title: event.target.previousElementSibling.value,
        });
        await response.then((res) => {
            this.title = res.title;
            this.editable = false;
        });
        this.render();
    }

    async completeTask(event) {
        let response = this.state.updateTaskInState(this.id, { completed: !this.completed });
        await response.then((res) => (this.completed = res.completed));
    }
    async showDatailsTask(event) {
        let id = event.target.parentElement.dataset.id;
        let response = Services.requestServer(`api/todos/${id}`);
        response.then((res) => {
            this.renderDivDetails(res, event);
        });
    }

    //render
    createLi() {
        let idConteiner = document.createElement('span');
        idConteiner.innerText = `Id: ${this.id}`;

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('click', this.completeTask);

        if (this.completed) {
            checkbox.checked = true;
        }

        let titleContainer = document.createElement('span');
        titleContainer.innerText = this.title;
        titleContainer.addEventListener('click', this.showDatailsTask);

        let buttonEdit = document.createElement('button');
        buttonEdit.innerText = 'Edit';
        buttonEdit.addEventListener('click', this.editTask);

        let buttonRemove = document.createElement('button');
        buttonRemove.innerText = 'Remove';
        buttonRemove.addEventListener('click', this.removeTask);

        return [idConteiner, checkbox, titleContainer, buttonEdit, buttonRemove];
    }

    createEditableLi() {
        let input = document.createElement('input');
        input.value = this.title;

        let buttonSave = document.createElement('button');
        buttonSave.innerText = 'Save';
        buttonSave.addEventListener('click', this.saveTask);

        let buttonCancel = document.createElement('button');
        buttonCancel.innerText = 'Cancel';
        buttonCancel.addEventListener('click', this.cancelSaveTask);

        return [input, buttonSave, buttonCancel];
    }
    render() {
        this.liRef.innerHTML = '';

        if (this.editable) {
            this.liRef.append(...this.createEditableLi());
        } else {
            this.liRef.append(...this.createLi());
        }

        return this.liRef;
    }
    renderDivDetails(json, event) {
        let div = document.createElement('div');
        div.classList.add('div-details');
        div.innerHTML = `
            Task ID: ${json.id}, complited: ${json.completed}, text: ${json.title}; 
        `;
        event.target.parentElement.append(div);
    }
}
