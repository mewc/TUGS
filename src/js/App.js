import React, {Component} from 'react';

import TugsMuiTheme from './TugsMuiTheme';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationItem,
    Paper,
    Snackbar,
} from 'material-ui';
import MTP from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconSettingsImport from 'material-ui/svg-icons/action/settings';
import IconPersonImport from 'material-ui/svg-icons/social/person';
import IconCatalogImport from 'material-ui/svg-icons/action/view-quilt';
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
import {baseUser} from '../resources/baseUser';
import LoginButton from './LoginButton';
import LoggedInMenu from './LoggedInMenu';
import firebase from 'firebase';


const IconSettings = <IconSettingsImport/>;
const IconYou = <IconPersonImport/>;
const IconCatalog = <IconCatalogImport/>;

const SETTINGS_INDEX = 2;
const STAR_INDEX = 1;
const CATALOG_INDEX = 0;
const SIGNED_OUT_INDEX = -1;

const SIGNED_OUT_AUTH = {
    valid: false,
    user: baseUser,
};

let SIGNED_OUT_BODYCONTENT = <div></div>;

class App extends Component {
    constructor(props) {
        super(props);
        SIGNED_OUT_BODYCONTENT =
            <div style={{margin: "30%"}}><h2>Please <LoginButton isAdmin={false} checkLogin={this.checkLogin.bind(this)}/> now</h2>
            </div>;
        this.state = {
            auth: SIGNED_OUT_AUTH,
            selectedBottomNavIndex: -1, //so one isnt highlighted at the start if not auth'd
            bodyContent: SIGNED_OUT_BODYCONTENT,
            snackbar: {
                open: false,
                message: "Snackbar message",
            },

        };
        this.handleSignout = this.handleSignout.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.handleRequestToLeaveReview = this.handleRequestToLeaveReview.bind(this);
        this.logState = this.logState.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.handleSignout = this.handleSignout.bind(this);

        var config = {
            apiKey: "AIzaSyDMkUPowjkFVixjSVuOYFBawhZOAgGOBCQ",
            authDomain: "tugs-app.firebaseapp.com",
            databaseURL: "https://tugs-app.firebaseio.com",
            projectId: "tugs-app",
            storageBucket: "tugs-app.appspot.com",
            messagingSenderId: "630752733618"
        };
        firebase.initializeApp(config);
    }

    componentDidMount() {
        // this.checkLogin(); //which callbacks for this.selectBottomNav(CATALOG_INDEX);

    }

    handleSignout = () => {
        //console.log("User " + this.state.auth.user.id + "signing out");
        this.setState({
            auth: SIGNED_OUT_AUTH,
            bodyContent: SIGNED_OUT_BODYCONTENT,
        }, () => {
            this.triggerSnackbar(Str.ACTION_AUTH_SIGNOUT);
        });
    }

    checkLogin(isAdmin) {
        //get firebase user login
        //  https://firebase.google.com/docs/auth/?authuser=0
        let isValid = true;
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("User logged in");
            console.log(token);
            console.log(user);

            this.setState({
                auth: {
                    ...this.state.auth,
                    valid: true,
                    token: token,
                    user: {
                        ...this.state.auth.user,
                        // id: user,
                          id: 10000004, //This is used here because full user saving isn't done and we use the default test user
                          name: user.displayName,
                          isAdmin: isAdmin
                    },
                },
            },() => {
                console.log("User logged in");
                console.log(this.state.auth.valid);
                console.log(this.state.auth.user);
                this.selectBottomNav(CATALOG_INDEX);
            });


            }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...

        });

    }

    submitUser(){
      let AddToUser = Str.DATA_LIVE + Str.DATA_USERS + this.props.userId + '/' + Str.DATA_ADD_STARRATE + this.props.subjectId;
      let AddToSubject = Str.DATA_LIVE + Str.DATA_SUBJECTS + this.props.subjectId + '/' + Str.DATA_ADD_STARRATE;
      Axios.post(AddToUser, {value: this.state.rateValue}).then(() => {
          Axios.post(AddToSubject, {value: this.state.rateValue})
      });
      this.handleDialogToggle();
      this.setState({
          disabled: true,
      })
      this.props.updateUserInfo(this.props.userId);
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
        Axios.get(Str.DATA_LIVE + Str.DATA_USERS + id)
            .then((res) => {
                this.setState({
                    auth: {
                        ...this.state.auth, //without this valid gets lost, user is overridden in next line
                        user: res.data
                    },
                }, () => {
                    //console.log("data updated");
                    this.selectBottomNav(CATALOG_INDEX);
                })
            })
            .catch((err) => {
                //console.log(err);
            });
    }


    rmReview(id) {//basically the same as saved, can clean up
        var array = this.state.auth.user.tipped;
        var index = array.indexOf(id)
        array.splice(index, 1);
        this.setState({
            user: {
                ...this.state.auth.user, //this adds all current user attr. and lets us overwrite what we want to
                tipped: array,
            }
        }, () => {

        })
    }

    //this is weirdly changing things locally after changing it in backend. Could have persistence issues
    addPendingTip(subjectId, reviewText) {//basically the same as saved, can clean up
        Axios.post(Str.DATA_LIVE + DATA_USERS + this.state.auth.user.id + "/" + Str.DATA_ADD_TIP + subjectId).then(() => {
            Axios.post(Str.DATA_LIVE + Str.DATA_PENDINGTIPS + Str.DATA_ADD_TIP + subjectId, {
                text: reviewText,
                ip: "10.0.0.10",
                submittedBy: this.state.auth.user.id
            })
        }).then(() => {
            this.setState({
                auth: {
                    ...this.state.auth, //user will have been logged in to submit this, its fine to do
                    user: {
                        ...this.state.auth.user, //this adds all current user attr. and lets us overwrite what we want to
                        tipped: [...this.state.auth.user.tipped, subjectId],
                    }
                }
            }, () => {
                this.triggerSnackbar(Str.ACTION_SUCCESS_LEAVEREVIEW);
            })
        })
    }


    alreadyReviewed(rvwId, rvwArray) { //basically the same as saved, can clean up
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
        //console.log(subjectId + " wants to be reviewed by " + this.state.auth.user.id + " with tip " + reviewText);

        if (this.alreadyReviewed(subjectId, this.state.auth.user.tipped)) {
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
                user={this.state.auth.user}
                handleRequestToLeaveReview={this.handleRequestToLeaveReview}
                updateUserInfo={this.updateUserInfo}
            />;
        switch (index) {
            case SETTINGS_INDEX:
                newBodyContent =
                    <Settings settings={this.state.auth.user.settings}
                              userId={this.state.auth.user.id}
                    />;
                break;
            case STAR_INDEX:
                newBodyContent =
                    <MeDashboard
                        user={this.state.auth.user}
                        handleRequestToLeaveReview={this.handleRequestToLeaveReview}
                        handleStarToggle={this.handleStarToggle}
                    />;
                break;
            case CATALOG_INDEX:
                newBodyContent = catalog;
                break;
            case SIGNED_OUT_INDEX:
                newBodyContent = SIGNED_OUT_BODYCONTENT;
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
                                    {this.state.auth.valid
                                        ? <LoggedInMenu handleSignout={this.handleSignout}/>
                                        : <LoginButton isAdmin={true} checkLogin={this.checkLogin}/>}
                                    {/*{this.state.auth.user.settings.admin ? <FlatButton label="STATE" onClick={this.logState}/> : <div/>}*/}
                                </div>
                            }
                            iconElementLeft={
                                <div></div>
                            }
                            style={this.state.auth.user.settings.style}
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
                        {(this.state.auth.valid) ?
                            <Paper zDepth={2}>
                                <BottomNavigation selectedIndex={this.state.selectedBottomNavIndex}>
                                    <BottomNavigationItem
                                        label={Str.NAV_TITLE_CATALOG}
                                        icon={IconCatalog}
                                        onClick={() => this.selectBottomNav(0)}
                                    />
                                    <BottomNavigationItem
                                        label={(this.state.auth.user) ? this.state.auth.user.name : Str.NAV_TITLE_YOU}
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
                            : <div></div>}
                    </div>
                </div>
            </MTP>

        );
    }

}


export default App;
