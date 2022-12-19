import React from 'react';

class SmileItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: props.smileRef.count };
    }

    handleClick = () => {
        this.setState({ ...this.state, count: this.state.count + 1 });
        this.props.smileRef.count = this.state.count;
    };

    render() {
        return (
            <li>
                <span>{this.props.smileRef.smile}</span>
                <span>{this.state.count}</span>
                <input type="button" value="Vote!" onClick={this.handleClick} />
            </li>
        );
    }
}

export default SmileItem;
