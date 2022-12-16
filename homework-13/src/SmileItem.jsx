import React from 'react';

class SmileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: props.smile.count };
        this.data = props.smile;
    }

    handleClick = () => {
        this.setState({ ...this.state, count: this.state.count + 1 });
        this.data.count = this.state.count;
    };

    render() {
        return (
            <li>
                <span>{this.data.smile}</span>
                <span>{this.state.count}</span>
                <input type="button" value="Vote!" onClick={this.handleClick} />
            </li>
        );
    }
}

export default SmileItem;
