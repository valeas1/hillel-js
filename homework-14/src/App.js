import React from 'react';
import data from './data.json';
import { getComponent, createDataMap, path, START_PATH } from './utils';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = data;
        this.map = createDataMap(this.data);
        this.state = {
            search: '',
        };
        this.path = START_PATH;
        this.inputRef = React.createRef();
        this.search = false;
    }

    handleClick = (event) => {
        if (!this.inputRef.current.value.trim()) {
            this.path = [];
            this.search = false;
            this.forceUpdate(() => {
                this.setState({ ...this.state });
            });
            return;
        }
        let filter = this.map.filter((item) => {
            let splited = item.split('/');
            return splited[splited.length - 1].startsWith(this.inputRef.current.value);
        });
        this.path = path(filter);
        this.search = true;
        this.forceUpdate(() => {
            this.setState({ ...this.state, search: this.inputRef.current.value });
        });
    };

    render() {
        return (
            <React.Fragment>
                <input ref={this.inputRef} placeholder="Input item..."></input>
                <button onClick={this.handleClick}>Search</button>
                <ul>{getComponent(this.data, this.path, this.search)}</ul>
            </React.Fragment>
        );
    }
}

export default App;
