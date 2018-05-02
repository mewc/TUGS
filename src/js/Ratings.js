import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui'
import '../css/App.css';

class Ratings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>My Rated Subjects ({this.props.rated.length})</h1>
                {(this.props.rated.length > 0) ?
                    this.props.rated.map((item, index) => {
                        return <Card key={index}>
                            <CardHeader title={"Rated " + item.value + " for sub:" + item.id} subtitle={"test"}/>
                        </Card>
                    })
                    :<div>No Rated Subjects</div>
                }
            </div>
        )
    }

}

export default Ratings;