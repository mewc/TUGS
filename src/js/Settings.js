import React, {Component} from 'react';

import {Subheader, FlatButton, List, ListItem, Divider, IconButton} from 'material-ui';
import * as Str from './Str'
import ApproveIcon from 'material-ui/svg-icons/action/done'
import RejectIcon from 'material-ui/svg-icons/content/clear'
import '../css/App.css';

const homeIndex = 0;
const approvePendingViewIndex = 1;

class Settings extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            pageElements: [
                <div>
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
                </div>,

                <div>
                    <List>
                        {this.getSettingsHomeButton()}
                        <Divider/>
                        <Subheader>Pending Tips awaiting approval</Subheader>
                        {this.props.pendingTips.map((item) => {

                            return <ListItem key={item.subjectId}
                                primaryText={"Subject: " + item.subjectId} secondaryText={item.text}>
                                <IconButton
                                            onClick={this.handleApprove}>
                                    <ApproveIcon/>
                                </IconButton>
                                <IconButton
                                            onClick={this.handleReject}>
                                    <RejectIcon/>
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
                </div>
            ],
            activeElement: homeIndex,
        }

        this.handleSettingWindowChange = this.handleSettingWindowChange.bind(this);
    }

    render() {
        return (
            <div>
                {this.state.pageElements[this.state.activeElement]}
            </div>
        )
    }

    handleApprove(){

    }

    handleReject(){

    }

    tryForAdminPanel() {
        if (this.props.settings.admin) {
            return <div>
                <Divider/>
                <Subheader>ADMIN SETTINGS</Subheader>
                <ListItem primaryText={Str.ACTION_TITLE_PENDINGTIPS + " (" + this.props.pendingTips.length + ")"} onClick={() => this.handleSettingWindowChange(approvePendingViewIndex)}/>
                <ListItem primaryText={Str.ACTION_TITLE_ANALYTICS}/>
            </div>
        }
    }

    getSettingsHomeButton(){
        return <FlatButton onClick={() => this.handleSettingWindowChange(homeIndex)} secondary={true} label={"Return to Settings"} fullWidth={true}/>
    }

    handleSettingWindowChange = (index) => {
        console.log(index + " changed to");
        this.setState({
            activeElement: index
        })
    }

}

export default Settings;