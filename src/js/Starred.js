import React, {Component} from 'react';
import {Tab, Tabs} from 'material-ui'
import SubjectCard from './SubjectCard'
import '../css/App.css';

class Starred extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validElements: ''
        }
        this.setValidElements = this.setValidElements.bind(this);
    }

    componentDidMount(){
        this.setValidElements();
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

    setValidElements() {
        this.setState({
            validElements: this.props.data[0].faculties[0].subjects.map((item) => {
                var isStarred = this.isStarred(item.id);
                if(isStarred) {
                    return (<SubjectCard key={item.id} item={item}
                                         handleRequestToLeaveReview={this.props.handleRequestToLeaveReview}
                                             loggedIn={this.props.loggedIn}
                                             starred={isStarred} //star check done before, this is fine
                                             handleStarToggle={this.props.handleStarToggle}
                                             updateValidsForStarred={this.setValidElements}
                        />
                    )
                }else{return ''}
            })
        }, () => {
            this.render();
        })
    }



    render() {
        return (
            <div>
                <Tabs initialSelectedIndex={this.state.activeIndex}>
                <Tab label="Starred" value={0}/>
                <Tab label="Tips" value={1}/>
                <Tab label="Ratings" value={2}/>
                </Tabs>
                <h1>My Dashboard</h1>
                {this.state.validElements}
            </div>
        )
    }

}

export default Starred;