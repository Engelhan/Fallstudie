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
        justifyContent: 'flex-start'
    }
}));

export default function ProjectTable() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        columns: [
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
            {title: 'Planned Profit', field: 'plannedProfit', type: 'numeric', editable: 'never'},
            {title: 'Payback Period', field: 'paybackPeriod', type: 'numeric', editable: 'never'},
            {title: 'Rentability', field: 'rentability', type: 'numeric', editable: 'never'},
            {title: 'Employee Sales', field: 'employeeSales', type: 'numeric', editable: 'never'},
            {title: 'Average Hourly Rate', field: 'averageHourlyRate', type: 'numeric', editable: 'never'},
            {title: 'Profit Per Hour', field: 'profitPerHour', type: 'numeric', editable: 'never'},
            {title: 'Customer Priority', field: 'customerPriority', type: 'numeric', editable: 'never'},
            {title: 'Time Buffer', field: 'timeBuffer', type: 'numeric', editable: 'never'},
            // {title: 'Active', field: 'active', lookup: {true: 'yes', false: 'no'}},
        ],
        data: [],
        options: {pageSizeOptions: [8, 12, 20,], pageSize: 8 }
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

    return (<div>
            <MaterialTable
                title="Projekts"
                columns={state.columns}
                data={state.data}
                options={state.options}
                pageSizeOptions={[10,15,20]}
                editable={{
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
                <Button startIcon={<Add/>} className={classes.button} onClick={handleClickOpen}>Neuer Antrag
                    Hinzufügen</Button>
                <Button startIcon={<ReloadIcon/>} className={classes.button}
                        onClick={LoadProjects}>Aktualisieren</Button>
            </ButtonGroup>
            <AddDialog open={open} handleClose={handleClose} addProject={addProject}/>
        </div>
    );
}