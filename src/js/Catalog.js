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

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            schoolItems: <div>Loading...</div>,
            facultyItems: <div></div>,
            subjectCards: <div></div>,
            selectedIndex: {
                school: 0,
                faculty: 0,
            }
        }
    }

    getUpdatedDataset() {
        //this needs to be a request to the mongo backend so we can anctually keep things persistent
        axios.get(Str.DATA_LH + Str.DATA_SCHOOLS)
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

    componentDidMount() {
        this.getUpdatedDataset();
    }

    generateSubjectCards() {
        console.log(this.state.data[0]);
        this.setState({
                subjectCards: this.state.data[0].faculties[0].subjects.map((item) => {
                    var isStarred = this.isStarred(item.id);
                    return <SubjectCard key={item.id}
                                        item={item}
                                        handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
                                        loggedIn={this.props.loggedIn}
                                        starred={isStarred}
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
                    />
                })
            }
        )
    }

    handleSchoolClick(index){
        this.setState({
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


    render() {
        console.log(this.state.data[this.state.selectedIndex.school]);
        return (
            <Grid>
                <Row>
                    <Col xs4={2} sm={2} lg={2} xl={2}>
                        <Card>
                            <CardHeader title={"Schools"}
                                        subtitle={this.state.schoolItems.length}
                                        avatar={<School/>}
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
                                        avatar={<School/>}
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
                                        avatar={<School/>}
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
