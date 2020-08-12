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
import Public from '@material-ui/icons/Public';
import Business from '@material-ui/icons/Business';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    divider: {
        // Theme Color, or use css color in quote
        background: 'white',
    },
    appBar: {
        background: '#143a4e',
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
    hoverButton:{
        '&:hover': {
            backgroundColor: '#f77376',
        }
    },
    iconButton:{
        color: "white"
    },
    drawer: {
        opacity: 0.75,
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        background: '#64bab6',
        color: "white",
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: '#64bab6',
        color: "white",
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
        padding: theme.spacing(2), overflow: "auto"
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


    const getAllColumns = () => {
        return [
            {title: 'Project Name', field: 'projectName',  cellStyle: { backgroundColor: '#edf7f7' }, headerStyle: { backgroundColor: '#dcefee'}},
            {title: 'Ranking', field: 'ranking', defaultSort: "desc", type: 'numeric', editable:'never', cellStyle: { backgroundColor: '#edf7f7' }, headerStyle: { backgroundColor: '#dcefee'}},
            {title: 'Planned Sales', field: 'plannedSales', type: 'numeric'},
            {title: 'Estimated Costs', field: 'estimatedCosts', type: 'numeric'},
            {title: 'Cost Savings', field: 'costSavings', type: 'numeric'},
            {title: 'Staff Costs', field: 'staffCosts', type: 'numeric'},
            {title: 'Staff Hours', field: 'staffHours', type: 'numeric'},
            {title: 'Employee Number', field: 'employeeNumber', type: 'numeric'},
            {title: 'Time Expenditure', field: 'timeExpenditure', type: 'numeric'},
            {title: 'End Date', field: 'endDate', type: 'date'},
            {title: 'Risk Expected Value', field: 'riskExpectedValue', type: 'numeric'},
            {title: 'Planned Profit', field: 'plannedProfit', type: 'numeric', editable: 'never'},
            {title: 'Payback Period', field: 'paybackPeriod', type: 'numeric', editable: 'never'},
            {title: 'Rentability', field: 'rentability', type: 'numeric', editable: 'never'},
            {title: 'Employee Sales', field: 'employeeSales', type: 'numeric', editable: 'never'},
            {title: 'Average Hourly Rate', field: 'averageHourlyRate', type: 'numeric', editable: 'never'},
            {title: 'Profit Per Hour', field: 'profitPerHour', type: 'numeric', editable: 'never'},
            {title: 'Customer Priority', field: 'customerPriority', type: 'numeric', editable: 'never'},
            {title: 'Time Buffer', field: 'timeBuffer', type: 'numeric', editable: 'never'},
            // {title: 'Active', field: 'active', lookup: {true: 'yes', false: 'no'}},
        ];
    }

    const getInternalColumns = () => {
        return [
            {title: 'Project Name', field: 'projectName'},
            {title: 'Ranking', field: 'ranking', defaultSort: "desc", type: 'numeric', editable:'never'},
            {title: 'Planned Sales', field: 'plannedSales', type: 'numeric'},
            {title: 'Estimated Costs', field: 'estimatedCosts', type: 'numeric'},
            {title: 'Cost Savings', field: 'costSavings', type: 'numeric'},
            {title: 'Staff Costs', field: 'staffCosts', type: 'numeric'},
            {title: 'Staff Hours', field: 'staffHours', type: 'numeric'},
            {title: 'Employee Number', field: 'employeeNumber', type: 'numeric'},
            {title: 'Time Expenditure', field: 'timeExpenditure', type: 'numeric'},
            {title: 'End Date', field: 'endDate', type: 'date'},
            {title: 'Risk Expected Value', field: 'riskExpectedValue', type: 'numeric'},
            {title: 'Planned Profit', field: 'plannedProfit', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Payback Period', field: 'paybackPeriod', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Rentability', field: 'rentability', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Employee Sales', field: 'employeeSales', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Average Hourly Rate', field: 'averageHourlyRate', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Profit Per Hour', field: 'profitPerHour', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Customer Priority', field: 'customerPriority', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Time Buffer', field: 'timeBuffer', type: 'numeric', editable: 'never', hidden: true},
            // {title: 'Active', field: 'active', lookup: {true: 'yes', false: 'no'}},
        ];
    }

    const getExternalColumns = () => {
        return [
            {title: 'Project Name', field: 'projectName'},
            {title: 'Ranking', field: 'ranking', defaultSort: "desc", type: 'numeric', editable:'never'},
            {title:  'Planned Sales', field: 'plannedSales', type: 'numeric', hidden: true,},
            {title: 'Estimated Costs', field: 'estimatedCosts', type: 'numeric'},
            {title: 'Cost Savings', field: 'costSavings', type: 'numeric'},
            {title: 'Staff Costs', field: 'staffCosts', type: 'numeric'},
            {title: 'Staff Hours', field: 'staffHours', type: 'numeric'},
            {title: 'Employee Number', field: 'employeeNumber', type: 'numeric'},
            {title: 'Time Expenditure', field: 'timeExpenditure', type: 'numeric'},
            {title: 'End Date', field: 'endDate', type: 'date'},
            {title: 'Risk Expected Value', field: 'riskExpectedValue', type: 'numeric'},
            {title: 'Planned Profit', field: 'plannedProfit', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Payback Period', field: 'paybackPeriod', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Rentability', field: 'rentability', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Employee Sales', field: 'employeeSales', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Average Hourly Rate', field: 'averageHourlyRate', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Profit Per Hour', field: 'profitPerHour', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Customer Priority', field: 'customerPriority', type: 'numeric', editable: 'never', hidden: true},
            {title: 'Time Buffer', field: 'timeBuffer', type: 'numeric', editable: 'never', hidden: true},
            // {title: 'Active', field: 'active', lookup: {true: 'yes', false: 'no'}},
        ];
    }

    const switchView = (param) => {
        console.log("switchView " + loggedIn);
        if (loggedIn === false) {
            param = "Logout"
        }
        switch (param) {
            case 'MainTable':
                return <ProjectTable columns={getAllColumns()} showInfoDialog={true} title={"All Projects"} showColumnB={true} addHidden={true} editHidden={true} deleteHidden={true}/>;
            case 'MainTableInternal':
                return <ProjectTable columns={getInternalColumns()}  showInfoDialog={false} title={"Internal Projects"} showColumnB={false} addHidden={false} editHidden={false} deleteHidden={false}/>;
            case 'MainTableExternal':
                return <ProjectTable columns={getExternalColumns()} showInfoDialog={false} title={"External Projects"} showColumnB={false} addHidden={false} editHidden={false} deleteHidden={false}/>;
            case 'Upload':
                return <DropZone/>;
            case 'Planning':
                return <PlanningProjects/>;
            case 'Logout':
                return <LoginForm setRole={setRole} setLoggedIn={setLoggedIn} setUser={setUser}/>;
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
            case 'Übersicht Intern':
                setView((prevState) => {
                    prevState.selectedView = 'MainTableInternal';
                    return {...prevState, prevState};
                });
                break
            case 'Übersicht Extern':
                setView((prevState) => {
                    prevState.selectedView = 'MainTableExternal';
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

    const switchRoles = (pos) => {
        switch (role) {
            case 'Admin':
                if (pos === 1) {
                    return ['Übersicht','Übersicht Intern','Übersicht Extern'];
                } else if(pos === 2) {
                    return ['Planungsübersicht', 'Upload'];
                }else {
                    return ['Logout'];
                }
            case 'ProjectManager':
                if (pos === 1) {
                    return ['Übersicht','Übersicht Intern','Übersicht Extern',];
                }else if(pos === 2) {
                    return ['Planungsübersicht'];
                }else {
                    return ['Logout'];
                }
            case 'Controlling':
                if (pos === 1) {
                    return ['Übersicht'];
                } else {
                    return ['Logout'];
                }
            default:
                if (pos === 1 || pos === 2) {
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
            case 'Übersicht Intern':
                return  <Business/>;
            case 'Übersicht Extern':
                return <Public/>;
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
            <IconButton color="inherit" disableFocusRipple={true} disableRipple={true}>
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
                position="absolute"
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
                    {switchRoles(1).map((text, index) => (
                    <ListItem className={classes.hoverButton} button key={text} onClick={() => {
                        switchSetView(text)
                    }}>
                        <ListItemIcon className={classes.iconButton}>{switchIcons(text)}</ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: {fontWeight: "bold"}}} primary={text}/>
                    </ListItem>
                    ))}
                </List>
                <Divider classes={{root: classes.divider}}/>
                <List>
                    {switchRoles(2).map((text, index) => (
                        <ListItem className={classes.hoverButton} button key={text} onClick={() => {
                            switchSetView(text)
                        }}>
                            <ListItemIcon className={classes.iconButton}>{switchIcons(text)}</ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: {fontWeight: "bold"}}} primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider hidden={role === "Controlling"}  classes={{root: classes.divider}} />
                <List>
                    {switchRoles(3).map((text, index) => (
                        <ListItem className={classes.hoverButton} button key={text} onClick={() => {
                            switchSetView(text)
                            if (text === 'Logout') {
                                setLoggedIn(false);
                            }
                        }}>
                            <ListItemIcon className={classes.iconButton}>{switchIcons(text)}</ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: {fontWeight: "bold"}}} primary={text}/>
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