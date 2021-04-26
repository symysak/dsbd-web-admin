import React, {Dispatch, SetStateAction, useState} from "react";
import {
    Button,
    Card, CardContent, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@material-ui/core";
import cssModule from "../Connection/ConnectionDialog.module.scss";
import {JPNICData, ServiceDetailData} from "../../interface";
import useStyles from "./styles";
import {ServiceAddAllowButton, ServiceLockButton} from "./ServiceMenu";
import {useSnackbar} from "notistack";
import {Put} from "../../api/Service";
import {Open} from "../../components/Dashboard/Open/Open";
import {ServiceJPNICTechBase} from "./JPNICTech/JPNICTech";
import {ServiceJPNICAdminBase} from "./JPNICAdmin/JPNICAdmin";
import {ServiceIPBase} from "./IP/IP";
import {JPNICDetail} from "../../components/Dashboard/JPNIC/JPNIC";

export default function ServiceGetDialogs(props: {
    service: ServiceDetailData,
    reload: Dispatch<SetStateAction<boolean>>
}) {
    const {service, reload} = props
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" variant="outlined" onClick={handleClickOpen}>
                Detail
            </Button>
            <Dialog onClose={handleClose} fullScreen={true} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title">
                    Service Dialog
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <ServiceStatus key={service.ID} service={service}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ServiceOpen key={service.ID} service={service} reload={reload}/>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceMainMenu key={service.ID} service={service} reload={reload}/>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={cssModule.contract}>
                                <ServiceEtc key={service.ID} service={service}/>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceIPBase key={service.ID} ip={service.ip} serviceID={service.ID} reload={reload}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ServiceJPNICBase key={service.ID} service={service} reload={reload}/>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceJPNICAdminBase key={service.ID} serviceID={service.ID}
                                                   jpnic={service.jpnic_admin} reload={reload}/>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceJPNICTechBase key={service.ID} serviceID={service.ID} jpnic={service.jpnic_tech}
                                                  reload={reload}/>
                        </Grid>
                        <Grid>
                            <div className={cssModule.contract}>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function ServiceStatus(props: { service: ServiceDetailData }): any {
    const classes = useStyles();
    const {service} = props;
    const createDate = "作成日: " + service.CreatedAt;
    const updateDate = "更新日: " + service.UpdatedAt;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3>Org</h3>
                        <Chip
                            size="small"
                            color="primary"
                            label={service.org}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Org(English)</h3>
                        <Chip
                            size="small"
                            color="primary"
                            label={service.org_en}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Date</h3>
                        <Chip
                            className={classes.date}
                            size="small"
                            color="primary"
                            label={createDate}
                        />
                        <Chip
                            size="small"
                            color="primary"
                            label={updateDate}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export function ServiceMainMenu(props: { service: ServiceDetailData, reload: Dispatch<SetStateAction<boolean>> }): any {
    const classes = useStyles();
    const {service, reload} = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>Menu</h3>
                <ServiceAddAllowButton key={service.ID} service={service} reload={reload}/>
                <br/>
                <ServiceLockButton key={service.ID} service={service} reload={reload}/>
                <br/>
            </CardContent>
        </Card>
    )
}

export function ServiceOpenButton(props: {
    service: ServiceDetailData,
    lockInfo: boolean,
    reload: Dispatch<SetStateAction<boolean>>
}): any {
    const {service, lockInfo, reload} = props;
    const {enqueueSnackbar} = useSnackbar();

    // Update Service Information
    const updateInfo = (open: boolean) => {
        service.open = open;
        Put(service.group_id, service).then(res => {
            if (res.error === "") {
                console.log(res.data);
                enqueueSnackbar('Request Success', {variant: "success"});
            } else {
                console.log(res.error);
                enqueueSnackbar(String(res.error), {variant: "error"});
            }

            reload(true);
        })
    }

    if (!service.open) {
        return (
            <Button size="small" color="primary" disabled={lockInfo} onClick={() => updateInfo(true)}>
                開通
            </Button>
        )
    } else {
        return (
            <Button size="small" color="secondary" disabled={lockInfo} onClick={() => updateInfo(false)}>
                未開通
            </Button>
        )
    }
}

export function ServiceOpen(props: { service: ServiceDetailData, reload: Dispatch<SetStateAction<boolean>> }): any {
    const classes = useStyles();
    const {service, reload} = props;
    const serviceCode = service.group_id + "-" + service.service_template.type +
        ('000' + service.service_number).slice(-3);
    const [lockInfo, setLockInfo] = React.useState(true);
    const [serviceCopy, setServiceCopy] = useState(service);

    const clickLockInfo = () => {
        setLockInfo(!lockInfo);
    }

    const resetAction = () => {
        setServiceCopy(service);
        setLockInfo(true);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>ServiceCode</h3>
                <Chip
                    size="small"
                    color="primary"
                    label={serviceCode}
                />
                <br/>
                <h3>Status</h3>
                <Open key={service.ID} open={service.open}/>
                <br/>
                <br/>
                <form className={classes.rootForm} noValidate autoComplete="off">
                    <TextField
                        className={classes.formVeryShort}
                        required
                        id="outlined-number"
                        label="ASN"
                        defaultValue={service.asn}
                        InputProps={{
                            readOnly: lockInfo,
                        }}
                        value={serviceCopy.asn}
                        type="number"
                        variant="outlined"
                        onChange={event => {
                            setServiceCopy({...serviceCopy, asn: parseInt(event.target.value)});
                        }}
                    />
                </form>
                <Button size="small" color="secondary" disabled={!lockInfo} onClick={clickLockInfo}>ロック解除</Button>
                <Button size="small" disabled={lockInfo} onClick={resetAction}>Reset</Button>
                <ServiceOpenButton service={serviceCopy} lockInfo={lockInfo} reload={reload}/>
            </CardContent>
        </Card>
    );
}


export function ServiceEtc(props: { service: ServiceDetailData }): any {
    const classes = useStyles();
    const {service} = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>Bandwidth</h3>
                <table aria-colspan={3}>
                    <tr>
                        <th colSpan={1}/>
                        <th colSpan={1}>上り</th>
                        <th colSpan={1}>下り</th>
                    </tr>
                    <tr>
                        <th>最大</th>
                        <td>{service.max_upstream}Mbps</td>
                        <td>{service.max_downstream}Mbps</td>
                    </tr>
                    <tr>
                        <th>平均</th>
                        <td>{service.avg_upstream}Mbps</td>
                        <td>{service.avg_downstream}Mbps</td>
                    </tr>
                </table>
                <br/>
                <table aria-colspan={2}>
                    <tr>
                        <th colSpan={2}>大量に通信する可能性のあるAS</th>
                    </tr>
                    <tr>
                        <th>AS</th>
                        <td>{service.max_bandwidth_as}</td>
                    </tr>
                </table>
                <h3>アドレス広報方法</h3>
                <table aria-colspan={3}>
                    <tr>
                        <th colSpan={1}/>
                        <th colSpan={1}>IPv4</th>
                        <th colSpan={1}>IPv6</th>
                    </tr>
                    <tr>
                        <th>Route</th>
                        <td>{service.route_v4}</td>
                        <td>{service.route_v6}</td>
                    </tr>
                </table>
            </CardContent>
        </Card>
    );
}

export function ServiceJPNICBase(props: {
    service: ServiceDetailData,
    reload: Dispatch<SetStateAction<boolean>>
}): any {
    const {service, reload} = props;

    if (!service.service_template.need_jpnic) {
        return (
            <Card>
                <CardContent>
                    <h3>JPNIC記入情報</h3>
                    <p><b>情報なし</b></p>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card className={cssModule.contract}>
                <CardContent>
                    <h3>JPNIC記入情報</h3>
                    <ServiceDetail key={service.ID} service={service} reload={reload}/>
                </CardContent>
            </Card>
        )
    }
}

export function ServiceDetail(props: {
    service: ServiceDetailData,
    reload: Dispatch<SetStateAction<boolean>>
}): any {
    const {service, reload} = props;
    const classes = useStyles();
    const [lockInfo, setLockInfo] = React.useState(true);
    const [serviceCopy, setServiceCopy] = useState(service);
    const {enqueueSnackbar} = useSnackbar();

    const clickLockInfo = () => {
        setLockInfo(!lockInfo);

    }
    const resetAction = () => {
        setServiceCopy(service);
        setLockInfo(true);
    }

    // Update Group Information
    const updateInfo = () => {
        Put(service.group_id, serviceCopy).then(res => {
            if (res.error === "") {
                console.log(res.data);
                enqueueSnackbar('Request Success', {variant: "success"});
                setLockInfo(true);
            } else {
                console.log(res.error);
                enqueueSnackbar(String(res.error), {variant: "error"});
            }

            reload(true);
        })
    }


    return (
        <div className={classes.root}>
            <form className={classes.rootForm} noValidate autoComplete="off">
                <TextField
                    className={classes.formMedium}
                    required
                    id="outlined-required"
                    label="Org"
                    defaultValue={service.org}
                    InputProps={{
                        readOnly: lockInfo,
                    }}
                    value={serviceCopy.org}
                    variant="outlined"
                    onChange={event => {
                        setServiceCopy({...serviceCopy, org: event.target.value});
                    }}
                />
                <TextField
                    className={classes.formMedium}
                    required
                    id="outlined-required"
                    label="Org(English)"
                    defaultValue={service.org_en}
                    InputProps={{
                        readOnly: lockInfo,
                    }}
                    value={serviceCopy.org_en}
                    variant="outlined"
                    onChange={event => {
                        setServiceCopy({...serviceCopy, org_en: event.target.value});
                    }}
                />
                <br/>
                <TextField
                    className={classes.formVeryShort}
                    required
                    id="outlined-required"
                    label="郵便番号"
                    defaultValue={service.postcode}
                    InputProps={{
                        readOnly: lockInfo,
                    }}
                    value={serviceCopy.postcode}
                    variant="outlined"
                    onChange={event => {
                        setServiceCopy({...serviceCopy, postcode: event.target.value});
                    }}
                />
                <TextField
                    className={classes.formMedium}
                    required
                    id="outlined-required"
                    label="住所"
                    defaultValue={service.address}
                    InputProps={{
                        readOnly: lockInfo,
                    }}
                    value={serviceCopy.address}
                    variant="outlined"
                    onChange={event => {
                        setServiceCopy({...serviceCopy, address: event.target.value});
                    }}
                />
                <TextField
                    className={classes.formMedium}
                    required
                    id="outlined-required"
                    label="住所(English)"
                    defaultValue={service.address_en}
                    InputProps={{
                        readOnly: lockInfo,
                    }}
                    value={serviceCopy.address_en}
                    variant="outlined"
                    onChange={event => {
                        setServiceCopy({...serviceCopy, address_en: event.target.value});
                    }}
                />
            </form>
            <Button size="small" color="secondary" disabled={!lockInfo}
                    onClick={clickLockInfo}>ロック解除</Button>
            <Button size="small" onClick={resetAction}>Reset</Button>
            <Button size="small" color="primary" disabled={lockInfo}
                    onClick={updateInfo}>
                Apply
            </Button>
        </div>
    );
}
