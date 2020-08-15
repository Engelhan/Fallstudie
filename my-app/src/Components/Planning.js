import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TransferProjects from "./TransferProjects"
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import {Grid, TextField} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    buttonGreen: {
        marginTop: theme.spacing(2),
        background: "MediumSeaGreen",
        color: "GhostWhite",
        '&:hover': {
            background: "YellowGreen",
            color: "GhostWhite"
        },
    },
    buttonRed: {
        marginTop: theme.spacing(2),
        background: "IndianRed",
        color: "GhostWhite",
        '&:hover': {
            background: "LightCoral",
            color: "GhostWhite"
        },
    },
    buttonGroup: {
        width: '100%',
        justifyContent: 'center'
    },
    barGreen: {
        backgroundColor: "YellowGreen"
    },
    barRootGreen: {
        backgroundColor: "MediumSeaGreen"
    },
    barRed: {
        backgroundColor: "IndianRed"
    },
    barRootRed: {
        backgroundColor: "LightCoral"
    }
}));

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function PlanningProjects() {
    const classes = useStyles();
    const min = 0;
    const [progress, setProgress] = React.useState(0);
    const [maxScore, setMaxScore] = React.useState();
    const [scoreFilled, setScoreFilled] = React.useState(false);
    const [archivedProjects, setArchivedProjects] = React.useState([]);

    //MIN = Minimum expected value
    //MAX = Maximium expected value
    //Function to normalise the values (MIN / MAX could be integrated)
    const normalise = value => (value - min) * 100 / (maxScore - min);

    const setProgressbarNormalised = (val) => {
        var res = progress + normalise(val);
        setProgress(() => (res));
        console.log(progress);
    }

    const setProjectArchived = (projects) => {
        setArchivedProjects(projects);
    }

    const archiveProjects = () => {
        archivedProjects.forEach(project => {
            project.archived = true;
            axios.post("https://localhost:5001/project/updateProjects",
                project
            ).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            });
        })
        setMaxScore(0);
    }

    useEffect(() => {
        if (maxScore === 0) {
            setScoreFilled(false);
        } else if (maxScore) {
            setScoreFilled(true);
        } else {
            setScoreFilled(false);
        }
    }, [maxScore]);

    return (
        <div className={classes.root}>
            <h1>Project Resource Planning</h1>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                <TextField variant={'outlined'} value={maxScore} onChange={(event) => {
                    var result = event.target.value;
                    if (result <= 0) {
                        result = 0;
                    }
                    setMaxScore(result);
                    setProgress(() => (0));
                }} id="maxScore" label="Available Staff Hours" type="number" autoFocus required/>
            </Box>
            <TransferProjects scoreFilled={scoreFilled} setProjectsArchived={setProjectArchived} key={maxScore} reset={() => {
                setProgress(() => (0));
            }} setProgressbarNormalised={setProgressbarNormalised}/>
            <LinearProgressWithLabel value={progress}
                                     classes={progress <= 100 ? {barColorPrimary: classes.barRootGreen,} : {barColorPrimary: classes.barRootRed,}}
                                     className={progress <= 100 ? classes.barGreen : classes.barRed}/>
            <ButtonGroup className={classes.buttonGroup} disableElevation variant="outlined" size="small"
                         color="inherit">
                <Button startIcon={progress <= 100 ? <Check/> : <Clear/>}
                        className={progress <= 100 ? classes.buttonGreen : classes.buttonRed}
                        onClick={progress <= 100 ? archiveProjects : ""}
                    >Plannung abschließen</Button>
            </ButtonGroup>
        </div>
    );
}
