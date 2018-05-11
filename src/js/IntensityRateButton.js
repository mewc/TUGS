import React, {Component} from 'react';

import {
    IconButton,
    // CardMedia,
    // CardTitle,
    FlatButton,
    Dialog,
    Slider,
} from 'material-ui';
import IntensityIcon from 'material-ui/svg-icons/social/whatshot';
import * as Str from './Str';
import Axios from 'axios';
import Tooltip from 'react-tooltip';
import {DATA_USERS} from "./Str";
import {DATA_ADD_INTENSITYRATING} from "./Str";
import {DATA_SUBJECTS} from "./Str";


class IntensityRateButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            rateValue: 0,
            disabled: this.props.disabled,
        }

        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleSubmitIntenseRate = this.handleSubmitIntenseRate.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return <span>
            <Tooltip/>
            <IconButton
                disabled={(this.state.disabled)} //shorthand for true false if statements
                label={Str.ACTION_TITLE_INTENSITYRATE}
                onClick={this.handleDialogToggle}>
                <IntensityIcon
                    data-tip={(this.state.disabled) ? Str.TOOLTIP_INTENSITY_DISABLED : null}/>
            </IconButton>

            <Dialog
                title={Str.ACTION_TITLE_INTENSITYRATE}
                actions={[
                    <FlatButton label="Cancel" default={true} onClick={this.handleDialogToggle}/>,
                    <FlatButton label="Submit" primary={true} onClick={this.handleSubmitIntenseRate}/>
                ]}
                open={this.state.dialogOpen}
                onRequestClose={this.handleDialogToggle}>
                {"I would consider this subject "}{this.state.rateValue}{"/10 on an intensity scale"}
                <Slider
                    step={1} value={0} max={10} min={0} name={Str.ACTION_TITLE_INTENSITYRATE}
                    onChange={(event, value) => this.handleRateChange(event, value)}
                    style={{height: "20px"}}
                />
            </Dialog>
        </span>

    }

    handleRateChange(event, value) {
        this.setState({
            rateValue: value,
        }, () => {
            //console.log('Intensity rated with value ' + value);
        })

    }

    handleDialogToggle() {
        this.setState({
            dialogOpen: !this.state.dialogOpen,
        })
    }

    handleSubmitIntenseRate() {
        let addToUserEndpoint = Str.DATA_LIVE + DATA_USERS + this.props.userId + '/' + DATA_ADD_INTENSITYRATING + this.props.subjectId;
        let addToSubjectEndpoint = Str.DATA_LIVE + DATA_SUBJECTS + this.props.subjectId + '/' + DATA_ADD_INTENSITYRATING;

        Axios.post(addToUserEndpoint, {value: this.state.rateValue}).then(() => {
            Axios.post(addToSubjectEndpoint, {value: this.state.rateValue})
        });
        this.handleDialogToggle();
        this.setState({
            disabled: true,
        });
        this.props.updateUserInfo(this.props.userId);
    }

}

export default IntensityRateButton;