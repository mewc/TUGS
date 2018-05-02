import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui'
import SubjectCard from './SubjectCard'
import '../css/App.css';

class Starred extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        console.log(this.props);
        return (
            <div>
                <h1>My Starred Subjects ({this.props.starred.length})</h1>
                {(this.props.starred.length > 0) ?
                    this.props.starred.map((item, index) => {
                        return <Card key={index}>
                            <CardHeader title={"Starred" + item} subtitle={"test"}/>
                        </Card>
                    })
                    :<div>No Reviewed Subjects</div>
                }
            </div>
        )
    }

}

export default Starred;