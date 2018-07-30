import React, {Component} from 'react';

import {FlatButton} from 'material-ui';
import * as Str from "./Str";

class LoginButton extends Component {
    static muiName = 'FlatButton';

    render() {

        return <FlatButton
            label={Str.NAV_TITLE_LOGIN}
            onClick={this.props.checkLogin}
        />;
    }
}


export default LoginButton;