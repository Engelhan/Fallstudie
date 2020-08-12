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
import AddDialog from "./AddDialog"

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        float: "right",
        '&:hover': {
            color: "white",
            backgroundColor: '#f77376',
        }
    },
    iconHover:{
        '&:hover': {
            color: "white",
            backgroundColor: '#f77376',
        }
    },
    iconHover2:{
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
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        data: []
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const LoadProjects = () => {
        var resultData = [];
        axios.get("https://localhost:5001/project/getProjects"
        ).then((result) => {
            console.log(result.data);
            setTimeout(() => {
                setState((prevState) => {
                    const data = result.data;
                    return {...prevState, data};
                });
            }, 0);
        }).catch((error) => {
            console.log(error);
        });
        console.log(resultData);
        return resultData;
    };

    useEffect(() => {
        LoadProjects();
    }, []);

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
            ranking: parseInt(newData.ranking)
        };
    }

    const actions = () => {
        if(props.showInfoDialog === true){
           return [
                {
                    icon: () => <Announcement className={classes.iconHover}/>,
                    tooltip: 'Show All Information',
                    onClick: (event, rowData) => {
                        alert("Show more Info for: ID " + rowData.projectId + " Name: "+ rowData.projectName);
                    }
                }
            ]
        } else  {
            return [];
        }
    }

    return (<div>
            <MaterialTable
                title={props.title}
                columns={props.columns}
                data={state.data}
                options={{ pageSizeOptions: [8, 12, 20,], pageSize: 8, columnsButton: props.showColumnB }}
                actions={actions()}
                icons={{ViewColumn: () => <Dehaze className={classes.iconHover2}/>, Edit: () => <Edit className={classes.iconHover2}/>, Delete: () => <Delete className={classes.iconHover2}/>}}
                editable={{
                    isEditHidden: () => {return props.editHidden},
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    var convertedData =  convertForUpdate(newData)
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
                    isDeleteHidden: () => {return props.deleteHidden},
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
                <Button disabled={props.addHidden} startIcon={<Add/>} className={classes.button} onClick={handleClickOpen}>Neuer Antrag
                    Hinzufügen</Button>
                <Button startIcon={<ReloadIcon/>} className={classes.button}
                        onClick={LoadProjects}>Aktualisieren</Button>
            </ButtonGroup>
            <AddDialog open={open} handleClose={handleClose} addProject={addProject}/>
        </div>
    );
}