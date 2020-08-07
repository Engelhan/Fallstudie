import React from 'react';
import {Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {AccountBox, Lock, VpnKey} from '@material-ui/icons'
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(5),
    },
    padding: {
        padding: theme.spacing(5),
        width: "50%",
        margin: "auto"
    }
}));

export default function LoginTab(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const classes = useStyles();

    const handleClickLogin = () => {
        axios.post("https://localhost:5001/weatherforecast/login",
            {username: username, password: password}
        ).then((result) => {
            console.log(result);
            props.setLoggedIn(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <AccountBox/>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField value={username} onChange={(event) => {
                            setUsername(event.target.value);
                        }} id="username" label="Username" type="email" fullWidth autoFocus required/>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Lock/>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField value={password} onChange={(event) => {
                            setPassword(event.target.value);
                        }} id="password" label="Password" type="password" fullWidth required/>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Button startIcon={<VpnKey/>} className={classes.button}
                            onClick={handleClickLogin} variant="outlined" size="small"
                            color="inherit">Login</Button>
                </Grid>
            </div>
        </Paper>
    );
}
