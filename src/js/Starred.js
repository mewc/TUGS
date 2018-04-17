import React, {Component} from 'react';

import {Tabs, Tab} from 'material-ui';

import '../css/App.css';

class Starred extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tabs>
                    <Tab label="Tab One" value={0}/>
                    <Tab label="Tab Two" value={1}/>
                    <Tab label="Tab Three" value={2}/>
                    <Tab label="Tab Four" value={3}/>
                </Tabs>
                <h1>Starred</h1>
            </div>
        )
    }

}

export default Starred;