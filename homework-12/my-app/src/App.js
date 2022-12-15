import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

function App() {
    return (
        <React.Fragment>
            <Header></Header>
            <div className="main conteiner">
                <Sidebar></Sidebar>
                <Content></Content>
            </div>
        </React.Fragment>
    );
}

export default App;
