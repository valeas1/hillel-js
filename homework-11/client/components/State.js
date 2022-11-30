export default class State {
    static instance;

    static getInstance() {
        if (!State.instance) {
            State.instance = new State();
        }
        return State.instance;
    }

    #state;

    #renderFn;

    constructor() {}

    async setState() {
        const response = await this.requestServer('/api/todos/');
        this.#state = response;
    }
    async addTaskToState(task) {
        let response = await this.requestServer('/api/todos/', 'POST', task);
        this.rerender();
    }
    async removeTaskFromState(id) {
        let response = await this.requestServer(`/api/todos/${id}`, 'DELETE');
        this.rerender();
    }

    //utilits
    async requestServer(url, methods = 'GET', data = {}, clear = 'false') {
        let state;
        if (methods !== 'GET') {
            await fetch(url, {
                method: methods,
                headers: {
                    'Content-Type': 'application/json',
                    clearall: clear,
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .then((res) => (state = res))
                .catch((error) => alert(`${error.message}`));
        } else {
            await fetch(url, {
                method: methods,
                headers: {
                    'Content-Type': 'application/json',
                    clearall: clear,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .then((res) => (state = res))
                .catch((error) => alert(`${error.message}`));
        }
        return state;
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
