import React, {Component} from 'react';

import {Subheader, FlatButton, List, ListItem, Divider, IconButton} from 'material-ui';
import * as Str from './Str'
import ApproveIcon from 'material-ui/svg-icons/action/done'
import RejectIcon from 'material-ui/svg-icons/content/clear'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
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
                this.getNewPendingView()

            ],
            activeElement: homeIndex,
        }

        this.handleSettingWindowChange = this.handleSettingWindowChange.bind(this);
        console.log(this.props);
    }

    handleReject(i){
        this.props.handleRejectReview(i);
        this.updatePendingTipView();
        console.log(i + " rejected");
        console.log(this.props);
    }

    handleApprove(i){
        this.props.handleApproveReview(i);
        this.updatePendingTipView();
        console.log(i + " approved");
        console.log(this.props);
    }

    updatePendingTipView(){
        var elements = this.state.pageElements;
        elements[approvePendingViewIndex] = this.getNewPendingView();
        this.setState({
            pageElements: elements
        })
    }

    getNewPendingView(){
        return <div>
            <List>
                {this.getSettingsHomeButton()}
                <Divider/>
                <Subheader>Pending Tips awaiting approval</Subheader>
                {
                    this.props.pendingTips.map((item, index) => {

                        return <div  key={index}>
                            <Divider/>
                            <ListItem primaryText={"Subject: " + item.subjectId}
                                      secondaryText={item.text}
                            />
                            <IconButton
                                onClick={() => this.handleApprove(index)}>
                                <ApproveIcon/>
                            </IconButton>
                            <IconButton
                                onClick={() => this.handleReject(index)}>
                                <RejectIcon/>
                            </IconButton>

                        </div>
                    })}
            </List>
        </div>;
    }

    render() {
        return (
            <div>
                {this.state.pageElements[this.state.activeElement]}
            </div>
        )
    }


    tryForAdminPanel() {
        if (this.props.settings.admin) {
            return <div>
                <Divider/>
                <Subheader>ADMIN SETTINGS</Subheader>
                <ListItem primaryText={Str.ACTION_TITLE_PENDINGTIPS + " (" + this.props.pendingTips.length + ")"}
                          onClick={() => this.handleSettingWindowChange(approvePendingViewIndex)}/>
                <ListItem primaryText={Str.ACTION_TITLE_ANALYTICS}/>
            </div>
        }
    }

    getSettingsHomeButton() {
        return <FlatButton onClick={() => this.handleSettingWindowChange(homeIndex)} secondary={true}
                           label={"Return to Settings"} fullWidth={true} icon={<BackIcon/>}/>
    }

    handleSettingWindowChange = (index) => {
        console.log(index + " changed to");
        this.setState({
            activeElement: index
        })
    }

}

export default Settings;