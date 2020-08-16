import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import axios from "axios";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ReloadIcon from '@material-ui/icons/Cached';
import Add from '@material-ui/icons/Add';
import Announcement from '@material-ui/icons/Announcement';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/DeleteOutline';
import Dehaze from '@material-ui/icons/Dehaze';
import AddDialogInternal from "./AddDialogInternal"
import AddDialogExternal from "./AddDialogExternal"
import InformationDialog from "./InformationDialog"

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        float: "right",
        '&:hover': {
            color: "white",
            backgroundColor: '#f77376',
        }
    },
    iconHover: {
        '&:hover': {
            color: "white",
            backgroundColor: '#f77376',
        }
    },
    iconHover2: {
        '&:hover': {
            color: "#f77376",
        }
    },
    buttonGroup: {
        width: '100%',
        justifyContent: 'flex-start'
    }
}));

export default function ProjectTable(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [openI, setOpenI] = React.useState(false);
    const [openE, setOpenE] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [state, setState] = React.useState({
        data: []
    });
    const [infoData, setInfoData] = React.useState(null);

    const handleClickOpen = () => {
        if (props.title === "Internal") {
            setOpenI(true);
        } else {
            setOpenE(true);
        }
    };

    const handleClose = () => {
        if (props.title === "Internal") {
            setOpenI(false);
        } else {
            setOpenE(false);
        }
    };

    const LoadProjects = () => {
        setLoading(true);
        var resultData = [];
        var url = "https://localhost:5001/project/getNonArchivedProjects";
        if (props.title === "Internal") {
            url = "https://localhost:5001/project/getInternalProjects";
        }else if(props.title === "External"){
            url = "https://localhost:5001/project/getExternalProjects";
        }else if(props.title === "Archived"){
        url = "https://localhost:5001/project/getArchivedProjects";
        }
        axios.get(url).then((result) => {
            console.log(result.data);
            setTimeout(() => {
                setState((prevState) => {
                    const data = result.data;
                    return {...prevState, data};
                });
                setLoading(false);
            }, 0);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
        console.log(resultData);
        return resultData;
    };

    useEffect(() => {
        LoadProjects();
    }, [props.title]);

    const UpdateProject = (newData) => new Promise((resolve) => {
        console.log(newData);
        axios.post("https://localhost:5001/project/updateProjects",
            getDataProject(newData)
        ).then((result) => {
            console.log(result);
            newData = result.data[0];
            resolve(newData);
        }).catch((error) => {
            console.log(error);
            resolve(false);
        });
    });

    const AddNewProject = async (newData) => new Promise((resolve) => {
        console.log(newData);
        axios.post("https://localhost:5001/project/addProjects",
            getDataProject(newData)
        ).then((result) => {
            console.log(result.data[0]);
            newData = result.data[0];
            resolve(newData);
        }).catch((error) => {
            console.log(error);
            resolve(false);
        });
    });

    const DeleteProject = (dataToDelete) => {
        console.log(dataToDelete);
        axios.post("https://localhost:5001/project/deleteProjects",
            getDataProject(dataToDelete)
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

    const getDataProject = (data) => {
        return data;
    };

    const addProject = (newData) => {
        setTimeout(() => {
            AddNewProject(newData).then((result) => {
                console.log(result);
                setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(result);
                    return {...prevState, data};
                });
            })
        }, 0);
    };

    const convertForUpdate = (newData) => {
        return {
            projectId: newData.projectId,
            projectName: newData.projectName,
            plannedSales: parseInt(newData.plannedSales),
            estimatedCosts: parseInt(newData.estimatedCosts),
            costSavings: parseInt(newData.costSavings),
            staffCosts: parseInt(newData.staffCosts),
            staffHours: parseInt(newData.staffHours),
            employeeNumber: parseInt(newData.employeeNumber),
            timeExpenditure: parseInt(newData.timeExpenditure),
            endDate: newData.endDate,
            riskExpectedValue: parseInt(newData.riskExpectedValue),
            plannedProfit: parseInt(newData.plannedProfit),
            paybackPeriod: parseInt(newData.paybackPeriod),
            rentability: parseInt(newData.rentability),
            employeeSales: parseInt(newData.employeeSales),
            averageHourlyRate: parseInt(newData.averageHourlyRate),
            profitPerHour: parseInt(newData.profitPerHour),
            customerPriority: parseInt(newData.customerPriority),
            timeBuffer: parseInt(newData.timeBuffer),
            ranking: parseInt(newData.ranking),
            projectLeader: newData.projectLeader,
            projectMembers: newData.projectMembers,
            registrationDate: newData.registrationDate,
            goal: newData.goal
        };
    }

    const actions = () => {
        if (props.showInfoDialog === true) {
            return [
                {
                    icon: () => <Announcement className={classes.iconHover}/>,
                    tooltip: 'Show All Information',
                    onClick: (event, rowData) => {
                        setInfoData(rowData)
                        setOpenInfo(true);
                    }
                }
            ]
        } else {
            return [];
        }
    }

    return (<div>
            <MaterialTable
                isLoading={loading}
                title={props.title + " Projects"}
                columns={props.columns}
                data={state.data}
                options={{pageSizeOptions: [8, 12, 20,], pageSize: 8, columnsButton: props.showColumnB}}
                actions={actions()}
                icons={{
                    ViewColumn: () => <Dehaze className={classes.iconHover2}/>,
                    Edit: () => <Edit className={classes.iconHover2}/>,
                    Delete: () => <Delete className={classes.iconHover2}/>
                }}
                editable={{
                    isEditHidden: () => {
                        return props.editHidden
                    },
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    var convertedData = convertForUpdate(newData)
                                    UpdateProject(convertedData).then((result) => {
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = result;
                                            return {...prevState, data};
                                        });
                                    });
                                }
                            }, 0);
                        }),
                    isDeleteHidden: () => {
                        return props.deleteHidden
                    },
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    DeleteProject(oldData);
                                    return {...prevState, data};
                                });
                            }, 0);
                        }),
                }}
            />
            <ButtonGroup className={classes.buttonGroup} disableElevation variant="outlined" size="small"
                         color="inherit">
                {props.title === "All" || props.title === "Archived" ? null : <Button startIcon={<Add/>} className={classes.button}
                                                        onClick={handleClickOpen}>Add {props.title} Project
                </Button>}
                <Button startIcon={<ReloadIcon/>} className={classes.button}
                        onClick={LoadProjects}>Reload</Button>
            </ButtonGroup>
            <AddDialogInternal open={openI} handleClose={handleClose} addProject={addProject}/>
            <AddDialogExternal open={openE} handleClose={handleClose} addProject={addProject}/>
            <InformationDialog data={infoData} open={openInfo} handleClose={() => {setOpenInfo(false); setInfoData(null)}}/>
        </div>
    );
}