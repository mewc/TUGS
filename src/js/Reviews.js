import React, {Component} from 'react';
import {CardHeader, Card} from 'material-ui'
import '../css/App.css';

class Reviews extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <h1>My Reviewed Subjects ({this.props.reviewed.length})</h1>
                {(this.props.reviewed.length > 0) ?
                    this.props.reviewed.map((item, index) => {
                        return <Card key={index}>
                            <CardHeader title={"Reviewed" + item} subtitle={test}/>
                        </Card>
                    })
                    :<div>No Reviewed Subjects</div>
                }
            </div>
        )
    }

}

export default Reviews;