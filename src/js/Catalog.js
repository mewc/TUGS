import React, {Component} from 'react';
import {Card, CardHeader, List, ListItem, RefreshIndicator} from 'material-ui';
import {Grid, Row, Col} from 'react-material-responsive-grid';
import axios from "axios/index";
import TugsMuiTheme from "./TugsMuiTheme";

import School from 'material-ui/svg-icons/social/school';

import SubjectCard from './SubjectCard'
import '../css/App.css';
import * as Str from "./Str";
import {NAV_TITLE_SCHOOLS} from "./Str";
import {NAV_TITLE_SUBJECTS} from "./Str";

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            schoolItems: <RefreshIndicator left={0} top={0} size={Str.VALUE_REFRESH_SIZE} status={"loading"}/>,
            facultyItems: false, //bool to handle red of tabs
            subjectCards: false,
            selectedIndex: {
                school: 0,
                faculty: 0,
            }
        }
    }

    componentDidMount() {
        this.getUpdatedSchoolDataset();
    }

    getUpdatedSchoolDataset() {
        //this needs to be a request to the mongo backend so we can actually keep things persistent
        axios.get(Str.DATA_LH + Str.DATA_SCHOOLS + Str.DATA_FULL)
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

    getUpdatedFacultySubjectDataset() {
        let selectedSchoolId = this.state.data[this.state.selectedIndex.school].id;
        let getURL = Str.DATA_LH + Str.DATA_SCHOOLS + selectedSchoolId + "/" + Str.DATA_FULL;
        console.log(getURL);
        //this needs to be a request to the mongo backend so we can actually keep things persistent
        axios.get(getURL)
            .then((res) => {
                this.setState({
                    facSubData: res.data,
                }, () => {
                    this.generateFacultyItems();
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }


    generateSubjectCards() {
        this.setState({
                subjectCards: this.state.facSubData[this.state.selectedIndex.faculty].faculty.subjects.map(
                    (item, index) => {
                        let isSaved = this.isSaved(item.id);
                        let isTipped = this.isTipped(item.id);
                        return <SubjectCard key={item.id}
                                            item={item}
                                            handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
                                            userId={this.props.user.id}
                                            saved={isSaved}
                                            tipped={isTipped}
                                            updateUserInfo={this.props.updateUserInfo}
                        />
                    })
            }
        )
    }

    generateFacultyItems() {
        this.setState({
                facultyItems: this.state.facSubData.map((item, index) => {
                    return <ListItem
                        key={index}
                        primaryText={item.faculty.name}
                        secondaryText={"Subjects: " + item.faculty.subjects.length}
                        onClick={() => this.handleFacultyClick(index)}
                    />
                })
            }
            , () => {

            })
    }

    generateSchoolItems() {
        this.setState({
                schoolItems: this.state.data.map((item, index) => {
                    return <ListItem
                        key={index}
                        primaryText={item.name}
                        // secondaryText={"Faculties: " + item.faculties.length}
                        onClick={() => this.handleSchoolClick(index)}
                        value={index}
                    />
                })
            }
        )
    }

    handleSchoolClick(index) {
        this.setState({
            subjectCards: false, //to handle red of tabs
            facultyCards: false, //to handle red of tabs
            selectedIndex: {
                school: index,
                faculty: null,
            }
        }, () => {
            this.getUpdatedFacultySubjectDataset();
        })
    }

    handleFacultyClick(index) {
        this.setState({
            selectedIndex: {
                ...this.state.selectedIndex,
                faculty: index
            }
        }, () => {
            this.generateSubjectCards();
        })
    }


    isSaved(subId) {
        let is = false;
        for (var id of this.props.user.saved) {
                if (id === subId) {
                    return true;
                }
        }
        return is;
    }

    isTipped(subId) {
        var is = false;
        for (var id of this.props.user.tipped) {
            if (id === subId) {
                return true;
            }
        }
        return is;
    }

    isVotedUp(subId) {
        var is = false;
        for (var id of this.props.user.votesUp) {
            if (id === subId) {
                return true;
            }
        }
        return is;
    }

    isVotedDn(subId) {
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
                        <Card  style={{ backgroundColor: TugsMuiTheme.palette.primary1Color, color: TugsMuiTheme.palette.lightTextColor}}>
                            <CardHeader title={NAV_TITLE_SCHOOLS}
                                        subtitle={this.state.schoolItems.length}
                                        avatar={(this.state.facultyItems === false) ? <School color={TugsMuiTheme.palette.accent1Color}/> : <School  color={TugsMuiTheme.palette.accent1Color}/>}
                                        titleColor={TugsMuiTheme.palette.alternateTextColor}
                                        subtitleColor={TugsMuiTheme.palette.midTextColor}
                            />
                        </Card>
                        <List>
                            {this.state.schoolItems}
                        </List>
                    </Col>
                    <Col xs4={2} sm={4} lg={4} xl={4}>
                        <Card style={{ backgroundColor: TugsMuiTheme.palette.primary1Color}}>
                            <CardHeader title={Str.NAV_TITLE_FACULTIES}
                                        subtitle={(this.state.facultyItems.length > 0) ? this.state.facultyItems.length : "Select a school"}
                                        titleColor={TugsMuiTheme.palette.alternateTextColor}
                                        subtitleColor={TugsMuiTheme.palette.midTextColor}
                            />
                        </Card>
                        <List>
                            {this.state.facultyItems}
                        </List>
                    </Col>
                    <Col xs4={4} sm={6} lg={6} xl={6}>
                        <Card  style={{ backgroundColor: TugsMuiTheme.palette.primary1Color, color: TugsMuiTheme.palette.lightTextColor}}>
                            <CardHeader title={NAV_TITLE_SUBJECTS}
                                        subtitle={(this.state.subjectCards.length > 0) ? this.state.subjectCards.length : "Select a faculty"}
                                            titleColor={TugsMuiTheme.palette.alternateTextColor}
                                            subtitleColor={TugsMuiTheme.palette.midTextColor}
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
