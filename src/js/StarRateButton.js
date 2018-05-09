import React, {Component} from 'react';

import {
    IconButton,
    // CardMedia,
    // CardTitle,
    FlatButton,
    Dialog,
} from 'material-ui';
import {Rating} from 'material-ui-rating';
import StarRatingIcon from 'material-ui/svg-icons/toggle/star-half';
import * as Str from './Str';
import Axios from 'axios';
import Tooltip from 'react-tooltip';
import TugsMuiTheme from "./TugsMuiTheme";
import ToggleStarFull from 'material-ui/svg-icons/toggle/star';
import ToggleStarEmpty from 'material-ui/svg-icons/toggle/star-border';

class StarRateButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            rateValue: 0,
        }

        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
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
                modal={false}
                onRequestClose={this.handleDialogToggle}
            >
                <p>Starrate rate selection here</p>
                <div>

                    <Rating
                        value={this.state.rateValue}
                        max={5}
                        onChange={(value) => this.handleRateChange(value)}
                        iconFilled={<ToggleStarFull color={TugsMuiTheme.palette.primary1Color}/>}
                        iconHovered={<ToggleStarEmpty color={TugsMuiTheme.palette.primary2Color}/>}
                    />

                </div>
            </Dialog>
        </span>


    }

    handleRateChange(value) {
        this.setState({
            rateValue: value,
        }, () => {
            console.log(`Rated with value ${value}`);
        })

    }

    handleDialogToggle() {
        this.setState({
            dialogOpen: !this.state.dialogOpen,
        })
    }


    handleSubmit() {
        console.log("subject card submit star rate run for " + this.props.item.id);
        this.handleDialogToggle()

        //TODO perform axios calls that uses this.state.rateValue
    }

}

export default StarRateButton;