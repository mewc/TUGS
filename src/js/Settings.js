import React, {Component} from 'react';

import {Subheader, Tab, List, ListItem, Divider} from 'material-ui';

import '../css/App.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1
        }
    }

    render() {
        return (
            <div>
                {/*<Tabs initialSelectedIndex={this.state.activeIndex}>*/}
                    {/*<Tab label="Data" value={0}/>*/}
                    {/*<Tab label="University" value={1}/>*/}
                    {/*<Tab label="Profile" value={2}/>*/}
                {/*</Tabs>*/}
                {/*<h1>Settings</h1>*/}
                <List>
                    <Subheader>Settings </Subheader>
                    <ListItem
                        primaryText="University" secondaryText={this.props.settings.uniId} />
                    <Divider/>
                </List>
            </div>
        )
    }

}

export default Settings;