import {JPNICData} from "../../../../interface";
import React, {Dispatch, SetStateAction} from "react";
import useStyles from "../styles";
import {
    Box,
    Card,
    CardContent, Collapse, IconButton, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import cssModule from "../../../Connection/ConnectionDetail/ConnectionDialog.module.scss";
import {JPNICDetail} from "../../../../components/Dashboard/JPNIC/JPNIC";

export function ServiceJPNICTechBase(props: {
    serviceID: number,
    jpnic: JPNICData[] | undefined,
    reload: Dispatch<SetStateAction<boolean>>
}): any {
    const {jpnic, serviceID, reload} = props;

    if (jpnic === undefined) {
        return (
            <Card>
                <CardContent>
                    <h3>JPNIC技術連絡担当者</h3>
                    <p><b>情報なし</b></p>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <ServiceJPNICTech key={serviceID} serviceID={serviceID} jpnic={jpnic} reload={reload}/>
        )
    }
}

export function ServiceJPNICTech(props: {
    serviceID: number,
    jpnic: JPNICData[],
    reload: Dispatch<SetStateAction<boolean>>
}): any {
    const {jpnic, serviceID, reload} = props;
    const classes = useStyles();

    return (
        <Card className={classes.rootTable}>
            <CardContent>
                <h3>JPNIC技術連絡担当者</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">JPNIC Handle</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Mail</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                jpnic.map((row) => (
                                    <ServiceJPNICTechRow key={row.name} serviceID={serviceID} jpnic={row}
                                                         reload={reload}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export function ServiceJPNICTechRow(props: {
    serviceID: number,
    jpnic: JPNICData,
    reload: Dispatch<SetStateAction<boolean>>
}): any {
    const {jpnic, serviceID, reload} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.rootTable}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {jpnic.ID}
                </TableCell>
                <TableCell align="right">{jpnic.jpnic_handle}</TableCell>
                <TableCell align="right">{jpnic.name}</TableCell>
                <TableCell align="right">{jpnic.mail}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <JPNICDetail key={serviceID} jpnicAdmin={false} serviceID={serviceID} jpnic={jpnic}
                                         reload={reload}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

