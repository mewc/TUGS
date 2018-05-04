import React, {Component} from 'react';
import {Card, CardHeader, List, ListItem} from 'material-ui';
import {Grid, Row, Col} from 'react-material-responsive-grid';
import axios from "axios/index";

import School from 'material-ui/svg-icons/social/school';

import SubjectCard from './SubjectCard'
import SchoolCard from './SchoolCard'
import '../css/App.css';
import {testData} from "../resources/testData";
import * as Str from "./Str";
import TugsMuiTheme from "./TugsMuiTheme";

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            schoolItems: <div>Loading...</div>,
            facultyItems: false, //bool to handle red of tabs
            subjectCards: false,
            selectedIndex: {
                school: 0,
                faculty: 0,
            }
        }
    }

    componentDidMount() {
        this.getUpdatedDataset();
    }

    getUpdatedDataset() {
        //this needs to be a request to the mongo backend so we can anctually keep things persistent
        axios.get(Str.DATA_LH + Str.DATA_SCHOOLS_OLD)
            .then((res) => {
                this.setState({
                    data: res.data,
                }, () => {
                    this.generateSchoolItems();
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }


    generateSubjectCards() {
        this.setState({
                subjectCards: this.state.data[this.state.selectedIndex.school].faculties[this.state.selectedIndex.faculty].subjects.map((item) => {
                    var isVotedUp = this.isVotedUp(item.id);
                    var isVotedDn = this.isVotedDn(item.id);
                    var isStarred = this.isStarred(item.id);
                    var isTipped = this.isTipped(item.id);
                    return <SubjectCard key={item.id}
                                        item={item}
                                        handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
                                        loggedIn={this.props.loggedIn}
                                        starred={isStarred}
                                        tipped={isTipped}
                                        votedUp={isVotedUp}
                                        votedDn={isVotedDn}
                                        handleStarToggle={this.props.handleStarToggle}
                    />
                })
            }
        )
    }

    generateFacultyItems() {
        this.setState({
                facultyItems: this.state.data[this.state.selectedIndex.school].faculties.map((item, index) => {
                    return <ListItem
                        key={index}
                        primaryText={item.name}
                        secondaryText={"Subjects: " + item.subjects.length}
                        onClick={() => this.handleFacultyClick(index)}
                    />
                })
            }
        )
    }

    generateSchoolItems() {
        this.setState({
                schoolItems: this.state.data.map((item, index) => {
                    return <ListItem
                        key={index}
                        primaryText={item.name}
                        secondaryText={"Faculties: " + item.faculties.length}
                        onClick={() => this.handleSchoolClick(index)}
                        value={index}
                    />
                })
            }
        )
    }

    handleSchoolClick(index){
        this.setState({
            subjectCards: false, //to handle red of tabs
            selectedIndex:{
                school: index,
                faculty: null,
            }
        }, () => {
            this.generateFacultyItems();
        })
    }

    handleFacultyClick(index){
        this.setState({
            selectedIndex:{
                ...this.state.selectedIndex,
                faculty: index
            }
        }, () => {
            this.generateSubjectCards();
        })
    }


    isStarred(subId) {
        var is = false;
        for (var id of this.props.user.starred) {
            if (id === subId) {
                return true;
            }
        }
        return is;
    }

    isTipped(subId){
        var is = false;
        for (var id of this.props.user.tipped) {
            if (id === subId) {
                return true;
            }
        }
        return is;
    }

    isVotedUp(subId){
        var is = false;
        for (var id of this.props.user.votesUp) {
            if (id === subId) {
                return true;
            }
        }
        return is;
    }
    isVotedDn(subId){
        var is = false;
        for (var id of this.props.user.votesDn) {
            if (id === subId) {
                return true;
            }
        }
        return is;
    }


    render() {
        return (
            <Grid>
                <Row>
                    <Col xs4={2} sm={2} lg={2} xl={2}>
                        <Card >
                            <CardHeader title={"Schools"}
                                        subtitle={this.state.schoolItems.length}
                                        avatar={(this.state.facultyItems === false)? <School/> : <School/> }
                                        // style={(this.state.facultyItems === false)? {backgroundColor: TugsMuiTheme.palette.primary2Color} : "Select a school"}
                            />
                        </Card>
                        <List>
                            {this.state.schoolItems}
                        </List>
                    </Col>
                    <Col xs4={2} sm={4} lg={4} xl={4}>
                        <Card>
                            <CardHeader title={"Faculties"}
                                        subtitle={(this.state.facultyItems.length > 0)? this.state.facultyItems.length : "Select a school"}
                                        // style={(this.state.facultyItems.length > 0 && this.state.subjectCards === false )? {backgroundColor: TugsMuiTheme.palette.primary2Color} : "Select a school"}
                            />
                        </Card>
                        <List>
                            {this.state.facultyItems}
                        </List>
                    </Col>
                    <Col xs4={4} sm={6} lg={6} xl={6}>
                        <Card>
                            <CardHeader title={"Subjects"}
                                        subtitle={(this.state.subjectCards.length > 0)? this.state.subjectCards.length : "Select a faculty"}
                                        // style={(this.state.subjectCards.length > 0)? {backgroundColor: TugsMuiTheme.palette.primary2Color} : "Select a school"}
                            />
                        </Card>
                        <List>
                            {this.state.subjectCards}
                        </List>
                    </Col>
                </Row>
            </Grid>
        )
    }

}


export default Catalog;
