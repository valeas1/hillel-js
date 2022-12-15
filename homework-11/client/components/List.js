import ListItem from './ListItem.js';
import State from './State.js';

export default class List {
    constructor() {
        this.state = State.getInstance();
        this.toDoListRef = document.createElement('ul');
    }

    render() {
        const items = this.state.getState().map((item) => {
            return new ListItem({ ...item });
        });

        const rendered = items.map((item) => item.render());

        this.toDoListRef.append(...rendered);

        return this.toDoListRef;
    }

    renderItems(tasks) {
        this.toDoListRef.innerHTML = '';

        let items = tasks.map((item) => new ListItem(item)).map((item) => item.render());

        this.toDoListRef.append(...items);
    }
}
