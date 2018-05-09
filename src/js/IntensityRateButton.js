import React, {Component} from 'react';

import {
    IconButton,
    // CardMedia,
    // CardTitle,
    FlatButton,
    Dialog,
} from 'material-ui';
import IntensityIcon from 'material-ui/svg-icons/social/whatshot';
import * as Str from './Str';
import Axios from 'axios';
import Tooltip from 'react-tooltip';


class IntensityRateButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            rateValue: 0,
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
                label={Str.ACTION_TITLE_INTENSITYRATE}
                onClick={this.handleDialogToggle}>
                <IntensityIcon
                    data-tip={(this.props.disabled) ? Str.TOOLTIP_INTENSITY_DISABLED : null}/>
            </IconButton>

            <Dialog
                title={Str.ACTION_TITLE_INTENSITYRATE}
                actions={[
                    <FlatButton label="Cancel" default={true} onClick={this.handleDialogToggle}/>,
                    <FlatButton label="Submit" primary={true} onClick={this.handleSubmitIntenseRate}/>
                ]}
                open={this.state.dialogOpen}
                onRequestClose={this.handleDialogToggle}>
                <p>Intensity rate selection here</p>

            </Dialog>
        </span>


    }

    handleDialogToggle() {
        this.setState({
            dialogOpen: !this.state.dialogOpen,
        })
    }


    handleSubmitIntenseRate() {
        console.log("subject card submit intensity rate run for " + this.props.item.id);
        this.handleDialogToggle()

        //TODO perform axios calls that uses this.state.rateValue
    }

}

export default IntensityRateButton;