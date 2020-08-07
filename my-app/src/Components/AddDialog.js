import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function AddDialog(props) {
    const [emptyName, setEmptyName] = React.useState(false);
    const [projectName, setProjectName] = React.useState("");
    const [plannedSales, setPlannedSales] = React.useState(0);
    const [plannedProfit, setPlannedProfit] = React.useState(0);
    const [estimatedCosts, setEstimatedCosts] = React.useState(0);
    const [staffCosts, setStaffCosts] = React.useState(0);
    const [staffHours, setStaffHours] = React.useState(0);
    const [employeeNumber, setEmployeeNumber] = React.useState(0);
    const [timeExpenditure, setTimeExpenditure] = React.useState(0);
    const [endDate, setEndDate] = React.useState(new Date());
    const [customerPriority, setCustomerPriority] = React.useState(0);
    const [customerSales, setCustomerSales] = React.useState(0);

    const setToDefault = () => {
        setProjectName("");
        setPlannedSales(0);
        setPlannedProfit(0);
        setEstimatedCosts(0);
        setStaffCosts(0);
        setStaffHours(0);
        setEmployeeNumber(0);
        setTimeExpenditure(0);
        setEndDate(new Date());
        setCustomerPriority(0);
        setCustomerSales(0);
    };

    const addNew = () => {
        if(projectName === ""){
            setEmptyName(true);
            return;
        }
        var newProject = {
            projectId: 0,
            projectName: projectName,
            plannedSales: plannedSales,
            plannedProfit: plannedProfit,
            estimatedCosts: estimatedCosts,
            staffCosts: staffCosts,
            staffHours: staffHours,
            employeeNumber: employeeNumber,
            timeExpenditure: timeExpenditure,
            endDate: endDate.toISOString(),
            customerPriority: customerPriority,
            customerSales: customerSales
        }
        props.addProject(newProject);
        props.handleClose();
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
                <DialogTitle id="form-dialog-title">Neuer Projektantrag</DialogTitle>
                <DialogContent style={{ overflow: "hidden", height: "100%", width: "100%" }}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setProjectName(event.target.value);
                                }} value={projectName} margin="dense" id="ProjectName"
                                           helperText={emptyName === true ? "Muss gefüllt sein!" : ""} error={emptyName}
                                           label="ProjectName" type="text" fullWidth/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField onChange={(event) => {
                                    setPlannedSales(parseInt(event.target.value));
                                }} value={plannedSales} margin="dense" id="PlannedSales"
                                           label="PlannedSales" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>

                            <Grid item xs={4}>
                                <TextField onChange={(event,) => {
                                    setPlannedProfit(parseInt(event.target.value));
                                }} value={plannedProfit} margin="dense" id="PlannedProfit"
                                           label="PlannedProfit" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setEstimatedCosts(parseInt(event.target.value));
                                }} value={estimatedCosts} margin="dense" id="EstimatedCosts"
                                           label="EstimatedCosts" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setStaffCosts(parseInt(event.target.value));
                                }} value={staffCosts} margin="dense" id="StaffCosts"
                                           label="StaffCosts" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setStaffHours(parseInt(event.target.value));
                                }} value={staffHours} margin="dense" id="StaffHours"
                                           label="StaffHours" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setEmployeeNumber(parseInt(event.target.value));
                                }} value={employeeNumber} margin="dense" id="EmployeeNumber"
                                           label="EmployeeNumber" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setTimeExpenditure(parseInt(event.target.value));
                                }} value={timeExpenditure} margin="dense" id="TimeExpenditure"
                                           label="TimeExpenditure" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setEndDate(new Date(event.target.value));
                                }}
                                           margin="dense" id="EndDate" label="EndDate" type="date" fullWidth
                                           defaultValue={new Date().toDateInputValue()}
                                           InputLabelProps={{shrink: true}}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setCustomerPriority(parseInt(event.target.value));
                                }} value={customerPriority} margin="dense" id="CustomerPriority"
                                           label="CustomerPriority" type="number" fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField onChange={(event) => {
                                    setCustomerSales(parseInt(event.target.value));
                                }} value={customerSales} margin="dense" id="CustomerSales"
                                           label="CustomerSales" type="number" fullWidth/>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addNew} color="primary">
                        Anlegen
                    </Button>
                    <Button onClick={() => { props.handleClose(); }} color="primary">
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
