import React, {Component} from 'react';

import SubjectCard from './SubjectCard'


import '../css/App.css';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.elements();
    }

    elements() {
        this.setState({
                elements: this.props.data[0].faculties[0].subjects.map((item) => {
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
                {this.state.elements}
            </div>
        )
    }

}


export default Catalog;
