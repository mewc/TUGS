import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui'
import '../css/App.css';

class Saved extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
    }


    render() {
        return (
            <div>
                {(this.props.items.length > 0) ?
                    this.props.items.map((item, index) => {
                        return <Card key={index}>
                            <CardHeader title={" " + item.code} subtitle={item.title}/>
                        </Card>
                    })
                    :<div>No Reviewed Subjects</div>
                }
            </div>
        )
    }

}

export default Saved;