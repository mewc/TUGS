import React, {Component} from 'react';
import TugsMuiTheme from './TugsMuiTheme';
import {Tab, Tabs} from 'material-ui';
import SubjectCard from './SubjectCard';
import '../css/App.css';

class Starred extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    componentDidMount() {
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