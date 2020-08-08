import React, {useEffect} from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import ProjectTable from "./ProjectTable";
import DropZone from "./DropZone";
import PlanningProjects from "./Planning";
import LoginForm from "./LoginForm";

import NewIcon from '@material-ui/icons/FiberNew';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToApp from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import AccountBox from '@material-ui/icons/AccountBox';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    }, title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [user, setUser] = React.useState("");
    const [role, setRole] = React.useState("Admin");
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [view, setView] = React.useState({
        selectedView: 'Logout'
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (loggedIn === true) {
            setView((prevState) => {
                prevState.selectedView = 'MainTable';
                return {...prevState, prevState};
            });
        }
    }, [loggedIn]);

    const switchView = (param) => {
        console.log("switchView " + loggedIn);
        if (loggedIn === false) {
            param = "Logout"
        }
        switch (param) {
            case 'MainTable':
                return <ProjectTable/>;
            case 'Upload':
                return <DropZone/>;
            case 'Planning':
                return <PlanningProjects/>;
            case 'Logout':
                return <LoginForm setLoggedIn={setLoggedIn} setUser={setUser}/>;
            default:
                return <ProjectTable/>;
        }
    };

    const switchSetView = (param) => {
        if (loggedIn === false) {
            return;
        }
        switch (param) {
            case 'Übersicht':
                setView((prevState) => {
                    prevState.selectedView = 'MainTable';
                    return {...prevState, prevState};
                });
                break
            case 'Upload':
                setView((prevState) => {
                    prevState.selectedView = 'Upload';
                    return {...prevState, prevState};
                });
                break
            case 'Planungsübersicht':
                setView((prevState) => {
                    prevState.selectedView = 'Planning';
                    return {...prevState, prevState};
                });
                break
            case 'Logout':
                setView((prevState) => {
                    prevState.selectedView = 'Logout';
                    return {...prevState, prevState};
                });
                break
            default:
                setView((prevState) => {
                    prevState.selectedView = 'Logout';
                    return {...prevState, prevState};
                });
        }
    };

    const switchRoles = (top) => {
        switch (role) {
            case 'Admin':
                if (top === true) {
                    return ['Übersicht', 'Upload'];
                } else {
                    return ['Planungsübersicht', 'Logout'];
                }
            case 'ProjectManager':
                if (top === true) {
                    return ['Übersicht'];
                } else {
                    return ['Planungsübersicht', 'Logout'];
                }
            case 'Controlling':
                if (top === true) {
                    return ['Übersicht'];
                } else {
                    return ['Logout'];
                }
            default:
                if (top === true) {
                    return [];
                } else {
                    return ['Logout'];
                }
        }
    };

    const switchIcons = (param) => {
        switch (param) {
            case 'Übersicht':
                return <NewIcon/>;
            case 'Upload':
                return <CloudUpload/>;
            case 'Planungsübersicht':
                return <ListAltIcon/>;
            case 'Logout':
                return <ExitToApp/>;
            default:
                return <HelpIcon/>;
        }
    };

    const displayLoggedInUser = () => {
        return (
            <IconButton color="inherit">
                <AccountBox/>
                <Typography variant="caption" className={classes.title} noWrap>
                    {user.username + ", " + role}
                </Typography>
            </IconButton>
        )
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        Projectmanager
                    </Typography>
                    { loggedIn === true ? displayLoggedInUser() :<div/> }
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <List>
                    {switchRoles(true).map((text, index) => (
                    <ListItem button key={text} onClick={() => {
                        switchSetView(text)
                    }}>
                        <ListItemIcon>{switchIcons(text)}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {switchRoles(false).map((text, index) => (
                        <ListItem button key={text} onClick={() => {
                            switchSetView(text)
                            if (text === 'Logout') {
                                setLoggedIn(false);
                            }
                        }}>
                            <ListItemIcon>{switchIcons(text)}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {switchView(view.selectedView)}
            </main>
        </div>
    );
}