import React from 'react';
import MaterialTable from "material-table";

export default function ProjectTable() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Project Name', field: 'name' },
            { title: 'Size', field: 'size' },
            { title: 'Prio', field: 'prio', type: 'numeric' },
            {
                title: 'Active',
                field: 'active',
                lookup: { 1: 'yes', 2: 'no' },
            },
        ],
        data: [
            { name: 'Project1', size: '3', prio: 3, active: 2 },
            { name: 'Project2', size: '5', prio: 2, active: 1 },
            { name: 'Project3', size: '6', prio: 2, active: 1 },
            { name: 'Project4', size: '3', prio: 1, active: 1 },
        ],
    });

    return (
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
                                return { ...prevState, data };
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
                                    return { ...prevState, data };
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
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}