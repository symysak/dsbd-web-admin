import useStyles from "./styles";
import {ConnectionDetailData, GroupDetailData, ServiceDetailData} from "./interface";
import {
    Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip,
    Collapse, IconButton, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function ChipGet(props: { open: boolean }) {
    const {open} = props;
    if (open) {
        return (
            <Chip
                size="small"
                color="primary"
                label="開通"
            />
        )
    } else {
        return (
            <Chip
                size="small"
                color="secondary"
                label="未開通"
            />
        )
    }
}

function RowConnection(props: { service: ServiceDetailData, connection: ConnectionDetailData, groupID: number }) {
    const {service, connection, groupID} = props;
    // const [open, setOpen] = React.useState(false);
    // const classes = useRowStyles();
    const serviceCode = groupID + "-" + service.service_template.type + ('000' + service.service_number).slice(-3) +
        "-" + connection.connection_template.type + ('000' + connection.connection_number).slice(-3);

    console.log(props);
    return (
        <TableRow key={connection.ID}>
            <TableCell component="th" scope="row" align="left">
                {connection.ID}
            </TableCell>
            <TableCell align="left">{serviceCode}</TableCell>
            <TableCell align="left">{connection.connection_template.name}</TableCell>
            <TableCell align="left">
                <ChipGet open={connection.open}/>
            </TableCell>
            <TableCell align="right">
                <Button size="small" variant="outlined">
                    Detail
                </Button>
                <Button size="small" variant="outlined">
                    Detail
                </Button>
            </TableCell>
        </TableRow>
    );
}

function RowService(props: { row: ServiceDetailData, groupID: number }) {
    const {row, groupID} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const serviceCode = groupID + "-" + row.service_template.type + ('000' + row.service_number).slice(-3);

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell align="left">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    {row.ID}
                </TableCell>
                <TableCell
                    align="left">{serviceCode}</TableCell>
                <TableCell align="left">{row.service_template.name}</TableCell>
                <TableCell align="left">
                    <ChipGet open={row.open}/>
                </TableCell>
                <TableCell align="left">{row.asn}</TableCell>
                <TableCell align="right">
                    <Button size="small" variant="outlined">
                        Detail
                    </Button>
                    <Button size="small" variant="outlined">
                        Detail
                    </Button>
                    <Button size="small" variant="outlined">
                        Detail
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Connection
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">ID</TableCell>
                                        <TableCell align="left">Service Code</TableCell>
                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="left">Tag</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        row.connections.map((rowConnection: ConnectionDetailData) => (
                                            <RowConnection key={rowConnection.ID} service={row}
                                                           connection={rowConnection} groupID={groupID}/>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function Service(props: { data: GroupDetailData }) {
    const {data} = props;
    const classes = useStyles();

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1c-content"
                id="panel1c-header"
            >
                <div className={classes.column}>
                    <Typography className={classes.heading}>Service</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Service Code</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Tag</TableCell>
                                <TableCell align="left">ASN</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.services.map((row: ServiceDetailData) => (
                                    <RowService key={row.ID} row={row} groupID={data.ID}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    )
};