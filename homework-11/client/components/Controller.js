import State from './State.js';
import ListItem from './ListItem.js';
import List from './List.js';

export default class Controller {
    constructor(list) {
        this.state = State.getInstance();

        this.addTaskToState = this.addTaskToState.bind(this);
        this.clearAllTask = this.clearAllTask.bind(this);
        this.searchTask = this.searchTask.bind(this);
        this.fromMinToMax = this.fromMinToMax.bind(this);
        this.fromMaxToMin = this.fromMaxToMin.bind(this);
        this.removeDivDetails = this.removeDivDetails.bind(this);

        this.list = list;
        this.listRef = list.toDoListRef;
    }

    //event
    addTaskToState(event) {
        if (!event.target.previousElementSibling.value.trim()) return;
        let task = {
            title: event.target.previousElementSibling.value,
        };
        let responce = this.state.addTaskToState(task);
        responce.then((res) => new ListItem(res)).then((res) => this.listRef.append(res.render()));
        event.target.previousElementSibling.value = '';
    }

    clearAllTask(event) {
        let responce = this.state.removeAllTaskFromState();
        responce.then((res) => (this.listRef.innerHTML = ''));
    }

    searchTask(event) {
        let searchValue = event.target.previousElementSibling.value;
        let items = this.state.getState();
        let searchItem = [...items].filter((item) => {
            return item.title.includes(searchValue);
        });
        this.list.renderItems(searchItem);
    }

    fromMinToMax(event) {
        let sortItems = this.state.getState();
        let items = [...sortItems].sort((item1, item2) => item1.id - item2.id);
        this.list.renderItems(items);
    }

    fromMaxToMin(event) {
        let sortItems = this.state.getState();
        let items = [...sortItems].sort((item1, item2) => item2.id - item1.id);
        this.list.renderItems(items);
    }

    removeDivDetails(event) {
        let removeElement = document.querySelector('.div-details');
        if (!removeElement) return;
        removeElement.remove();
    }

    //create
    createControlElements() {
        const input = document.createElement('input');
        input.placeholder = 'Input your task';

        const addTaskButton = document.createElement('button');
        addTaskButton.innerText = 'Add';
        addTaskButton.addEventListener('click', this.addTaskToState);

        const clearAllButton = document.createElement('button');
        clearAllButton.innerText = 'Clear All';
        clearAllButton.addEventListener('click', this.clearAllTask);

        const searchInput = document.createElement('input');
        searchInput.placeholder = 'Search';

        const searchButton = document.createElement('button');
        searchButton.innerText = 'Search';
        searchButton.addEventListener('click', this.searchTask);

        const div = document.createElement('div');
        div.innerHTML = 'Sort ';

        const radio1 = document.createElement('input');
        radio1.type = 'radio';
        radio1.name = 'sort';
        radio1.addEventListener('click', this.fromMinToMax);

        const label1 = document.createElement('label');
        label1.innerText = 'min to max';
        label1.append(radio1);

        const radio2 = document.createElement('input');
        radio2.type = 'radio';
        radio2.name = 'sort';
        radio2.addEventListener('click', this.fromMaxToMin);

        const label2 = document.createElement('label');
        label2.innerText = 'max to min';
        label2.append(radio2);

        div.append(label1, label2);

        document.body.addEventListener('click', this.removeDivDetails);

        return [input, addTaskButton, clearAllButton, searchInput, searchButton, div];
    }
}
