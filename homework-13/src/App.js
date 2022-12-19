import React from 'react';
import SmileItem from './SmileItem';
// import Resalts from './Resalts';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            { smile: '😀', count: 0 },
            { smile: '😂', count: 0 },
            { smile: '😄', count: 0 },
            { smile: '😈', count: 0 },
        ];
        this.state = { show: false };
        this.winner = undefined;
    }

    handleClick = () => {
        this.data.sort((item1, item2) => item2.count - item1.count);
        this.winner = this.data[0];
        this.setState({ ...this.state, show: true });
    };

    render() {
        return (
            <React.Fragment>
                <ul>
                    {this.data.map((item, index) => (
                        <SmileItem smileRef={item} key={index} />
                    ))}
                </ul>
                <button onClick={this.handleClick}>Show Results</button>
                {this.state.show && <p>Winner - {this.winner.smile}</p>}
            </React.Fragment>
        );
    }
}

export default App;
