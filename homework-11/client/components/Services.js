import { API_URL } from './variebles.js';

export default class Services {
    // static async requestServer(url, methods = 'GET', data = {}, clear = 'false') {
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

    static async getTodos() {
        let result;

        await fetch(`${API_URL}/api/todos/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res) => (result = res))
            .catch((error) => alert(`${error.message}`));

        return result;
    }

    static async getDefiniteTodos(id) {
        let result;

        await fetch(`${API_URL}/api/todos/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res) => (result = res))
            .catch((error) => alert(`${error.message}`));

        return result;
    }

    static async addTask(task) {
        let result;

        await fetch(`${API_URL}/api/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res) => (result = res))
            .catch((error) => alert(`${error.message}`));

        return result;
    }

    static async removeTask(id) {
        let result;

        await fetch(`${API_URL}/api/todos/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res) => (result = res))
            .catch((error) => alert(`${error.message}`));

        return result;
    }

    static async cleanTodos() {
        let result;

        await fetch(`${API_URL}/api/todos/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                clearall: true,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res) => (result = res))
            .catch((error) => alert(`${error.message}`));

        return result;
    }

    static async updateTask(id, task) {
        let result;

        await fetch(`${API_URL}/api/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res) => (result = res))
            .catch((error) => alert(`${error.message}`));

        return result;
    }
}
