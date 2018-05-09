import React, {Component} from 'react';

import {
    IconButton,
    LinearProgress,
    Card,
    CardActions,
    CardHeader,
    CardText,
    // CardMedia,
    // CardTitle,
    Divider,
    FlatButton,
    Dialog,
    TextField
} from 'material-ui';
import {Rating} from 'material-ui-rating';
import SaveIcon from 'material-ui/svg-icons/action/favorite-border';
// import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
// import ThumbDnIcon from 'material-ui/svg-icons/action/thumb-down';

import IntensityIcon from 'material-ui/svg-icons/social/whatshot';
import StarRatingIcon from 'material-ui/svg-icons/toggle/star-half';
import ToggleStarFull from 'material-ui/svg-icons/toggle/star';
import ToggleStarEmpty from 'material-ui/svg-icons/toggle/star-border';
import * as Str from './Str';
import Axios from 'axios';
import ShowMoreText from 'react-show-more-text';
import Tooltip from 'react-tooltip';

import {yellow800, black} from 'material-ui/styles/colors';
import TugsMuiTheme from "./TugsMuiTheme";
import {DATA_USERS} from "./Str";
import {DATA_LH} from "./Str";
import {DATA_ADD_STARRED} from "./Str";
import {DATA_REMOVE_STARRED} from "./Str";
import IntensityRateButton from "./IntensityRateButton";
import LeaveTipButton from "./LeaveTipButton";
import StarRateButton from "./StarRateButton";


class SubjectCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starred: this.props.starred,    //all handled in here once initial state is set
            dialogOpen: false,
            tipText: '',
        }

        this.handleDialogToggle = this.handleDialogToggle.bind(this);
        this.handleSubmitReview = this.handleSubmitReview.bind(this);
    }

    componentDidMount() {
        this.setState({
            starColor: this.getStarColor(),
        });
    }

    render() {
        return <Card key={this.props.item.id} style={{width: "100%", margin: "auto"}}>
            <CardHeader showExpandableButton={true} actAsExpander={true}
                        title={this.props.item.code + "  " + this.props.item.title}/>

            <CardText>
                <span style={{display: "inline"}}>
                <span>
                Rewarding? {this.props.item.rewarding.avg}
                    <Rating
                        value={Math.round(this.props.item.rewarding.avg)}
                        max={5}
                        onChange={(value) => console.log(`Rated with value ${value}`)}
                        readOnly={true}
                        disabled={this.props.userId === 7357}
                        iconFilled={<ToggleStarFull color={TugsMuiTheme.palette.primary1Color}/>}
                        iconHovered={<ToggleStarEmpty color={TugsMuiTheme.palette.primary2Color}/>}
                    />
                </span>
                <span>
                Intensity: {Math.round(this.props.item.intensity.avg * 100) + "%"}
                    <LinearProgress
                        mode={'determinate'}
                        color={TugsMuiTheme.palette.primary3Color}
                        max={1}
                        min={0}
                        value={((this.props.item.intensity.avg - 1) * -1)}//flipped because the changing of colour for progress bar only did one side.
                        style={{
                            width: 70,
                            height: 10,
                            margin: "auto",
                            marginTop: "10px",
                            backgroundColor: TugsMuiTheme.palette.primary1Color
                        }}
                    />
                </span>
                </span>
            </CardText>

            <CardText expandable={true}>
                <h4>Tips</h4>
                {this.props.item.tips.map((tip) => {
                    if (tip.length < 1) {
                        return "No tips submitted ."
                    } else {
                        return (
                            <div key={tip} className="show-more-text">
                                <ShowMoreText lines={10} more={'More'} less={'Less'}>
                                    <p>- {tip}</p>
                                </ShowMoreText>
                            </div>
                        )
                    }
                })}

            </CardText>
            <Divider/>
            <CardActions expandable={true} style={{backgroundColor: "#eae9ea"}}>
                <div style={{display: "inline"}}>
                    <IconButton
                        onClick={this.handleStarClick.bind(this)}
                        disabled={this.props.userId === 7357}>
                        <SaveIcon color={(this.state.starred) ? TugsMuiTheme.palette.primary1Color : black}/>
                    </IconButton>
                    <LeaveTipButton
                        disabled={(this.props.userId === 7357 || this.props.isTipped)}
                    />

                    <IntensityRateButton
                        disabled={(this.props.userId === 7357 || this.props.isIntensityRated)}
                    />

                    <StarRateButton
                        disabled={(this.props.userId === 7357 || this.props.isStarRated)}
                    />
                </div>
            </CardActions>
        </Card>
    }

    handleDialogToggle() {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }

    handleSubmitReview() {
        console.log("subject card submit review run for " + this.props.item.id);
        this.handleDialogToggle();
        this.props.handleRequestToLeaveReview(this.props.item.id, this.state.tipText)
    }

    handleStarClick() {
        //this will change visuals,
        this.setState({
            starred: !this.state.starred,
        }, () => {
            this.props.updateUserInfo(this.props.userId); //to handle backend sync across app
            this.handleStarToggle(this.props.item.id)
        })
    }

    getStarColor() {
        if (this.state.starred) {
            return yellow800
        } else {
            return black
        }
    }


    handleStarToggle(id) {
        if (!this.state.starred) {
            //remove star
            return this.rmStarred(id)
        } else {
            //add starred
            return this.addStarred(id)
        }
    }

    rmStarred(id) { //basically the same as review, can clean up
        console.log("remove starred: " + id)
        Axios.post(DATA_LH + DATA_USERS + this.props.userId + '/' + DATA_REMOVE_STARRED + id).then(() => {
            this.props.updateUserInfo;
        })
    }

    addStarred(id) {//basically the same as review, can clean up
        console.log("add starred: " + id)
        Axios.post(DATA_LH + DATA_USERS + this.props.userId + '/' + DATA_ADD_STARRED + id).then(() => {
            this.props.updateUserInfo;
        })
    }

    calculateHelpful() {
        var up = this.props.item.votesUp;
        var dn = this.props.item.votesDown;
        var total = up + dn;
        if (up < 1) {
            return 0
        }
        if (dn < 1) {
            return 100
        }
        var percent = up / total;
        percent = (percent * 100)

        return Math.round(percent);
    }

}

export default SubjectCard;