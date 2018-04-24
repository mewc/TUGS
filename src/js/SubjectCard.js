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
import ShowMoreText from 'react-show-more-text'

import {yellow800, black} from 'material-ui/styles/colors'
import {ACTION_ERROR_LEAVEREVIEW} from "./Str";
import {ACTION_LABEL_LEAVEREVIEW} from "./Str";
import {VALUE_MAX_TIPLENGTH} from "./Str";


class SubjectCard extends Component {

    constructor(props){
        super(props);

        this.state = {
            starred: this.props.starred,
            starColor: yellow800,
            dialogOpen: true,
        }
    }

    componentDidMount(){
        this.setState({
            starColor: this.getStarColor(),
        });
    }

    render() {
        return <Card key={this.props.item.id} style={{width: "50%", margin: "auto"}}>
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
                Intensity: {this.props.item.intensity.avg * 100 + "%"}
                    <LinearProgress
                        mode={'determinate'}
                        max={1}
                        min={0}
                        value={((this.props.item.intensity.avg - 1) * -1)}//flipped because the changing of colour for progress bar only did one side.
                        style={{width: 70, height: 10, backgroundColor: "#ab0000", margin: "auto", marginTop: "10px"}}
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
                                <div key={tip}   className="show-more-text">
                                <ShowMoreText lines={10} more={'More'} less={'Less'} >
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
                    <StarIcon color={this.state.starColor}/>
                </IconButton>
                <IconButton disabled={!this.props.loggedIn}><ThumbUpIcon/></IconButton>
                <FlatButton key={1} disabled={true}
                            style={{verticalAlign: "middle"}}>{this.calculateHelpful() + "%"}</FlatButton>
                <IconButton disabled={!this.props.loggedIn}><ThumbDnIcon/></IconButton>
                <IconButton disabled={!this.props.loggedIn} label={Str.ACTION_TITLE_LEAVEREVIEW}
                            onClick={this.props.requestReview.bind(this, this.props.item.id)}>
                    <RateReviewIcon/>
                </IconButton>
                <Dialog
                    title={Str.ACTION_TITLE_LEAVEREVIEW}
                    actions={<FlatButton label="OK" primary={true} onKeyboardFocus={false} onClick={this.handleDialogClose}/>}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleSubmitReview} >

                    <TextField
                        hintText={Str.ACTION_HINT_LEAVEREVIEW}
                        errorText={ACTION_ERROR_LEAVEREVIEW}
                        multiLine={true}
                        floatingLabelText={ACTION_LABEL_LEAVEREVIEW}
                        rows={1}
                        rowsMax={3}
                        fullWidth={true}
                        onChange={(e) =>{
                            if(e.target.value.length > VALUE_MAX_TIPLENGTH){
                                e.target.value = e.target.value.toString().slice(0, VALUE_MAX_TIPLENGTH);
                            }
                        }}
                    />
                </Dialog>

            </CardActions>

        </Card>
    }

    handleDialogClose(){

    }

    handleSubmitReview(){

    }

    handleStarClick(){

        this.setState({
            starred: !this.state.starred,
        }, () => {
            this.props.handleStarToggle(
                this.props.item.id);

            //only passed in from the starred tab - to handle redrawing list when unstarred
            if(this.props.updateValidsForStarred !== undefined) {
                this.props.updateValidsForStarred();
            }

            this.setState({
                ...this.state,
                starColor: this.getStarColor()
            })
        })


    }

    getStarColor() {
        if (this.state.starred) {
            return yellow800
        }else{
            return black
        }
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