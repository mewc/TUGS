import React, {Component} from 'react';

import {
    IconButton,
    FlatButton,
    Card,
    CardHeader,
    Subheader
} from 'material-ui';



class SchoolCard extends Component {

    //there needs to be a card for school for an expanded version
    render() {
        return <Card>
            <CardHeader title={this.props.item.name}/>
        </Card>
    }
}

export default SchoolCard;