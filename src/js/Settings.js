import React, {Component} from 'react';

import {Tabs, Tab} from 'material-ui';

import '../css/App.css';

class Settings extends Component {
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
                <h1>Settings</h1>
            </div>
        )
    }

}

export default Settings;