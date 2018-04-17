import React, {Component} from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import {IconButton, Subheader, LinearProgress} from 'material-ui';
import StarIcon from 'material-ui/svg-icons/action/stars';


import '../css/App.css';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',

    },
}

const testDataFull = {
    faculty: "Information Technology",
    subjects: [
        {
            code: 'FIT1031',
            title: 'Computers & Networks',
            avgIntensityRating: 0.5,

        },
        {
            code: 'FIT1040',
            title: 'Programming Fundamentals',
            avgIntensityRating: 0.2,

        },
        {
            code: 'FIT3047',
            title: 'Mobile Development',
            avgIntensityRating: 0.8,

        }
    ]

}

const testData = testDataFull.subjects;

class Catalog extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <GridList
                    cellHeight={200}
                    style={styles}>
                    <Subheader>Catalog</Subheader>
                    {
                        testData.map((tile) => (
                            console.log(tile),
                            <GridTile
                            key={tile.code}
                            title={tile.title}
                            subtitle={<span>Intensity: {tile.avgIntensityRating}
                            <LinearProgress
                                mode={'determinate'}
                                max={1}
                                min={0}
                                value={   ((tile.avgIntensityRating - 1) * -1)  }//flipped because the changing of colour for progress bar only did one side.
                                style={{width: 50, backgroundColor: "#ab0000"}}
                            />
                            </span>}
                            actionIcon={<IconButton><StarIcon/></IconButton>}
                            style={{backgroundColor: "#118800"}}
                            >
                            </GridTile>
                        ))}
                </GridList>
            </div>
        )
    }

}


export default Catalog;
