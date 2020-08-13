import React, {useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    hover: {
        '&:hover': {
            color: "white",
            backgroundColor: '#f77376',
        }
    },
    TypLeft: {
        display: 'inline-block'
    },
    TypRight: {
        float: "right",
        marginRight: 5,
        display: 'inline-block',
        maxWidth: 220,
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    accordionSum: {
        backgroundColor: "#dcefee"
    }
}));

export default function InformationDialog(props) {
    const classes = useStyles();
    //KPIs
    const [projectName, setProjectName] = React.useState("");
    const [plannedSales, setPlannedSales] = React.useState("");
    const [plannedProfit, setPlannedProfit] = React.useState("");
    const [estimatedCosts, setEstimatedCosts] = React.useState("");
    const [costSavings, setCostSavings] = React.useState("");
    const [paybackPeriod, setPaybackPeriod] = React.useState("");
    const [rentability, setRentability] = React.useState("");
    const [staffCosts, setStaffCosts] = React.useState("");
    const [staffHours, setStaffHours] = React.useState("");
    const [employeeNumber, setEmployeeNumber] = React.useState("");
    const [employeeSales, setEmployeeSales] = React.useState("");
    const [averageHourlyRate, setAverageHourlyRate] = React.useState("");
    const [profitPerHour, setProfitPerHour] = React.useState("");
    const [timeExpenditure, setTimeExpenditure] = React.useState("");
    const [endDate, setEndDate] = React.useState(new Date());
    const [customerPriority, setCustomerPriority] = React.useState("");
    const [timeBuffer, setTimeBuffer] = React.useState("");
    const [riskExpectedValue, setRiskExpectedValue] = React.useState("");
    const [ranking, setRanking] = React.useState("");
    //Archived??
    //Bewegungsdaten
    const [projectLeader, setProjectLeader] = React.useState("");
    const [projectMembers, setProjectMembers] = React.useState("asfsaf");
    const [registrationDate, setRegistrationDate] = React.useState(new Date());
    const [goal, setGoal] = React.useState("asfsaf");
    //Customer
    const [customerName, setCustomerName] = React.useState(1);
    const [contactPerson, setContactPerson] = React.useState(1);
    const [address, setAddress] = React.useState(1);
    const [businessField, setBusinessField] = React.useState(1);
    const [client, setClient] = React.useState(1);
    const [department, setDepartment] = React.useState(1);
    const [site, setSite] = React.useState(1);
    const [phoneNumber, setPhoneNumber] = React.useState(1);
    const [eMail, setEMail] = React.useState(1);

    const setValues = () => {
        if (props.data === null) {
            return;
        }
        console.log(props.data)
        setProjectName(props.data.projectName);
        setPlannedSales(props.data.plannedSales);
        setEstimatedCosts(props.data.estimatedCosts);
        setStaffCosts(props.data.staffCosts);
        setStaffHours(props.data.staffHours);
        setEmployeeNumber(props.data.employeeNumber);
        setTimeExpenditure(props.data.timeExpenditure);
        setEndDate(new Date(props.data.endDate));
        setCustomerPriority(props.data.customerPriority)
        setRiskExpectedValue(props.data.riskExpectedValue);
        setTimeBuffer(props.data.timeBuffer);
        setRanking(props.data.ranking);
        setProfitPerHour(props.data.profitPerHour);
        setAverageHourlyRate(props.data.averageHourlyRate);
        setEmployeeSales(props.data.employeeSales);
        setRentability(props.data.rentability);
        setPaybackPeriod(props.data.paybackPeriod);
        setCostSavings(props.data.costSavings);
        setPlannedProfit(props.data.plannedProfit);

        setProjectLeader(props.data.projectLeader);
        setProjectMembers(props.data.projectMembers);
        setRegistrationDate(new Date(props.data.registrationDate));
        setGoal(props.data.goal);

        setCustomerName(props.data.customerName);
        setContactPerson(props.data.contactPerson);
        setAddress(props.data.address);
        setBusinessField(props.data.businessField);
        setClient(props.data.client);
        setDepartment(props.data.department);
        setSite(props.data.site);
        setPhoneNumber(props.data.phoneNumber);
        setEMail(props.data.eMail);
    };

    useEffect(() => {
        setValues();
    }, [props.open]);

    return (
        <div>
            <Dialog maxWidth={"md"} open={props.open} onClose={() => {
                props.handleClose();
            }} aria-labelledby="form-dialog-title">
                <DialogTitle style={{fontWeight: "bold"}} id="form-dialog-title">Project Information</DialogTitle>
                <DialogContent style={{overflow: "auto", height: "100%", width: "100%"}}>
                    <Accordion defaultExpanded>
                        <AccordionSummary className={classes.accordionSum}
                                          expandIcon={<ExpandMoreIcon className={classes.hover}/>}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header">
                            <Typography className={classes.heading} style={{fontWeight: "bold"}} variant="subtitle2"
                                        noWrap>
                                Key-Performance-Indicator
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Project
                                            Name: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{projectName}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Planned
                                            Sales: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{plannedSales}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Estimated
                                            Costs: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{estimatedCosts}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Staff
                                            Hours: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{staffHours}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Planned
                                            Profit: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{plannedProfit}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft}
                                                    margin="dense">Costsavings: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{costSavings}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Payback
                                            Period: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{paybackPeriod}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft}
                                                    margin="dense">Rentability: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{rentability}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Employee
                                            Number: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{employeeNumber}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Enddate: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{endDate.toLocaleDateString("de-DE")}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Employee
                                            Sales: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{employeeSales}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Average Hourly
                                            Rate: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{averageHourlyRate}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Profit Per
                                            Hour: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{profitPerHour}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Customer
                                            Priority: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{customerPriority}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Risk Expected
                                            Value: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{riskExpectedValue}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Time
                                            Expenditure: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{timeExpenditure}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Time
                                            Buffer: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{timeBuffer}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Ranking: </Typography>
                                        <Typography className={classes.TypRight} margin="dense">{ranking}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.TypLeft} margin="dense">Staff
                                            Costs: </Typography>
                                        <Typography className={classes.TypRight}
                                                    margin="dense">{staffCosts}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary className={classes.accordionSum}
                                          expandIcon={<ExpandMoreIcon className={classes.hover}/>}
                                          aria-controls="panel2a-content"
                                          id="panel2a-header">
                            <Typography className={classes.heading} style={{fontWeight: "bold"}} variant="subtitle2"
                                        noWrap>
                                Transaction-Data
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Project
                                            Leader: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{projectLeader}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Project
                                            Members: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{projectMembers}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >RegistrationDate: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{registrationDate.toLocaleDateString("de-DE")}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >Goal: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{goal}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary className={classes.accordionSum}
                                          expandIcon={<ExpandMoreIcon className={classes.hover}/>}
                                          aria-controls="panel3a-content"
                                          id="panel3a-header">
                            <Typography className={classes.heading} style={{fontWeight: "bold"}} variant="subtitle2"
                                        noWrap>
                                Customer-Data
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Customer
                                            Name: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{customerName}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense">Contact
                                            Person: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{contactPerson}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >Address: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{address}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >Business Field: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{businessField}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >Client: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{client}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >Department: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{department}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >Site: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{site}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >PhoneNumber: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{phoneNumber}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.TypLeft} margin="dense"
                                        >E-Mail: </Typography>
                                        <Typography className={classes.TypRight} margin="dense"
                                        >{eMail}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" className={classes.hover} onClick={() => {
                        props.handleClose();
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
