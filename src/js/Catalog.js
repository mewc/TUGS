import React, {Component} from 'react';

import SubjectCard from './SubjectCard'


import '../css/App.css';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                {this.props.data[0].faculties[0].subjects.map((item) => {
                    return <SubjectCard key={item.id}
                                        item={item}
                                        requestReview={this.props.requestReview}
                                        loggedIn={this.props.loggedIn}
                                        starred={this.isStarred(item.id)}
                                        handleStarToggle={this.props.handleStarToggle}
                    />
                })}
            </div>
        )
    }

}


export default Catalog;
