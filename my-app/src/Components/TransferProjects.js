import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper: {
        width: 500,
        height: 450,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferProjects(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        var switchToRight = left;
        var valueForProgress = 0;
        switchToRight.map((item, index) => {
            valueForProgress += parseInt(item.staffHours);
        })
        console.log(valueForProgress);
        props.setProgressbarNormalised(valueForProgress);
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        var switchToRight = leftChecked;
        var valueForProgress = 0;
        switchToRight.map((item, index) => {
            valueForProgress += parseInt(item.staffHours);
        })
        console.log(valueForProgress);
        props.setProgressbarNormalised(valueForProgress);
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        var switchToLeft = rightChecked;
        var valueForProgress = 0;
        switchToLeft.map((item, index) => {
            console.log(item.staffHours);
            valueForProgress -= parseInt(item.staffHours);
        })
        console.log(valueForProgress);
        props.setProgressbarNormalised(valueForProgress);
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        props.reset();
        setLeft(left.concat(right));
        setRight([]);
    };

    const LoadProjects = () => {
        var resultData = [];
        axios.get("https://localhost:5001/project/getProjects"
        ).then((result) => {
            var res = [];
            console.log(result);
            result.data.map((item, index) => {
                res.push(item);
            });
            setLeft(res);
            setRight([]);
        }).catch((error) => {
            console.log(error);
        });
        console.log(resultData);
        return resultData;
    };

    useEffect(() => {
        LoadProjects();
    }, []);

    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((item) => {
                    const labelId = `transfer-list-item-${item.projectId}-label`;
                    return (
                        <ListItem key={item.projectId} role="listitem" button onClick={handleToggle(item)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(item) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText disableTypography primary={
                                <Typography type="body2" style={{color: '#5858FA'}}>
                                    ID: {item.projectId} Name: {item.projectName} Staff Hours: {item.staffHours}
                                </Typography>
                            }
                            />
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );

    const getCicle = () => {
        return <Grid container direction="column" alignItems="center">
            <CircularProgress color="inherit"/>
        </Grid>
    };

    const getButtons = () => {
        return <Grid container direction="column" alignItems="center">
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
            >
                ≫
            </Button>
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
            >
                &gt;
            </Button>
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
            >
                &lt;
            </Button>
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
            >
                ≪
            </Button>
        </Grid>
    };

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                {props.scoreFilled === true ? getButtons() : getCicle()}
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    );
}
