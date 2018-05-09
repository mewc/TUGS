import React, {Component} from 'react';

import {
    IconButton,
    // CardMedia,
    // CardTitle,
    FlatButton,
    Dialog,
} from 'material-ui';
import StarRatingIcon from 'material-ui/svg-icons/toggle/star-half';import * as Str from './Str';
import Axios from 'axios';
import Tooltip from 'react-tooltip';


class StarRateButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        }

        this.handleDialogToggle = this.handleDialogToggle.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return <span>
            <Tooltip/>
            <IconButton
                disabled={(this.props.disabled)} //shorthand for true false if statements
                label={Str.ACTION_TITLE_STARRATE}
                onClick={this.handleDialogToggle}>
                <StarRatingIcon
                    data-tip={(this.props.disabled) ? Str.TOOLTIP_INTENSITY_DISABLED : null}/>
            </IconButton>

            <Dialog
                title={Str.ACTION_TITLE_STARRATE}
                actions={[
                    <FlatButton label="Cancel" default={true} onClick={this.handleDialogToggle}/>,
                    <FlatButton label="Submit" primary={true} onClick={this.handleSubmit}/>
                ]}
                open={this.state.dialogOpen}
            >
                <p>Starrate rate selection here</p>
            </Dialog>
        </span>


    }

    handleDialogToggle() {
        this.setState({
            dialogOpen: !this.state.dialogOpen,
        })
    }


    handleSubmit() {
        console.log("subject card submit star rate run for " + this.props.item.id);
        this.handleDialogToggle()
    }

}

export default StarRateButton;