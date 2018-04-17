import React, {Component} from 'react';

import {Chip} from 'material-ui';

import '../css/App.css';

class Starred extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Chip>Chip</Chip>
            </div>
        )
    }

}

export default Starred;