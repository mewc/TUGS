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


class SubjectCard extends Component {

    render() {
        return <Card key={this.props.item.id} style={{width: "50%", margin: "auto"}}>
            <CardHeader showExpandableButton={true} actAsExpander={true} title={this.props.item.code + "  " + this.props.item.title}/>

            <CardText>
                <span style={{display: "inline"}}>
                <span>
                Rewarding? {this.props.item.avgRewardingRating}
                    <Rating
                        value={Math.round(this.props.item.avgRewardingRating)}
                        max={5}
                        onChange={(value) => console.log(`Rated with value ${value}`)}
                        readOnly={this.props.loggedIn}
                    />
                </span>
                <span>
                Intensity: {this.props.item.avgIntensityRating * 100 + "%"}
                    <LinearProgress
                        mode={'determinate'}
                        max={1}
                        min={0}
                        value={((this.props.item.avgIntensityRating - 1) * -1)}//flipped because the changing of colour for progress bar only did one side.
                        style={{width: 70, height: 10, backgroundColor: "#ab0000", margin: "auto", marginTop: "10px"}}
                    />
                </span>
                </span>
            </CardText>

            <CardText expandable={true}>
                <h4>Tips</h4>{this.props.item.tips.map((tip) => (
                <p key={tip}>{tip}</p>
            ))}

            </CardText>
            <Divider/>
            <CardActions expandable={true} style={{backgroundColor: "#ddd"}}>
                <IconButton disabled={!this.props.loggedIn}><StarIcon/></IconButton>
                <IconButton><ThumbUpIcon/></IconButton>
                <IconButton><ThumbDnIcon/></IconButton>
                <IconButton disabled={!this.props.loggedIn} label={Str.ACTION_TITLE_LEAVEREVIEW}
                            onClick={this.props.requestReview.bind(this, this.props.item.id, this.props.user)}>
                    <RateReviewIcon/>
                </IconButton>

            </CardActions>

        </Card>
    }
}

export default SubjectCard;