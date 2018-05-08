import React, {Component} from 'react';

import {
    IconButton,
    LinearProgress,
    Card,
    CardActions,
    // CardMedia,
    CardHeader,
    CardText,
    // CardTitle,
    Divider,
    FlatButton,
    Dialog,
    TextField
} from 'material-ui';
import {Rating} from 'material-ui-rating';
import StarIcon from 'material-ui/svg-icons/action/stars';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDnIcon from 'material-ui/svg-icons/action/thumb-down';
import RateReviewIcon from 'material-ui/svg-icons/maps/rate-review';
import * as Str from './Str';
import Axios from 'axios';
import ShowMoreText from 'react-show-more-text'

import {yellow800, black} from 'material-ui/styles/colors'
import {ACTION_ERROR_LEAVEREVIEW} from "./Str";
import {ACTION_LABEL_LEAVEREVIEW} from "./Str";
import {VALUE_MAX_TIPLENGTH} from "./Str";
import TugsMuiTheme from "./TugsMuiTheme";
import {DATA_USERS} from "./Str";
import {DATA_LH} from "./Str";
import {DATA_ADD_STARRED} from "./Str";
import {DATA_REMOVE_STARRED} from "./Str";


class SubjectCard extends Component {

    constructor(props) {
        super(props);
        console.log(props.starred);
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
                        readOnly={!this.props.loggedIn}

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

                <IconButton
                    onClick={this.handleStarClick.bind(this)}>
                    <StarIcon color={(this.state.starred) ? yellow800 : black}/>
                </IconButton>

                <IconButton
                    disabled={!!(!this.props.loggedIn || this.props.isTipped)} //shorthand for true false if statements
                    label={Str.ACTION_TITLE_LEAVEREVIEW}
                    onClick={this.handleDialogToggle}>
                    <RateReviewIcon/>
                </IconButton>
                <Dialog
                    title={Str.ACTION_TITLE_LEAVEREVIEW}
                    actions={[
                        <FlatButton label="Cancel" default={true} onClick={this.handleDialogToggle}/>,
                        <FlatButton label="Submit" primary={true} onClick={this.handleSubmitReview}/>
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

        return true;

    }

    rmStarred(id) { //basically the same as review, can clean up
        console.log("remove starred: " + id)
        Axios.post(DATA_LH + DATA_USERS + this.props.userId + '/' + DATA_REMOVE_STARRED + id).then(() => {
            var array = this.state.user.starred;
            var index = array.indexOf(id)
            array.splice(index, 1);
            this.setState({
                user: {
                    ...this.state.user, //this adds all current user attr. and lets us overwrite what we want to
                    starred: array,
                }
            })
        })
    }

    addStarred(id) {//basically the same as review, can clean up
        console.log("add starred: " + id)
        Axios.post(DATA_LH + DATA_USERS + this.props.userId + '/' + DATA_ADD_STARRED + id).then(() => {
            this.setState({
                user: {
                    ...this.state.user, //this adds all current user attr. and lets us overwrite what we want to
                    starred: [...this.state.user.starred, id]
                }
            })
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