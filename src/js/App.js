import React, {Component} from 'react';

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
import TugsLogo from '../resources/branding/tugs_logo_wrapped.png';
import Axios from 'axios';
import Headroom from 'react-headroom';

import Settings from './Settings';
import Catalog from './Catalog';
import MeDashboard from './MeDashboard';
import * as Str from './Str';
import '../css/App.css';
import {DATA_LH} from "./Str";
import {DATA_USERS} from "./Str";
import {baseUser} from '../resources/baseUser'

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
            user: baseUser,
            selectedBottomNavIndex: 0,
            bodyContent: '',
            snackbar: {
                open: false,
                message: "Snackbar message",
            },

        };
        this.handleSignout = this.handleSignout.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
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
        this.checkLogin(); //which callbacks for this.selectBottomNav(CATALOG_INDEX);

    }

    checkLogin() {
        //todo handle auth and setting of user state here
        //get default user
        console.log("Checking user login status")
        Axios.get(Str.DATA_LH + Str.DATA_USERS + Str.DATA_USER_DEFAULTID)
            .then((res) => {
                this.setState({
                    user: res.data,
                }, () => {
                    console.log("User logged in");
                    this.selectBottomNav(CATALOG_INDEX);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            }
        })

    }

    updateUserInfo(id) {

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

    addPendingTip(subjectId, reviewText) {//basically the same as starred, can clean up
        Axios.post(DATA_LH + DATA_USERS + this.state.user.id + "/" + Str.DATA_ADD_TIP + subjectId).then(() => {
            Axios.post(DATA_LH + Str.DATA_PENDINGTIPS + Str.DATA_ADD_TIP + subjectId, {
                text: reviewText,
                ip: "10.0.0.10",
                submittedBy: this.state.user.id
            })
        }).then(() => {
            this.setState({
                user: {
                    ...this.state.user, //this adds all current user attr. and lets us overwrite what we want to
                    tipped: [...this.state.user.tipped, subjectId],
                }
                }, () => {
                this.triggerSnackbar(Str.ACTION_SUCCESS_LEAVEREVIEW);
                console.log(this.state.pendingTips);
            })
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
                updateUserInfo={this.updateUserInfo}
            />;
        switch (index) {
            case SETTINGS_INDEX:
                newBodyContent =
                    <Settings settings={this.state.user.settings}
                              userId={this.state.user.id}
                    />;
                break;
            case STAR_INDEX:
                newBodyContent =
                    <MeDashboard
                        user={this.state.user}
                        handleRequestToLeaveReview={this.handleRequestToLeaveReview}
                        handleStarToggle={this.handleStarToggle}
                    />;
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
            <MTP muiTheme={getMuiTheme(TugsMuiTheme)}>
                <div className="App">
                    <Headroom>
                        <AppBar
                            title={<img src={TugsLogo} alt={Str.APP_TITLE_FULL} className="appbar-logo"/>}
                            iconElementRight={
                                <div>
                                    {this.state.loggedIn ? <Logged/> : <Login/>}
                                    {this.state.user.settings.admin ?
                                        <FlatButton label="STATE" onClick={this.logState}/> :
                                        <div/>}
                                    {this.state.user.settings.admin ?
                                        <FlatButton label="SNACK" onClick={() => this.triggerSnackbar("TEST THIS")}/> :
                                        <div/>}
                                </div>
                            }
                            iconElementLeft={
                                <div></div>
                            }
                            style={this.state.user.settings.style}
                        />
                    </Headroom>

                    <div className={"body-content"}>
                        {this.state.bodyContent}
                    </div>

                    {<Snackbar
                        open={this.state.snackbar.open}
                        message={this.state.snackbar.message}
                        autoHideDuration={4000}
                        onRequestClose={this.handleSnackbarClose}
                        className={"snackbar"}
                    />}

                    <div className="BottomNav">
                            <Paper zDepth={2}>
                                <BottomNavigation selectedIndex={this.state.selectedBottomNavIndex}>
                                    <BottomNavigationItem
                                        label={Str.NAV_TITLE_CATALOG}
                                        icon={IconCatalog}
                                        onClick={() => this.selectBottomNav(0)}
                                    />
                                    <BottomNavigationItem
                                        label={(this.state.user) ? this.state.user.name : Str.NAV_TITLE_YOU}
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
