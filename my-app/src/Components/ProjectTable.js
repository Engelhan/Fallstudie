import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import axios from "axios";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ReloadIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
        float: "right"
    },
    buttonGroup: {
        width: '100%',
        justifyContent: 'flex-end'
    }
}));

export default function ProjectTable() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            {title: 'Project Name', field: 'projectName'},
            {title: 'Size', field: 'size'},
            {title: 'Prio', field: 'prio', type: 'numeric'},
            {
                title: 'Active',
                field: 'active',
                lookup: {true: 'yes', false: 'no'},
            },
        ],
        data: []
    });

    const LoadProjects = () => {
        var resultData = [];
        axios.get("https://localhost:5001/weatherforecast/getProjects"
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
        axios.post("https://localhost:5001/weatherforecast/updateProjects",
            getDataProject(newData)
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

    const AddNewProject = (newData) => {
        console.log(newData);
        axios.post("https://localhost:5001/weatherforecast/addProjects",
            getDataProject(newData)
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

    const DeleteProject = (dataToDelete) => {
        console.log(dataToDelete);
        axios.post("https://localhost:5001/weatherforecast/deleteProjects",
            getDataProject(dataToDelete)
        ).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

    const getDataProject = (data) => {
        return {
            projectId: data.projectId,
            projectName: data.projectName,
            size: parseInt(data.size),
            prio: parseInt(data.prio),
            active: (data.active === "true")
        }
    };

    return (<div>
            <MaterialTable
                title="Projects"
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    AddNewProject(newData)
                                    return {...prevState, data};
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        UpdateProject(newData)
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
                <Button startIcon={<ReloadIcon/>} className={classes.button}
                        onClick={LoadProjects}>Aktualisieren</Button>
            </ButtonGroup>
        </div>
    );
}