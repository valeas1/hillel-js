import Controller from './Controller.js';
import List from './List.js';
import State from './State.js';

export default class TodoList {
    static instance = {};
    static getInstance(id) {
        if (!TodoList.instance[id]) {
            const instance = new TodoList(id);
            const state = State.getInstance();

            instance.setState(state);
            state.setRenderFn(instance.render.bind(instance));

            TodoList.instance[id] = instance;
        }
        return TodoList.instance[id];
    }
    constructor(id) {
        this.id = id;
    }

    setState(state) {
        this.state = state;
    }

    async render() {
        const conteiner = document.querySelector(`#${this.id}`);
        conteiner.innerHTML = '';
        const state = State.getInstance();
        await state.setState();

        const controllers = new Controller();

        const list = new List();

        conteiner.append(...controllers.createControlElements(), list.render());
    }
}
