import React from 'react';

class File extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <li>File: {this.props.name}</li>
            </React.Fragment>
        );
    }
}

export default File;
