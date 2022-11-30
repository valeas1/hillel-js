import ListItem from './ListItem.js';
import State from './State.js';

export default class List {
    constructor() {
        this.state = State.getInstance();
    }

    render() {
        const toToList = document.createElement('ul');

        const items = this.state.getState().map((item) => {
            return new ListItem({ ...item });
        });

        const rendered = items.map((item) => item.render());

        toToList.append(...rendered);

        return toToList;
    }
}
