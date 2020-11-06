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
                    <h2>Welcome to MeloMood!</h2>
                    <h4>MeloMood is the mood tracker that embraces your mood through music.</h4>
                    <p>Log in to get started!</p>
                    
                </div>
            </Router>

        )
    }
}