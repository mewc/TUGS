import React, {Component} from 'react';

import {
    IconButton,
    LinearProgress,
    Card,
    CardActions,
    CardMedia,
    CardHeader,
    CardText,
    CardTitle,
    Divider
} from 'material-ui';
import {Rating} from 'material-ui-rating';
import StarIcon from 'material-ui/svg-icons/action/stars';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDnIcon from 'material-ui/svg-icons/action/thumb-down';
import RateReviewIcon from 'material-ui/svg-icons/maps/rate-review';
import * as Str from './Str';

import {yellow800, grey500} from 'material-ui/styles/colors'


class SubjectCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return <Card key={this.props.item.id} style={{width: "50%", margin: "auto"}}>
            <CardHeader showExpandableButton={true} actAsExpander={true} title={this.props.item.code + "  " + this.props.item.title}/>

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
                <h4>Tips</h4>{this.props.item.tips.map((tip) => {
                if(tip.length < 1){return <p>No tips submitted .</p>}else{return <p key={tip}>{tip}</p>}
            })}

            </CardText>
            <Divider/>
            <CardActions expandable={true} style={{backgroundColor: "#eae9ea"}}>
                <IconButton disabled={!this.props.loggedIn}><StarIcon color={yellow800}/></IconButton>
                <IconButton><ThumbUpIcon/></IconButton>
                <IconButton><ThumbDnIcon/></IconButton>
                <IconButton disabled={!this.props.loggedIn} label={Str.ACTION_TITLE_LEAVEREVIEW}
                            onClick={this.props.requestReview.bind(this, this.props.item.id)}>
                    <RateReviewIcon/>
                </IconButton>

            </CardActions>

        </Card>
    }
}

export default SubjectCard;