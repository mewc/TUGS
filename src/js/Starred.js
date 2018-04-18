import React, {Component} from 'react';
import SubjectCard from './SubjectCard'
import '../css/App.css';

class Starred extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validElements: ''
        }
    }

    componentDidMount(){
        console.log("did mount");
        this.setValidElements();
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

    setValidElements() {
        var valids = []
        this.props.data.subjects.map((item) => {
                if(this.isStarred(item.id)) {
                    valids.push(<SubjectCard key={item.id} item={item}
                                         requestReview={this.props.requestReview}
                                         loggedIn={this.props.user.loggedIn}/>
                    )
                }
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