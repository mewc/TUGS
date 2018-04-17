import React, {Component} from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import {
    IconButton,
    Subheader,
    LinearProgress,
    Card,
    CardActions,
    CardMedia,
    CardHeader,
    CardText,
    CardTitle
} from 'material-ui';
import {Rating} from 'material-ui-rating';
import StarIcon from 'material-ui/svg-icons/action/stars';


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

var testData = {};


class Catalog extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        testData = props.data.subjects;
        this.state = {
            gridRender: <GridList
                cellHeight={100}

                style={styles.gridList}
                className=""
            >
                <Subheader>Catalog</Subheader>
                {
                    testData.map((tile) => (
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


    render() {
        return (
            <div>
                {testData.map((item) => (
                        <Card key={item.id} style={{width: "50%", margin: "auto"}}>
                            <CardHeader showExpandableButton={true} actAsExpander={true} title={item.code + "  " + item.title} />
                            <CardTitle subtitle={
                                <span style={{display: "inline"}}>
                                    <span style={{display: "inline"}}>
                                        Is this rewarding?
                                        <Rating
                                            value={3}
                                            max={5}
                                            onChange={(value) => console.log(`Rated with value ${value}`)}
                                        />
                                    </span>
                                    <span style={{display: "inline"}}>
                                        Intensity: {item.avgIntensityRating}
                                        <LinearProgress
                                            mode={'determinate'}
                                            max={1}
                                            min={0}
                                            value={((item.avgIntensityRating - 1) * -1)}//flipped because the changing of colour for progress bar only did one side.
                                            style={{width: 70, height: 10, backgroundColor: "#ab0000", margin: "auto", }}
                                        />
                                    </span>
                                </span>}/>

                            <CardText expandable={true}>
                                <h4>Tips</h4>{item.tips}
                            </CardText>


                        </Card>
                    ))}
            </div>
        )
    }

}


export default Catalog;
