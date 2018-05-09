import React, {Component} from 'react';
import {Tab, Tabs, RefreshIndicator} from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/action/favorite-border';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
// import ThumbDnIcon from 'material-ui/svg-icons/action/thumb-down';
import RateReviewIcon from 'material-ui/svg-icons/maps/rate-review';
import '../css/App.css';

import Reviews from './Reviews';
import Saved from './Saved';
import Ratings from './Ratings';
import * as Str from "./Str";
import axios from "axios/index";

const INDEX_RATINGS = 2;
const INDEX_REVIEWS = 1;
const INDEX_SAVED = 0;



class MeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            bodyContent: <RefreshIndicator left={100} top={100} size={Str.VALUE_REFRESH_SIZE} status={"loading"}/>,
            savedItems: [],
            tippedItems: [],
            ratedItems: [],
        }
    }



    componentDidMount() {
        //TODO Implement this when /users/#/saved/all endpoint works (getting subject objects)
        this.getUpdatedUserSubjectDatasets();

    }

    setDefaultBody(){
        this.setState({
            bodyContent: <Saved
                items={this.state.savedItems}
                handleStarToggle={this.props.handleStarToggle}
                handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
                 />
        })
    }

    getUpdatedUserSubjectDatasets() {
        let userSavedEndpoint = Str.DATA_LIVE + Str.DATA_USERS + this.props.user.id + "/" + Str.DATA_SAVED_BASIC;
        let userTippedEndpoint = Str.DATA_LIVE + Str.DATA_USERS + this.props.user.id + "/" + Str.DATA_TIPPED_BASIC;
        let userRatingsEndpoint = Str.DATA_LIVE + Str.DATA_USERS + this.props.user.id + "/" + Str.DATA_RATING_BASIC;
        axios.all([
            axios.get(userSavedEndpoint),
            axios.get(userTippedEndpoint),
            axios.get(userRatingsEndpoint),
        ])
            .then(axios.spread((stars, tips, ratings) => {
                console.log
                this.setState({
                    savedItems: stars.data,
                    tippedItems: tips.data,
                    ratedItems: ratings.data,
                }, () => {

                    this.setDefaultBody();
                })

            }))
            .catch((err) => {
                console.log(err);
            })
    }

    handleTabChange = (index) => {
        let newBodyContent = <Saved
                items={this.state.savedItems}
                handleStarToggle={this.props.handleStarToggle}
                handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
            />;  //nb same as line ~45 setDefaultBody()
        switch (index) {
            case INDEX_SAVED:
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
                index = INDEX_SAVED;

        }
        this.setState({
            activeIndex: index,
            bodyContent: newBodyContent
        })
    };

    render() {
        return (
            <div>
                <Tabs
                    initialSelectedIndex={this.state.activeIndex}
                    onChange={this.handleTabChange}
                >
                    <Tab icon={<SaveIcon/>} label={Str.NAV_TITLE_SAVED + " (" + this.state.savedItems.length +")"} value={0}/>
                    <Tab icon={<RateReviewIcon/>} label={Str.NAV_TITLE_TIP + " (" + this.state.tippedItems.length +")"} value={1}/>
                    <Tab icon={<ThumbUpIcon/>} label={Str.NAV_TITLE_RATINGS + " (" + this.state.ratedItems.length +")"} value={2}/>
                </Tabs>
                {this.state.bodyContent}
            </div>
        )
    }

}

export default MeDashboard;