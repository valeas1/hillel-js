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

    render() {
        if (!this.state.getState()) {
            return;
        }
        const conteiner = document.querySelector(`#${this.id}`);
        conteiner.innerHTML = '';

        const list = new List();

        const controllers = new Controller(list);

        conteiner.append(...controllers.render(), list.render());
    }
}
