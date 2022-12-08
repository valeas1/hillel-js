import Services from './Services.js';

export default class State {
    static instance;

    static getInstance(renderFn) {
        if (!State.instance) {
            State.instance = new State();
            State.instance.setRenderFn(renderFn);
        }
        return State.instance;
    }

    #state;

    #renderFn;

    constructor() {
        this.setState();
    }

    async setState() {
        const response = await Services.getTodos();

        this.#state = response;

        this.rerender();
    }

    async addTaskToState(task) {
        let response = await Services.addTask(task);
        return response;
    }

    async removeTaskFromState(id) {
        let response = await Services.removeTask(id);
    }

    async updateTaskInState(id, task) {
        return await Services.updateTask(id, task);
    }

    async removeAllTaskFromState() {
        return await Services.cleanTodos();
    }

    findIndexTask() {
        return this.#state.findIndex((item) => {
            return item.id == event.target.parentElement.dataset.id;
        });
    }

    getState() {
        return this.#state;
    }

    setRenderFn(renderFn) {
        this.#renderFn = renderFn;
    }

    //render

    rerender() {
        this.#renderFn();
    }
}
