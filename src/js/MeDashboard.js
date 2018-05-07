import React, {Component} from 'react';
import {Tab, Tabs, RefreshIndicator} from 'material-ui';
import StarIcon from 'material-ui/svg-icons/action/stars';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
// import ThumbDnIcon from 'material-ui/svg-icons/action/thumb-down';
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
            bodyContent: <RefreshIndicator left={100} top={100} size={Str.VALUE_REFRESH_SIZE} status={"loading"}/>,
            starredItems: [],
            tippedItems: [],
            ratedItems: [],
        }
    }



    componentDidMount() {
        //TODO Implement this when /users/#/starred/all endpoint works (getting subject objects)
        this.getUpdatedUserSubjectDatasets();

    }

    setDefaultBody(){
        this.setState({
            bodyContent: <Starred
                items={this.state.starredItems}
                handleStarToggle={this.props.handleStarToggle}
                handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
                 />
        })
    }

    getUpdatedUserSubjectDatasets() {
        let userStarredEndpoint = Str.DATA_LH + Str.DATA_USERS + this.props.user.id + "/" + Str.DATA_STARRED_BASIC;
        let userTippedEndpoint = Str.DATA_LH + Str.DATA_USERS + this.props.user.id + "/" + Str.DATA_STARRED_BASIC;
        let userRatingsEndpoint = Str.DATA_LH + Str.DATA_USERS + this.props.user.id + "/" + Str.DATA_STARRED_BASIC;

        console.log(userRatingsEndpoint);

        axios.all([
            axios.get(userStarredEndpoint),
            axios.get(userTippedEndpoint),
            axios.get(userRatingsEndpoint),
        ])
            .then(axios.spread((stars, tips, rates) => {
                this.setState({
                    starredItems: stars.data,
                    tippedItems: tips.data,
                    ratedItems: rates.data,
                }, () => {
                    this.setDefaultBody();
                })

            }))
            .catch((err) => {
                console.log(err);
            })
    }

    handleTabChange = (index) => {
        let newBodyContent = <Starred
                items={this.state.starredItems}
                handleStarToggle={this.props.handleStarToggle}
                handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
            />;  //nb same as line 45
        switch (index) {
            case INDEX_STARRED:
                //Default
                break;
            case INDEX_REVIEWS:
                newBodyContent = <Reviews
                    reviewed={this.state.tippedItems}
                />;
                break;
            case INDEX_RATINGS:
                newBodyContent = <Ratings
                    rated={this.state.ratedItems} //contains up and down
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
                    <Tab icon={<StarIcon/>} label={Str.NAV_TITLE_STARRED} value={0}/>
                    <Tab icon={<RateReviewIcon/>} label={Str.NAV_TITLE_TIP} value={1}/>
                    <Tab icon={<ThumbUpIcon/>} label={Str.NAV_TITLE_RATINGS} value={2}/>
                </Tabs>
                {this.state.bodyContent}
            </div>
        )
    }

}

export default MeDashboard;