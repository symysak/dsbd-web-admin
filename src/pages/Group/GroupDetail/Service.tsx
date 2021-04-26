import useStyles from "./styles";
import {ConnectionDetailData, GroupDetailData, ServiceDetailData} from "../../../interface";
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
import React, {Dispatch, SetStateAction} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ConnectionGetDialogs from "../../Connection/ConnectionDialog";
import ServiceGetDialogs from "../../Service/ServiceDialog";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    flex: {
        // display: flex,
    }
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

function RowConnection(props: {
    service: ServiceDetailData,
    connection: ConnectionDetailData,
    groupID: number,
    reload: Dispatch<SetStateAction<boolean>>
}) {
    const {service, connection, groupID, reload} = props;
    // const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
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
                <Box display="flex" justifyContent="flex-end">
                    <ConnectionGetDialogs connection={connection} service={service} reload={reload}/>
                </Box>
            </TableCell>
        </TableRow>
    );
}

function RowService(props: { service: ServiceDetailData, groupID: number, reload: Dispatch<SetStateAction<boolean>> }) {
    const {service, groupID, reload} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const serviceCode = groupID + "-" + service.service_template.type + ('000' + service.service_number).slice(-3);

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell align="left">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    {service.ID}
                </TableCell>
                <TableCell
                    align="left">{serviceCode}</TableCell>
                <TableCell align="left">{service.service_template.name}</TableCell>
                <TableCell align="left">
                    <ChipGet open={service.open}/>
                </TableCell>
                <TableCell align="left">{service.asn}</TableCell>
                <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end">
                        <ServiceGetDialogs service={service} reload={reload}/>
                    </Box>
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
                                        service.connections.map((rowConnection: ConnectionDetailData) => (
                                            <RowConnection key={rowConnection.ID}
                                                           service={service}
                                                           connection={rowConnection}
                                                           groupID={groupID}
                                                           reload={reload}
                                            />
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

export default function Service(props: { data: GroupDetailData, reload: Dispatch<SetStateAction<boolean>> }) {
    const {data, reload} = props;
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
                                    <RowService key={row.ID} service={row} groupID={data.ID} reload={reload}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    )
};
