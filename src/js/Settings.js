import React, {Component} from 'react';

import {Subheader,
    // Tab,
    List, ListItem, Divider} from 'material-ui';
import * as Str from './Str'
import '../css/App.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        console.log(props);
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
                        primaryText="University" secondaryText={this.props.settings.uniId}/>
                    <ListItem
                        primaryText="Faculty" secondaryText={this.props.settings.uniId}/>
                    <Divider/>
                    <ListItem
                        primaryText="Disclaimer" secondaryText={""}/>

                    <Divider/>
                    {this.tryForAdminPanel()}
                </List>
            </div>
        )
    }

    tryForAdminPanel() {
        if (this.props.settings.admin) {
            return <div>
                <Divider/>
                <Subheader>ADMIN SETTINGS</Subheader>
                <ListItem primaryText={Str.ACTION_TITLE_PENDINGTIPS}/>
                <ListItem primaryText={Str.ACTION_TITLE_ANALYTICS}/>
            </div>
        }
    }

}

export default Settings;