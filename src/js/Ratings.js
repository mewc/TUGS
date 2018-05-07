import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui'
import '../css/App.css';

class Ratings extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                {(this.props.rated.length > 0) ?
                    this.props.rated.map((item, index) => {
                        return <Card key={index}>
                            <CardHeader title={" " + item.code} subtitle={item.title}/>
                        </Card>
                    })
                    :<div>No Rated Subjects</div>
                }
            </div>
        )
    }

}

export default Ratings;