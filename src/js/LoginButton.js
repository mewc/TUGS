import React, {Component} from 'react';

import {FlatButton} from 'material-ui';
import * as Str from "./Str";

class LoginButton extends Component {
    static muiName = 'FlatButton';

    render() {
      let label = Str.NAV_TITLE_LOGIN;
        (this.props.isAdmin)? label = "Admin " + Str.NAV_TITLE_LOGIN : false;

        return <FlatButton
            label={label}
            onClick={() => this.props.checkLogin(this.props.isAdmin)}
        />;
    }
}


export default LoginButton;
