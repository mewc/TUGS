import React, {Component} from 'react';

import {Subheader, FlatButton, List, ListItem, Divider, IconButton, Card, CardHeader, CardText} from 'material-ui';
import * as Str from './Str'
import ApproveIcon from 'material-ui/svg-icons/action/done'
import RejectIcon from 'material-ui/svg-icons/content/clear'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import HubIcon from 'material-ui/svg-icons/hardware/device-hub'
import AlertIcon from 'material-ui/svg-icons/alert/error-outline'

import {Grid, Row, Col} from 'react-material-responsive-grid';
import axios from "axios/index";

import '../css/App.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        console.log(props.settings);
        this.state = {
            pageSecondaryElement: <div></div>,
            uni: {
                name: '-',
            },
            faculty: {
                name: '-',
            },
            isOpen: false,
        }
        this.handleOpenSecondary = this.handleOpenSecondary.bind(this);
        this.handleCloseSecondary = this.handleCloseSecondary.bind(this);

    }

    componentDidMount() {
        this.updateWithNewUserSchoolData();
        this.getNewPendingTips();
    }

    handleReject(i) {
        this.props.handleRejectReview(i);
        this.updatePendingTipView();
        console.log(i + " rejected");
        console.log(this.props);
    }

    handleApprove(i) {
        this.props.handleApproveReview(i);
        this.updatePendingTipView();
        console.log(i + " approved");
        console.log(this.props);
    }

    updatePendingTipView() {
        var newSecondaryElement = this.getNewPendingView();
        this.setState({
            pageSecondaryElement: newSecondaryElement,
        })
    }

    getNewPendingView() {
        return <div>
            <List>
                {this.getSettingsHomeButton()}
                <Divider/>
                <Subheader>Pending Tips awaiting approval</Subheader>
                {
                    this.props.pendingTips.map((item, index) => {

                        return <div key={index}>
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
        var colSize = {
            left:
                [
                    {xs: 2, s: 6, l: 8, xl: 8}, //isOpen:true
                    {xs: 4, s: 11, l: 12, xl: 12}, //isOpen:false
                ],
            right:
                [
                    {xs: 2, s: 6, l: 8, xl: 8}, //isOpen:true
                    {xs: 0, s: 0, l: 0, xl: 0}, //isOpen:false
                ],
        };

        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs4={(this.state.isOpen) ? 2 : 4} sm={(this.state.isOpen) ? 6 : 12}
                             lg={(this.state.isOpen) ? 8 : 12} xl={(this.state.isOpen) ? 8 : 12}>
                            <div>
                                <List>
                                    <Subheader>Settings </Subheader>
                                    <ListItem
                                        primaryText="School" secondaryText={this.state.uni.name}/>
                                    <ListItem
                                        primaryText="Faculty" secondaryText={this.state.faculty.name}/>
                                    <Divider/>
                                    <ListItem
                                        primaryText="Disclaimer" secondaryText={""} onClick={() => this.handleOpenSecondary(this.getNewDisclaimerView())}/>

                                    <Divider/>
                                    {this.tryForAdminPanel()}
                                </List>
                            </div>
                        </Col>
                        <Col xs4={(this.state.isOpen) ? 2 : 0} sm={(this.state.isOpen) ? 5 : 0}
                             lg={(this.state.isOpen) ? 4 : 0} xl={(this.state.isOpen) ? 4 : 0}>
                            {this.state.pageSecondaryElement}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }


    tryForAdminPanel() {
        if (this.props.settings.admin) {
            return <div>
                <Divider/>
                <Subheader>ADMIN SETTINGS</Subheader>
                <ListItem primaryText={Str.ACTION_TITLE_PENDINGTIPS + " (" + this.props.pendingTips.length + ")"}
                          onClick={() => this.handleOpenSecondary(this.getNewPendingView())}/>
                <ListItem primaryText={Str.ACTION_TITLE_ANALYTICS}
                          onClick={() => this.handleOpenSecondary(this.getNewAnalyticsView())}/>
            </div>
        }
    }

    getNewAnalyticsView() {
        return <div>
            <List>
                {this.getSettingsHomeButton()}
                <Divider/>
                <Subheader>Analytics</Subheader>
                <Divider/>
                <Card>
                    <CardHeader title={"Data"} subtitle={"Counts and contributions"} avatar={<HubIcon/>}/>
                    <CardText>
                        {"In here will go, say, a graph and chart and counts and other analytics of our data"}
                    </CardText>
                </Card>
            </List>
        </div>;
    }

    getNewDisclaimerView() {
        return <div>
            <List>
                {this.getSettingsHomeButton()}
                <Divider/>
                <Card>
                    <CardHeader title={"What you need to know"} subtitle={"How we make this safe to be honest and helpful to others"} avatar={<AlertIcon/>}/>
                    <CardText>
                        {Str.APP_PRIVACY_TEXT}
                    </CardText>
                </Card>
            </List>
        </div>;
    }

    getSettingsHomeButton() {
        return <FlatButton onClick={() => this.handleCloseSecondary()} primary={true}
                           label={"Return"} fullWidth={true} icon={<BackIcon/>}/>
    }

    handleOpenSecondary = (element) => {
        this.setState({
            pageSecondaryElement: element,
            isOpen: true,
        })
    }

    handleCloseSecondary = () => {
        this.setState({
            pageSecondaryElement: <div></div>,
            isOpen: false,
        })
    }

    getNewPendingTips() {
        return '';
        //for axios when pending tips backend is up
    }

    updateWithNewUserSchoolData() {
        axios.get(Str.DATA_LH + Str.DATA_SCHOOLS + "/"
            + this.props.settings.uniId + Str.DATA_FACULTIES + "/" + this.props.settings.facultyId +
            Str.DATA_BASIC)
            .then((res) => {
                console.log(res.data[0]);
                this.setState({
                    uni: {
                        name: res.data[0].name,
                    },
                    faculty: res.data[0].faculty[0]
                }, () => {
                    console.log(this.state);
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export default Settings;