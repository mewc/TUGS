import React, {Component} from 'react';

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

import IconSettingsImport from 'material-ui/svg-icons/action/settings';
import IconStarsImport from 'material-ui/svg-icons/action/stars';
import IconCatalogImport from 'material-ui/svg-icons/action/view-quilt';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TugsLogo from '../resources/branding/tugs_logo_wrapped.png'

import Settings from './Settings';
import Catalog from './Catalog';
import Starred from './Starred';
import * as Str from './Str';
import '../css/App.css';
import {testData} from '../resources/testData'

const IconSettings = <IconSettingsImport/>;
const IconStars = <IconStarsImport/>;
const IconCatalog = <IconCatalogImport/>;

const SETTINGS_INDEX = 2;
const STAR_INDEX = 1;
const CATALOG_INDEX = 0;

class App extends Component {
    constructor(props) {
        super(props);
        var testUser = {
            loggedIn: false,
            starred: [
                1, 3
            ],
            id: 999,
            settings: {

                uni: "Monash",
                style: {
                    backgroundColor: "#e7e7e7"
                }
            }
        };

        this.state = {
            selectedBottomNavIndex: 0,
            bodyContent: '',
            snackbar: {
                open: false,
                message: "Snackbar message",
            },
            user: testUser,
            data: testData,

        };
        this.handleSignout.bind(this);
    }

    handleSnackbarTrigger = (message) => {
        //when theres something that can use a snackbar, use this
    }

    handleSignout = () => {
        console.log("signing out");
        this.setState({
            user: {
                loggedIn: false,
            }
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

    handleRequestToLeaveReview = (subjectId) => {
        console.log(subjectId);

        //add another button to bottom nav, show the review component in body, pass in data for subject

    }

    selectBottomNav = (index) => {
        var newBodyContent = this.state.bodyContent;
        switch (index) {
            case SETTINGS_INDEX:
                newBodyContent = <Settings settings={this.state.user.settings}/>;
                break;
            case STAR_INDEX:
                newBodyContent =
                    <Starred data={this.state.data} starred={this.state.user.starred} user={this.state.user} requestReview={this.handleRequestToLeaveReview}/>;
                break;
            case CATALOG_INDEX:
                newBodyContent = <Catalog data={this.state.data} user={this.state.user}  requestReview={this.handleRequestToLeaveReview}/>;
                break;
            default:
                newBodyContent = <Catalog data={this.state.data} user={this.state.user}  requestReview={this.handleRequestToLeaveReview}/>;
        }
        this.setState({
            selectedBottomNavIndex: index,
            bodyContent: newBodyContent
        })
    }

    render() {
        return (
            <MTP>
                <div className="App">
                    <AppBar
                        title={<img src={TugsLogo} alt={Str.APP_TITLE_FULL} className="appbar-logo"/>}
                        iconElementRight={this.state.user.loggedIn ? <Logged/> : <Login/>}
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
                                    label={Str.NAV_TITLE_STARRED}
                                    icon={IconStars}
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
