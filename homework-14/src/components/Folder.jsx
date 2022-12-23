import React from 'react';
import { getComponent } from '../utils';

class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: this.isOpenFolder(), path: this.props.expandedFolders.join('') };
        // console.log(this.props);
    }

    handleClick = (e) => {
        e.stopPropagation();
        this.setState({ isOpen: !this.state.isOpen });
    };

    isOpenFolder = () => {
        // console.log(this.props.name, this.props.expandedFolders);
        return this.props.expandedFolders.includes(`/${this.props.name}`);
    };

    createNextPath = () => {
        return this.props.expandedFolders
            .filter((item) => item.includes(`${this.props.name}`))
            .map((item) => item.replace(`/${this.props.name}`, ''))
            .filter((item) => !!item);
    };

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.name, prevProps.expandedFolders.join('') !== prevState.path);
        if (prevProps.expandedFolders.join('') !== prevState.path) {
            this.setState((state, props) => {
                return { ...state, isOpen: this.isOpenFolder(), path: props.expandedFolders.join('') };
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <li onClick={this.handleClick}>Folder: {this.props.name}</li>
                {this.state.isOpen ? (
                    <ul>{getComponent(this.props.children, this.createNextPath(), this.props.search)}</ul>
                ) : null}
            </React.Fragment>
        );
    }
}

export default Folder;
