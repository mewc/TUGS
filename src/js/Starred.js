import React, {Component} from 'react';
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
        var valids = []
        this.props.data[0].faculties[0].subjects.map((item) => {
                var isStarred = this.isStarred(item.id);
                if(isStarred) {
                    valids.push(<SubjectCard key={item.id} item={item}
                                         requestReview={this.props.requestReview}
                                         loggedIn={this.props.loggedIn}
                                         starred={isStarred} //star check done before, this is fine
                                         handleStarToggle={this.props.handleStarToggle}
                                         updateValidsForStarred={this.setValidElements}
                        />
                    )
                }
                return ''; //unneeded but checkStyle demands it
        })
        this.setState({
            validElements: valids
        })
    }

    render() {
        return (
            <div>
                {this.state.validElements}
            </div>
        )
    }

}

export default Starred;