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
    hover: {
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
    const [plannedSalesToSmall, setPlannedSalesToSmall] = React.useState(false);
    const [projectName, setProjectName] = React.useState("");
    const [plannedSales, setPlannedSales] = React.useState(1);
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
    const [customerName, setCustomerName] = React.useState("1");
    const setToDefault = () => {
        setProjectName("");
        setPlannedSales(1);
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
        setCustomerName("1")
    };

    const addNew = () => {
        if (projectName === "") {
            setEmptyName(true);
            return;
        }
        if (plannedSales === null || plannedSales <= 0) {
            setPlannedSalesToSmall(true);
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
            goal: goal,
            customerName: customerName
        }
        props.addProject(newProject);
        props.handleClose();
        setToDefault();
        setEmptyName(false);
        setPlannedSalesToSmall(false);
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
                setPlannedSalesToSmall(false);
            }} aria-labelledby="form-dialog-title">
                <DialogTitle style={{fontWeight: "bold"}} id="form-dialog-title">New external Project</DialogTitle>
                <DialogContent style={{overflow: "hidden", height: "100%", width: "100%"}}>
                    <Grid container spacing={0}>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle2" noWrap>
                                    Key-Performance-Indicator
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setProjectName(event.target.value);
                                }} value={projectName} margin="dense" id="ProjectName"
                                           helperText={emptyName === true ? "Has  to be Filled!" : ""} error={emptyName}
                                           label="ProjectName" type="text" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange={(event,) => {
                                    setPlannedSales(parseInt(event.target.value));
                                }} value={plannedSales} margin="dense" id="PlannedSales"
                                           helperText={plannedSalesToSmall === true ? "Values < 0 are invalid!" : ""}
                                           error={plannedSalesToSmall}
                                           label="PlannedSales" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setEstimatedCosts(parseInt(event.target.value));
                                }} value={estimatedCosts} margin="dense" id="EstimatedCosts"
                                           label="EstimatedCosts" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setStaffHours(parseInt(event.target.value));
                                }} value={staffHours} margin="dense" id="StaffHours"
                                           label="StaffHours" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setEmployeeNumber(parseInt(event.target.value));
                                }} value={employeeNumber} margin="dense" id="EmployeeNumber"
                                           label="EmployeeNumber" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setEndDate(new Date(event.target.value));
                                }}
                                           margin="dense" id="EndDate" label="EndDate" type="date" fullWidth
                                           defaultValue={new Date().toDateInputValue()}
                                           InputLabelProps={{shrink: true}}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setRiskExpectedValue(parseInt(event.target.value));
                                }} value={riskExpectedValue} margin="dense" id="RiskExpectedValue"
                                           label="RiskExpectedValue" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setTimeExpenditure(parseInt(event.target.value));
                                }} value={timeExpenditure} margin="dense" id="TimeExpenditure"
                                           label="TimeExpenditure" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setStaffCosts(parseInt(event.target.value));
                                }} value={staffCosts} margin="dense" id="StaffCosts"
                                           label="StaffCosts" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setCustomerPriority(parseInt(event.target.value));
                                }} value={customerPriority} margin="dense" id="CustomerPriority"
                                           label="CustomerPriority" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid style={{marginTop: 15}} container item xs={12} spacing={1}>
                            <Grid item xs={6}>
                                <Typography style={{fontWeight: "bold", marginTop: 25}}
                                            variant="subtitle2" noWrap>
                                    Transaction-Data and Customer-Data
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <InputLabel htmlFor="age-native-simple">Customer</InputLabel>
                                    <Select native onChange={(event) => {
                                        setCustomerName(event.target.value);
                                    }} value={customerName}
                                            inputProps={{
                                                name: 'Customer',
                                                id: 'Customer-native-simple',
                                            }}>
                                        <option value={1}>Customer 1</option>
                                        <option value={2}>Customer 2</option>
                                        <option value={3}>Customer 3</option>
                                        <option value={4}>Customer 4</option>
                                        <option value={5}>Customer 5</option>
                                        <option value={6}>Customer 6</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setProjectLeader(event.target.value);
                                }} value={projectLeader} margin="dense" id="ProjectLeader"
                                           label="ProjectLeader" type="text" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <Tooltip title="Seperator: , (Example Data: John Wick, Peter Packer)" enterDelay={500}
                                         leaveDelay={200}>
                                    <TextField onChange={(event) => {
                                        setProjectMembers(event.target.value);
                                    }} value={projectMembers} margin="dense" id="ProjectMembers"
                                               label="ProjectMembers" type="text" fullWidth/>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setRegistrationDate(new Date(event.target.value));
                                }}
                                           margin="dense" id="RegistrationDate" label="RegistrationDate" type="date"
                                           fullWidth
                                           defaultValue={new Date().toDateInputValue()}
                                           InputLabelProps={{shrink: true}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setGoal(event.target.value);
                                }} value={goal} margin="dense" id="Goal"
                                           label="Goal" type="text" fullWidth/>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" className={classes.hover} onClick={addNew}>
                        Apply
                    </Button>
                    <Button variant="outlined" size="small" className={classes.hover} onClick={() => {
                        props.handleClose();
                        setToDefault();
                        setEmptyName(false);
                        setPlannedSalesToSmall(false);
                    }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
