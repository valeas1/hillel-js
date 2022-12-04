export default class Services {
    static async requestServer(url, methods = 'GET', data = {}, clear = 'false') {
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
}
