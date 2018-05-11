import React, {Component} from 'react';

import {Subheader, FlatButton, List, ListItem, Divider, IconButton, Card, CardHeader, CardText} from 'material-ui';
import * as Str from './Str'
import ApproveIcon from 'material-ui/svg-icons/action/done'
import RejectIcon from 'material-ui/svg-icons/content/clear'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import HubIcon from 'material-ui/svg-icons/hardware/device-hub'
import AlertIcon from 'material-ui/svg-icons/alert/error-outline'

import Axios from "axios/index";
import {Grid, Row, Col} from 'react-material-responsive-grid';

import '../css/App.css';
import {DATA_LH} from "./Str";

class Settings extends Component {
    constructor(props) {
        super(props);
        //console.log(props.settings);
        this.state = {
            pageSecondaryElement: <div></div>,
            uni: {
                name: '-',
            },
            faculty: {
                name: '-',
            },
            isOpen: false,
            pendingTips: {}
        }
        this.handleOpenSecondary = this.handleOpenSecondary.bind(this);
        this.handleCloseSecondary = this.handleCloseSecondary.bind(this);

    }

    componentDidMount() {
        this.updateWithNewUserSchoolData();
        this.getNewPendingTips();
    }

    handleReject(item, index) {
        Axios.post(Str.DATA_LIVE + Str.DATA_ADMIN + Str.DATA_REJECT_TIP + item._id, {
            subjectId: item.subject.id,
            text: item.text,
            ip: item.ip,
            submittedBy: item.submittedBy,
            rejectedBy: this.props.userId
        }).then(() => {
            this.handleRejectReview(index);
            this.updatePendingTipView();
            //console.log(item + " rejected");
            //console.log(this.props);
        });
    }

    handleApprove(item, index) {
        //console.log(item);
        Axios.post(Str.DATA_LIVE + Str.DATA_ADMIN + Str.DATA_APPROVE_TIP + item._id, {
            subjectId: item.subject.id,
            text: item.text,
            ip: item.ip,
            submittedBy: item.submittedBy,
            approvedBy: this.props.userId
        }).then(() => {
            this.handleApproveReview(index);
            this.updatePendingTipView();
            //console.log(item + " approved");
            //console.log(this.props);
        });

    }

    updatePendingTipView() {
        var newSecondaryElement = this.getNewPendingView();
        this.setState({
            pageSecondaryElement: newSecondaryElement,
        })
    }

    handleRejectReview(pendingTipsIndex) {
        this.rmFromPendingTips(pendingTipsIndex);

    }

    handleApproveReview(pendingTipsIndex) {
        // var reviewApproved = this.state.pendingTips[pendingTipsIndex];
        this.rmFromPendingTips(pendingTipsIndex);
    }

    rmFromPendingTips(index) {
        var pendingTipsArray = this.state.pendingTips;
        //remove from state
        pendingTipsArray.splice(index, 1);

        this.setState({
            pendingTips: pendingTipsArray
        }, () => //console.log("PendingTips " + index + " removed from saved"));
    }


    getNewPendingView() {
        return <div>
            <List>
                {this.getSettingsHomeButton()}
                <Divider/>
                <Subheader>Pending Tips awaiting approval</Subheader>
                {
                    this.state.pendingTips.map((item, index) => {

                        return <div key={index}>
                            <Divider/>
                            <ListItem primaryText={item.code}
                                      secondaryText={"\"" + item.text + "\""}
                            />
                            <IconButton
                                onClick={() => this.handleApprove(item, index)}>
                                <ApproveIcon/>
                            </IconButton>
                            <IconButton
                                onClick={() => this.handleReject(item, index)}>
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
                <Grid>
                <Row>
                    <Col xs4={(this.state.isOpen) ? 2 : 4} sm={(this.state.isOpen) ? 6 : 12}
                         lg={(this.state.isOpen) ? 8 : 12} xl={(this.state.isOpen) ? 8 : 12}>
                        <div>
                            <List>
                                <ListItem
                                    primaryText="School" secondaryText={this.state.uni.name}/>
                                <ListItem
                                    primaryText="Faculty" secondaryText={this.state.faculty.name}/>
                                <Divider/>
                                <ListItem
                                    primaryText={Str.ACTION_TITLE_DISCLAIMER}
                                    secondaryText={Str.ACTION_TITLE_DISCLAIMER_SUB}
                                    onClick={() => this.handleOpenSecondary(this.getNewDisclaimerView())}/>

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
                <ListItem primaryText={Str.ACTION_TITLE_PENDINGTIPS + " (" + this.state.pendingTips.length + ")"}
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
                    <CardHeader title={"What you need to know"}
                                subtitle={"How we make this safe to be honest and helpful to others"}
                                avatar={<AlertIcon/>}/>
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
        let pendingEndpoint = Str.DATA_LIVE + Str.DATA_PENDINGTIPS;
        Axios.get(pendingEndpoint)
            .then((res) => {
                this.setState({
                    pendingTips: res.data,
                }, () => {
                })
            })
            .catch((err) => {
                //console.log(err);
            });
    }

    updateWithNewUserSchoolData() {
        let GET_FACULTY_URL = Str.DATA_LIVE + Str.DATA_FACULTIES + this.props.settings.facultyId + "/" +
            Str.DATA_BASIC;
        let GET_UNI_URL = Str.DATA_LIVE + Str.DATA_SCHOOLS + this.props.settings.uniId + "/" +
            Str.DATA_BASIC;

        Axios.all([
            Axios.get(GET_FACULTY_URL),
            Axios.get(GET_UNI_URL)
        ])
            .then(Axios.spread((fac, uni) => {
                this.setState({
                    uni: {
                        name: uni.data.name,
                    },
                    faculty: {
                        name: fac.data.name
                    }
                }, () => {
                    //console.log(this.state);
                })
            }))
            .catch((err) => {
                //console.log(err);
            })
    }
}

export default Settings;