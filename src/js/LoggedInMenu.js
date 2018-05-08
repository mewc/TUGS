import React, {Component} from 'react';

import {IconButton, IconMenu, MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as Str from "./Str";

class LoggedInMenu extends Component {

    render() {

        return <IconMenu
             iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
             targetOrigin={{horizontal: 'right', vertical: 'top'}}
             anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <MenuItem primaryText={Str.NAV_TITLE_SIGNOUT} onClick={this.props.handleSignout}/>
        </IconMenu>;
    }
}


export default LoggedInMenu;