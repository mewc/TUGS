import React, {Component} from 'react';

import SubjectCard from './SubjectCard'


import '../css/App.css';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: "100%",
        height: "100%",
        overflowY: 'auto',
        margin: 'auto',
    },
}

class Catalog extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {

        }
    }

    isStarred(subId) {
        var is = false;
        for (var id of this.props.user.starred) {
            if (id == subId) {
                return true;
            }
        }
        return is;
    }


    render() {
        return (
            <div>
                {this.props.data[0].faculties[0].subjects.map((item) => {
                    return <SubjectCard key={item.id} item={item} requestReview={this.props.requestReview}
                                 loggedIn={this.props.user.loggedIn} starred={this.isStarred(item.id)}/>
                })}
            </div>
        )
    }

}


export default Catalog;
