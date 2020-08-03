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

// Todo: Button und Dropzone funktion für upload
export default function PlanningProjects() {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 150 ? 10 : prevProgress + 10));
        }, 1800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <h1>Ressourcenplanung</h1>
            <LinearProgressWithLabel value={progress}
                                     classes={progress <= 100 ? { barColorPrimary: classes.barRootGreen, } : { barColorPrimary: classes.barRootRed, }}
                                     className={progress <= 100 ? classes.barGreen : classes.barRed} />
            <TransferProjects/>
            <ButtonGroup className={classes.buttonGroup} disableElevation variant="outlined" size="small"
                         color="inherit">
                <Button startIcon={progress <= 100 ? <Check/> : <Clear/>}
                        className={progress <= 100 ? classes.buttonGreen : classes.buttonRed}>Plannung
                    abschließen</Button>
            </ButtonGroup>
        </div>
    );
}
