import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    hover:{
        '&:hover': {
            color: "white",
            backgroundColor: '#f77376',
        }
    },

}));

export default function AddDialogInternal(props) {
    const classes = useStyles();
    //KPIs
    const [emptyName, setEmptyName] = React.useState(false);
    const [projectName, setProjectName] = React.useState("");
    const [plannedSales, setPlannedSales] = React.useState(0);
    const [estimatedCosts, setEstimatedCosts] = React.useState(0);
    const [staffCosts, setStaffCosts] = React.useState(0);
    const [staffHours, setStaffHours] = React.useState(0);
    const [employeeNumber, setEmployeeNumber] = React.useState(0);
    const [timeExpenditure, setTimeExpenditure] = React.useState(0);
    const [endDate, setEndDate] = React.useState(new Date());
    const [customerPriority, setCustomerPriority] = React.useState(0);
    const [riskExpectedValue, setRiskExpectedValue] = React.useState(0);
    //Bewegungsdaten
    const [projectLeader, setProjectLeader] = React.useState("");
    const [projectMembers, setProjectMembers] = React.useState("");
    const [registrationDate, setRegistrationDate] = React.useState(new Date());
    const [goal, setGoal] = React.useState("");
    //Customer
    const [customer, setCustomer] = React.useState(1);
    const setToDefault = () => {
        setProjectName("");
        setPlannedSales(0);
        setEstimatedCosts(0);
        setStaffCosts(0);
        setStaffHours(0);
        setEmployeeNumber(0);
        setTimeExpenditure(0);
        setEndDate(new Date());
        setCustomerPriority(0)
        setRiskExpectedValue(0);
        setProjectLeader("");
        setProjectMembers("");
        setRegistrationDate(new Date());
        setGoal("");
    };

    const addNew = () => {
        if (projectName === "") {
            setEmptyName(true);
            return;
        }
        var newProject = {
            projectId: 0,
            projectName: projectName,
            plannedSales: plannedSales,
            estimatedCosts: estimatedCosts,
            staffCosts: staffCosts,
            staffHours: staffHours,
            employeeNumber: employeeNumber,
            timeExpenditure: timeExpenditure,
            endDate: endDate.toISOString(),
            customerPriority: customerPriority,
            riskExpectedValue: riskExpectedValue,
            projectLeader: projectLeader,
            projectMembers: projectMembers,
            registrationDate: registrationDate.toISOString(),
            goal: goal
        }
        props.addProject(newProject);
        props.handleClose();
        setToDefault();
        setEmptyName(false);
    };

    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    return (
        <div>
            <Dialog maxWidth={"md"} open={props.open} onClose={() => {
                props.handleClose();
                setToDefault();
                setEmptyName(false);
            }} aria-labelledby="form-dialog-title">
                <DialogTitle style={{fontWeight: "bold"}} id="form-dialog-title">New external Project</DialogTitle>
                <DialogContent style={{overflow: "hidden", height: "100%", width: "100%"}}>

                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" className={classes.hover} onClick={addNew}>
                        Apply
                    </Button>
                    <Button variant="outlined" size="small" className={classes.hover} onClick={() => {
                        props.handleClose();
                        setToDefault();
                        setEmptyName(false);
                    }} >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
