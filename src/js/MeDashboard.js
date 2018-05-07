import React, {Component} from 'react';
import TugsMuiTheme from './TugsMuiTheme';
import {Tab, Tabs} from 'material-ui';
import StarIcon from 'material-ui/svg-icons/action/stars';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDnIcon from 'material-ui/svg-icons/action/thumb-down';
import RateReviewIcon from 'material-ui/svg-icons/maps/rate-review';
import '../css/App.css';

import Reviews from './Reviews';
import Starred from './Starred';
import Ratings from './Ratings';
import * as Str from "./Str";
import axios from "axios/index";

const INDEX_RATINGS = 2;
const INDEX_REVIEWS = 1;
const INDEX_STARRED = 0;

class MeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            bodyContent:
                <Starred
                user={this.props.user}
                handleStarToggle={this.props.handleStarToggle}
                handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
                starred={this.props.user.starred} />
            ,
            starredItems: this.props.user.starred
        }
    }



    componentDidMount() {
        //TODO Implement this when /users/#/starred/all endpoint works (getting subject objects)
        // this.getUpdatedDataset();
    }

    getUpdatedDataset() {
        let userStarredEndpoint = Str.DATA_LH + Str.DATA_USERS + this.props.user.id + Str.DATA_STARRED;

        axios.get(Str.DATA_LH + Str.DATA_USERS + this.props.user.id + Str.DATA_STARRED)
            .then((res) => {
                console.log(res);
                this.setState({
                    starredItems: res.data, //processing done inside starred, we just get data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleTabChange = (index) => {
        console.log(index);
        let newBodyContent = <Starred
            user={this.props.user}
            handleStarToggle={this.props.handleStarToggle}
            handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
            starred={this.props.user.starred}
        />;
        switch (index) {
            case INDEX_STARRED:
                //Default
                break;
            case INDEX_REVIEWS:
                newBodyContent = <Reviews
                    reviewed={this.props.user.tipped}
                />;
                break;
            case INDEX_RATINGS:
                newBodyContent = <Ratings
                    rated={this.props.user.rating} //contains up and down
                />;
                break;
            default:
                //Default
                index = INDEX_STARRED;

        }
        this.setState({
            activeIndex: index,
            bodyContent: newBodyContent
        })
    }

    render() {
        return (
            <div>
                <Tabs
                    initialSelectedIndex={this.state.activeIndex}
                    onChange={this.handleTabChange}
                >
                    <Tab icon={<StarIcon/>} label="Starred" value={0}/>
                    <Tab icon={<RateReviewIcon/>} label={"Reviews"} value={1}/>
                    <Tab icon={<ThumbUpIcon/>} label={"Ratings"} value={2}/>
                </Tabs>
                {this.state.bodyContent}
            </div>
        )
    }

}

export default MeDashboard;