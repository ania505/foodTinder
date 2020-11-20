import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";


export default class Routes extends React.Component {
    constructor(props) {
        super(props);

    };


    render() {
        return (
            <Router>
                <div>
                    <h1>reached routes file</h1>
                    
                </div>
            </Router>

        )
    }
}