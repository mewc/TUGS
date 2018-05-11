import React, {Component} from 'react';

import {
    IconButton,
    // CardMedia,
    // CardTitle,
    FlatButton,
    Dialog,
    TextField
} from 'material-ui';
import RateReviewIcon from 'material-ui/svg-icons/maps/rate-review';
import * as Str from './Str';
import Tooltip from 'react-tooltip';
import {ACTION_ERROR_LEAVEREVIEW} from "./Str";
import {VALUE_MAX_TIPLENGTH} from "./Str";
import {ACTION_LABEL_LEAVEREVIEW} from "./Str";


class IntensityRateButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            tipText: '',
            disabled: this.props.disabled,
        }

        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    render() {
        return <span>
            <Tooltip/>
            <IconButton
                disabled={this.state.disabled} //shorthand for true false if statements
                label={Str.ACTION_TITLE_LEAVEREVIEW}
                onClick={this.handleDialogToggle}>
                <RateReviewIcon data-tip={(this.state.disabled)?Str.TOOLTIP_TIP_DISABLED:null}/>
            </IconButton>

            <Dialog
                title={Str.ACTION_TITLE_LEAVEREVIEW}
                actions={[
                    <FlatButton label="Cancel" default={true} onClick={this.handleDialogToggle}/>,
                    <FlatButton label="Submit" primary={true} onClick={this.handleSubmit}/>
                ]}
                open={this.state.dialogOpen}
            >

                <TextField
                    hintText={Str.ACTION_HINT_LEAVEREVIEW}
                    errorText={ACTION_ERROR_LEAVEREVIEW}
                    multiLine={true}
                    floatingLabelText={ACTION_LABEL_LEAVEREVIEW}
                    rows={1}
                    rowsMax={3}
                    fullWidth={true}
                    onChange={(e) => {
                        if (e.target.value.length > VALUE_MAX_TIPLENGTH) {
                            e.target.value = e.target.value.toString().slice(0, VALUE_MAX_TIPLENGTH);
                        }
                        this.setState({
                            tipText: e.target.value
                        })
                    }}
                />
            </Dialog>
        </span>


    }

    handleDialogToggle() {
        //console.log(this.state.dialogOpen);
        this.setState({
            dialogOpen: !this.state.dialogOpen,
        }, () => {
            //console.log(this.state.dialogOpen);
        })
    }


    handleSubmit() {
        this.props.handleRequestToLeaveReview(this.props.subjectId, this.state.tipText);
        this.handleDialogToggle()
        this.setState({
            disabled: true
        })
    }

}

export default IntensityRateButton;