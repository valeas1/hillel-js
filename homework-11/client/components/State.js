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
        const response = await Services.requestServer('/api/todos/');
        this.#state = response;

        this.rerender();
    }
    async addTaskToState(task) {
        let response = await Services.requestServer('/api/todos/', 'POST', task);
        return response;
        // this.setState();
    }
    async removeTaskFromState(id) {
        let response = await Services.requestServer(`/api/todos/${id}`, 'DELETE');
    }

    async updateTaskInState(id, task) {
        return await Services.requestServer(`/api/todos/${id}`, 'PATCH', task);
    }

    async removeAllTaskFromState() {
        return await Services.requestServer(`/api/todos`, 'DELETE', {}, 'true');
    }

    //utilits
    // async requestServer(url, methods = 'GET', data = {}, clear = 'false') {
    //     let state;
    //     if (methods !== 'GET') {
    //         await fetch(url, {
    //             method: methods,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 clearall: clear,
    //             },
    //             body: JSON.stringify(data),
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     return response.json();
    //                 }
    //                 throw new Error('Something went wrong');
    //             })
    //             .then((res) => (state = res))
    //             .catch((error) => alert(`${error.message}`));
    //     } else {
    //         await fetch(url, {
    //             method: methods,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 clearall: clear,
    //             },
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     return response.json();
    //                 }
    //                 throw new Error('Something went wrong');
    //             })
    //             .then((res) => (state = res))
    //             .catch((error) => alert(`${error.message}`));
    //     }
    //     return state;
    // }
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
