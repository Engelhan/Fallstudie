import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import axios from "axios";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ReloadIcon from '@material-ui/icons/Cached';
import Add from '@material-ui/icons/Add';
import AddDialog from "./AddDialog"

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        float: "right",
    },
    buttonGroup: {
        width: '100%',
        justifyContent: 'flex-end'
    }
}));

export default function ProjectTable() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        columns: [
            {title: 'Project Name', field: 'projectName'},
            {title: 'Score', defaultSort: "desc", field: 'customerSales', type: 'numeric', editable:'never'},
            {title: 'Planned Sales', field: 'plannedSales'},
            {title: 'Planned Profit', field: 'plannedProfit'},
            {title: 'Estimated Costs', field: 'estimatedCosts', type: 'numeric'},
            {title: 'Staff Costs', field: 'staffCosts', type: 'numeric'},
            {title: 'Staff Hours', field: 'staffHours', type: 'numeric'},
            {title: 'Employee Number', field: 'employeeNumber', type: 'numeric'},
            {title: 'Time Expenditure', field: 'timeExpenditure', type: 'numeric'},
            {title: 'End Date', field: 'endDate', type: 'date'},
            {title: 'Customer Priority', field: 'customerPriority', type: 'numeric'},
            {title: 'Customer Sales', field: 'customerSales', type: 'numeric'},
            // {title: 'Active', field: 'active', lookup: {true: 'yes', false: 'no'}},
        ],
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

    const UpdateProject = (newData) => {
        console.log(newData);
        axios.post("https://localhost:5001/project/updateProjects",
            getDataProject(newData)
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

    const AddNewProject = (newData) => {
        console.log(newData);
        axios.post("https://localhost:5001/project/addProjects",
            getDataProject(newData)
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

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
            setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                AddNewProject(newData)
                return {...prevState, data};
            });
        }, 0);
    };

    const convertForUpdate = (newData) => {
        return {
            projectId: newData.projectId,
            projectName: newData.projectName,
            plannedSales: parseInt(newData.plannedSales),
            plannedProfit: parseInt(newData.plannedProfit),
            estimatedCosts: parseInt(newData.estimatedCosts),
            staffCosts: parseInt(newData.staffCosts),
            staffHours: parseInt(newData.staffHours),
            employeeNumber: parseInt(newData.employeeNumber),
            timeExpenditure: parseInt(newData.timeExpenditure),
            endDate: newData.endDate,
            customerPriority: parseInt(newData.customerPriority),
            customerSales: parseInt(newData.customerSales)
        };
    }

    return (<div>
            <MaterialTable
                title="Projects"
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        var convertedData =  convertForUpdate(newData)
                                        data[data.indexOf(oldData)] = convertedData;
                                        UpdateProject(convertedData)
                                        return {...prevState, data};
                                    });
                                }
                            }, 600);
                        }),
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
                            }, 600);
                        }),
                }}
            />
            <ButtonGroup className={classes.buttonGroup} disableElevation variant="outlined" size="small"
                         color="inherit">
                <Button startIcon={<Add/>} className={classes.button} onClick={handleClickOpen}>Neuer Antrag
                    Hinzufügen</Button>
                <Button startIcon={<ReloadIcon/>} className={classes.button}
                        onClick={LoadProjects}>Aktualisieren</Button>
            </ButtonGroup>
            <AddDialog open={open} handleClose={handleClose} addProject={addProject}/>
        </div>
    );
}