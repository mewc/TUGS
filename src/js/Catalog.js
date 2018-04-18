import React, {Component} from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import {
    IconButton,
    Subheader,
    LinearProgress,
} from 'material-ui';
import StarIcon from 'material-ui/svg-icons/action/stars';
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
            gridRender: <GridList
                cellHeight={100}
                style={styles.gridList}
                className=""
            >
                <Subheader>Catalog</Subheader>
                {
                    this.props.data.schools[0].faculties[0].subjects.map((tile) => (
                        <GridTile
                            key={tile.code}
                            title={tile.title}
                            subtitle={<span>Intensity: {tile.avgIntensityRating}
                                <LinearProgress
                                    mode={'determinate'}
                                    max={1}
                                    min={0}
                                    value={((tile.avgIntensityRating - 1) * -1)}//flipped because the changing of colour for progress bar only did one side.
                                    style={{width: 50, backgroundColor: "#ab0000", margin: "auto"}}
                                />
                            </span>}
                            actionIcon={<IconButton><StarIcon/></IconButton>}
                            style={{backgroundColor: "#118800"}}
                        >
                        </GridTile>
                    ))}
            </GridList>,
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
                {this.props.data.schools[0].faculties[0].subjects.map((item) => {
                    return <SubjectCard key={item.id} item={item} requestReview={this.props.requestReview}
                                 loggedIn={this.props.user.loggedIn} starred={this.isStarred(item.id)}/>
                })}
            </div>
        )
    }

}


export default Catalog;
