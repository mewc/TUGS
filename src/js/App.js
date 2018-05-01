import React, {Component} from 'react';
import axios from 'axios';

import TugsMuiTheme from './TugsMuiTheme';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationItem,
    Paper,
    FlatButton,
    IconButton,
    IconMenu,
    MenuItem,
    Snackbar,
} from 'material-ui';
import MTP from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconSettingsImport from 'material-ui/svg-icons/action/settings';
import IconPersonImport from 'material-ui/svg-icons/social/person';
import IconCatalogImport from 'material-ui/svg-icons/action/view-quilt';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TugsLogo from '../resources/branding/tugs_logo_wrapped.png'

import Settings from './Settings';
import Catalog from './Catalog';
import MeDashboard from './MeDashboard';
import * as Str from './Str';
import '../css/App.css';
import {testData} from '../resources/testData'

const IconSettings = <IconSettingsImport/>;
const IconYou = <IconPersonImport/>;
const IconCatalog = <IconCatalogImport/>;

const SETTINGS_INDEX = 2;
const STAR_INDEX = 1;
const CATALOG_INDEX = 0;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

            loggedIn: true,
            selectedBottomNavIndex: 0,
            bodyContent: '',
            snackbar: {
                open: false,
                message: "Snackbar message",
            },
            user: testData.users[0],
            pendingTips: [
                {
                    userid: 10000001,
                    subjectId: 110001,
                    ip: "10.0.0.10",
                    text: "This is a first"
                },
                {
                    userid: 10000001,
                    subjectId: 110002,
                    ip: "10.0.0.10",
                    text: "This is a Second"
                },
                {
                    userid: 10000001,
                    subjectId: 110003,
                    ip: "10.0.0.10",
                    text: "This is a Third"
                }
            ],
        };
        this.handleRejectReview = this.handleRejectReview.bind(this);
        this.handleApproveReview = this.handleApproveReview.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
        this.handleStarToggle = this.handleStarToggle.bind(this);
        this.handleRequestToLeaveReview = this.handleRequestToLeaveReview.bind(this);
        this.logState = this.logState.bind(this);
    }



    handleSnackbarTrigger = (message) => {
        //when theres something that can use a snackbar, use this
    }

    handleSignout = () => {
        console.log("signing out");
        this.setState({
            loggedIn: false,
        })
    }


    componentDidMount() {
        this.selectBottomNav(CATALOG_INDEX);
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            }
        })

    }

    handleStarToggle(id) {
        var prevStarred = this.state.user.starred;
        if (this.isStarred(id, prevStarred)) {
            //remove star
            this.rmStarred(id)
        } else {
            //add starred
            this.addStarred(id)
        }

    }


    isStarred(toggledId, starredArray) {
        var is = false;
        for (var i = 0; i < starredArray.length; i++) {
            if (starredArray[i] === toggledId) {
                return true;
            } else {
                is = false;
            }
        }
        return is;
    }

    rmStarred(id) { //basically the same as review, can clean up
        var array = this.state.user.starred;
        var index = array.indexOf(id)
        array.splice(index, 1);
        this.setState({
            user: {
                ...this.state.user, //this adds all current user attr. and lets us overwrite what we want to
                starred: array,
            }
        }, () => {

        })
    }

    addStarred(id) {//basically the same as review, can clean up
        this.setState({
            user: {
                ...this.state.user, //this adds all current user attr. and lets us overwrite what we want to
                starred: [...this.state.user.starred, id]
            }
        }, () => {
        })
    }

    handleRejectReview(pendingTipsIndex) {
        this.rmFromPendingTips(pendingTipsIndex);

    }

    handleApproveReview(pendingTipsIndex) {
        var reviewApproved = this.state.pendingTips[pendingTipsIndex];
        //add review to the subject
        this.addApprovedTipToSubject(pendingTipsIndex);

        this.rmFromPendingTips(pendingTipsIndex);
    }

    rmFromPendingTips(index) {
        var pendingTipsArray = this.state.pendingTips;
        //remove from state
        pendingTipsArray.splice(index, 1);

        this.setState({
            pendingTips: pendingTipsArray
        }, () => console.log("PendingTips " + index + " removed from saved"));
    }


    rmReview(id) {//basically the same as starred, can clean up
        var array = this.state.user.tipped;
        var index = array.indexOf(id)
        array.splice(index, 1);
        this.setState({
            user: {
                ...this.state.user, //this adds all current user attr. and lets us overwrite what we want to
                tipped: array,
            }
        }, () => {

        })
    }


    //this is where we need to be able to, in the back end,
    // submit a tip text to a subject id and it just ingest it
    // then we just update the front end with the update and we're all gooooood
    addApprovedTipToSubject(index) {
        var fullTip = this.state.pendingTips[index];

        var tip = {
            userid: 10000001,
            subjectId: 110001,
            ip: "10.0.0.10",
            text: "This is a first"
        }


        // this.updateDataset();  //will need to be run when db integration is up and going
    }


    addPendingTip(subjectId, reviewText) {//basically the same as starred, can clean up
        this.setState({
            user: {
                ...this.state.user, //this adds all current user attr. and lets us overwrite what we want to
                tipped: [...this.state.user.tipped, subjectId],
            },
            pendingTips: [...this.state.pendingTips,
                {
                    userid: this.state.user.id,
                    text: reviewText,
                    subjectId: subjectId,
                    ip: "10.0.0.0",
                }
            ]
        }, () => {
            this.triggerSnackbar(Str.ACTION_SUCCESS_LEAVEREVIEW);
            console.log(this.state.pendingTips);
        })
    }

    alreadyReviewed(rvwId, rvwArray) { //basically the same as starred, can clean up
        var is = false;
        for (var i = 0; i < rvwArray.length; i++) {
            if (rvwArray[i] === rvwId) {
                return true;
            } else {
                is = false;
            }
        }
        return is;
    }

    triggerSnackbar(message) {
        this.setState({
            snackbar: {
                open: true,
                message: message,
            },
        })
    }


    handleRequestToLeaveReview = (subjectId, reviewText) => {
        console.log(subjectId + " wants to be reviewed by " + this.state.user.id + " with tip " + reviewText);

        if (this.alreadyReviewed(subjectId, this.state.user.tipped)) {
            this.triggerSnackbar("Review already left for that subject, try another");
        } else {
            this.addPendingTip(subjectId, reviewText);
        }

        //add another button to bottom nav, show the review component in body, pass in data for subject

    }

    selectBottomNav = (index) => {
        var newBodyContent = 1 + 1;
        newBodyContent = this.state.bodyContent;
        var catalog =

                <Catalog
                         user={this.state.user}
                         loggedIn={this.state.loggedIn}
                         handleRequestToLeaveReview={this.handleRequestToLeaveReview}
                         handleStarToggle={this.handleStarToggle}/>

        switch (index) {
            case SETTINGS_INDEX:
                newBodyContent =

                    <Settings settings={this.state.user.settings}
                              pendingTips={this.state.pendingTips}
                              handleApproveReview={this.handleApproveReview}
                              handleRejectReview={this.handleRejectReview}/>;

                break;
            case STAR_INDEX:
                newBodyContent =

                    <MeDashboard
                             user={this.state.user}
                             handleRequestToLeaveReview={this.handleRequestToLeaveReview}
                             handleStarToggle={this.handleStarToggle}/>;

                break;
            case CATALOG_INDEX:
                newBodyContent = catalog;
                break;
            default:
                newBodyContent = catalog;
        }
        this.setState({
            selectedBottomNavIndex: index,
            bodyContent: newBodyContent
        })
    }

    logState() {
        console.log(this.state);
    }

    render() {
        return (
            <MTP muiTheme={getMuiTheme(TugsMuiTheme)} >
                <div className="App">
                    <AppBar
                        title={<img src={TugsLogo} alt={Str.APP_TITLE_FULL} className="appbar-logo"/>}
                        iconElementRight={
                            <div>
                                {this.state.loggedIn ? <Logged/> : <Login/>}
                                {this.state.user.settings.admin ? <FlatButton label="STATE" onClick={this.logState}/> :
                                    <div/>}
                            </div>
                        }
                        iconElementLeft={
                            <div></div>
                        }
                        style={this.state.user.settings.style}
                    />

                    {this.state.bodyContent}

                    {<Snackbar
                        open={this.state.snackbar.open}
                        message={this.state.snackbar.message}
                        autoHideDuration={5000}
                        onRequestClose={this.handleSnackbarClose}
                    />}

                    <div className="BottomNav">
                        <Paper zDepth={1}>
                            <BottomNavigation selectedIndex={this.state.selectedBottomNavIndex}>
                                <BottomNavigationItem
                                    label={Str.NAV_TITLE_CATALOG}
                                    icon={IconCatalog}
                                    onClick={() => this.selectBottomNav(0)}
                                />
                                <BottomNavigationItem
                                    label={Str.NAV_TITLE_YOU}
                                    icon={IconYou}
                                    onClick={() => this.selectBottomNav(1)}
                                />
                                <BottomNavigationItem
                                    label={Str.NAV_TITLE_SETTINGS}
                                    icon={IconSettings}
                                    onClick={() => this.selectBottomNav(2)}
                                />
                            </BottomNavigation>
                        </Paper>
                    </div>
                </div>
            </MTP>

        );
    }

}

const Logged = (props) => (
        <IconMenu {...props}
                  iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <MenuItem primaryText={Str.NAV_TITLE_SIGNOUT} onClick={() => this.handleSignout}/>
        </IconMenu>
    )
;

class Login extends Component {
    static muiName = 'FlatButton';

    render() {
        return (<FlatButton {...this.props} label={Str.NAV_TITLE_LOGIN}/>);
    }
}


export default App;
