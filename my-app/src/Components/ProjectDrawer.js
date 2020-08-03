import React from 'react';
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

import NewIcon from '@material-ui/icons/FiberNew';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import HelpIcon from '@material-ui/icons/Help';


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
    const [open, setOpen] = React.useState(false);
    const [view, setView] = React.useState({
        selectedView: 'MainTable'
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const switchView = (param) => {
        switch (param) {
            case 'MainTable':
                return <ProjectTable/>;
            case 'Upload':
                return <DropZone/>;
            case 'Planning':
                return <PlanningProjects/>;
            default:
                return <ProjectTable/>;
        }
    };

    const switchSetView = (param) => {
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
            default:
                setView((prevState) => {
                    prevState.selectedView = 'MainTable';
                    return {...prevState, prevState};
                });
        }
    };

    const switchM = (param) => {
        switch (param) {
            case 'Übersicht':
                return <NewIcon/>;
            case 'Upload':
                return <CloudUpload/>;
            case 'Planungsübersicht':
                return <ListAltIcon/>;
            case 'Abgeschlossen':
                return <CheckCircleOutlineIcon/>;
            case 'Mitarbeiter Übersicht':
                return <RecentActorsIcon/>;
            default:
                return <HelpIcon/>;
        }
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
                    <Typography variant="h6" noWrap>
                        Projectmanager
                    </Typography>
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
                    {['Übersicht', 'Upload'].map((text, index) => (
                        <ListItem button key={text} onClick={() => {
                            switchSetView(text)
                        }}>
                            <ListItemIcon>{switchM(text)}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['Planungsübersicht', 'Abgeschlossen', 'Mitarbeiter Übersicht'].map((text, index) => (
                        <ListItem button key={text} onClick={() => {
                            switchSetView(text)
                        }}>
                            <ListItemIcon>{switchM(text)}</ListItemIcon>
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