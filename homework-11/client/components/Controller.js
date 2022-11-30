import State from './State.js';

export default class Controller {
    constructor() {
        this.state = State.getInstance();
        this.addTaskToState = this.addTaskToState.bind(this);
    }

    addTaskToState(event) {
        if (!event.target.previousElementSibling.value.trim()) return;
        let task = {
            title: event.target.previousElementSibling.value,
        };
        this.state.addTaskToState(task);
    }

    createControlElements() {
        const input = document.createElement('input');
        input.placeholder = 'Input your task';

        const addTaskButton = document.createElement('button');
        addTaskButton.innerText = 'Add';
        addTaskButton.addEventListener('click', this.addTaskToState);

        return [input, addTaskButton];
    }
}
