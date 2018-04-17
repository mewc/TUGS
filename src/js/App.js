import React, {Component} from 'react';

import {AppBar, BottomNavigation, BottomNavigationItem, Paper} from 'material-ui';
import MTP from 'material-ui/styles/MuiThemeProvider';

import IconSettingsImport from 'material-ui/svg-icons/action/settings';
import IconStarsImport from 'material-ui/svg-icons/action/stars';
import IconCatalogImport from 'material-ui/svg-icons/action/view-quilt';

import Settings from './Settings';
import Catalog from './Catalog';
import Starred from './Starred';
import * as Str from './Str';
import '../css/App.css';

const IconSettings = <IconSettingsImport/>;
const IconStars = <IconStarsImport/>;
const IconCatalog = <IconCatalogImport/>;

const SETTINGS_INDEX = 2;
const STAR_INDEX = 1;
const CATALOG_INDEX = 0;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBottomNavIndex: 0,
            bodyContent: <Catalog/>,
        }
    }

    selectBottomNav = (index) => {
        var newBodyContent = this.state.bodyContent;
        switch (index) {
            case SETTINGS_INDEX:
                newBodyContent = <Settings/>;
                break;
            case STAR_INDEX:
                newBodyContent = <Starred/>;
                break;
            case CATALOG_INDEX:
                newBodyContent = <Catalog/>;
                break;
            default:
                newBodyContent = <Catalog/>;
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
                        title={Str.APP_TITLE}
                    />
                    {this.state.bodyContent}
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

export default App;
