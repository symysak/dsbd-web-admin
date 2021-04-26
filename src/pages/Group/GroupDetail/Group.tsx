import useStyles from "./styles";
import {GroupDetailData} from "../../../interface";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button, Card,
    CardContent, Chip, Grid,
    TextField, Typography
} from "@material-ui/core";
import React, {Dispatch, SetStateAction, useState} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {GroupFee, GroupStatusStr, GroupStudent} from "../../../components/Dashboard/Status/Status";
import {GroupAbolition, GroupLockButton, GroupStatusButton} from "./GroupMenu";
import {Put} from "../../../api/Group";
import {useSnackbar} from "notistack";

function ChipAgree(props: { agree: boolean }) {
    const {agree} = props;
    if (agree) {
        return (
            <Chip
                size="small"
                color="primary"
                label="規約に同意する"
            />
        )
    } else {
        return (
            <Chip
                size="small"
                color="secondary"
                label="規約に同意していない"
            />
        )
    }
}

export function GroupProfileInfo(props: { data: GroupDetailData, reload: Dispatch<SetStateAction<boolean>> }): any {
    const {data, reload} = props;
    const classes = useStyles();
    const [lockPersonalInformation, setLockPersonalInformation] = React.useState(true);
    const [group, setGroup] = useState(data);

    const clickPersonalInfoLock = () => {
        setLockPersonalInformation(!lockPersonalInformation);
    }
    const {enqueueSnackbar} = useSnackbar();


    // Update Group Information
    const updateGroupInfo = () => {
        Put(group.ID, group).then(res => {
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

    return (
        <Card className={classes.root}>
            <CardContent>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>グループ情報(住所、電話番号など)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <form className={classes.rootForm} noValidate autoComplete="off">
                                <TextField
                                    className={classes.formVeryShort}
                                    required
                                    id="outlined-required"
                                    label="郵便番号"
                                    defaultValue={data.postcode}
                                    InputProps={{
                                        readOnly: lockPersonalInformation,
                                    }}
                                    variant="outlined"
                                    onChange={event => {
                                        setGroup({...data, postcode: event.target.value});
                                    }}
                                />
                                <TextField
                                    className={classes.formMedium}
                                    required
                                    id="outlined-required"
                                    label="住所"
                                    defaultValue={data.address}
                                    InputProps={{
                                        readOnly: lockPersonalInformation,
                                    }}
                                    variant="outlined"
                                    onChange={event => {
                                        setGroup({...data, address: event.target.value});
                                    }}
                                />
                                <TextField
                                    className={classes.formMedium}
                                    required
                                    id="outlined-required"
                                    label="住所(English)"
                                    defaultValue={data.address_en}
                                    InputProps={{
                                        readOnly: lockPersonalInformation,
                                    }}
                                    variant="outlined"
                                    onChange={event => {
                                        setGroup({...data, address_en: event.target.value});
                                    }}
                                />
                                <TextField
                                    className={classes.formVeryShort}
                                    required
                                    id="outlined-required"
                                    label="電話番号"
                                    defaultValue={data.tel}
                                    InputProps={{
                                        readOnly: lockPersonalInformation,
                                    }}
                                    variant="outlined"
                                    onChange={event => {
                                        setGroup({...data, tel: event.target.value});
                                    }}
                                />
                                <TextField
                                    className={classes.formVeryShort}
                                    required
                                    id="outlined-required"
                                    label="住居国"
                                    defaultValue={data.country}
                                    InputProps={{
                                        readOnly: lockPersonalInformation,
                                    }}
                                    variant="outlined"
                                    onChange={event => {
                                        setGroup({...data, country: event.target.value});
                                    }}
                                />
                            </form>
                            <Button size="small" color="secondary" disabled={!lockPersonalInformation}
                                    onClick={clickPersonalInfoLock}>ロック解除</Button>
                            <Button size="small">Cancel</Button>
                            <Button size="small" color="primary" disabled={lockPersonalInformation}
                                    onClick={updateGroupInfo}>
                                Save
                            </Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="question"
                        id="question"
                    >
                        <Typography className={classes.heading}>Agree & Question & Contract</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.root}>
                            <div className={classes.largeHeading}>Agree</div>
                            <ChipAgree agree={data.agree}/>
                            <div className={classes.largeHeading}>Question</div>
                            <div className={classes.text}>{data.question}</div>
                            <div className={classes.largeHeading}>Contract</div>
                            <div className={classes.text}>{data.contract}</div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="payment"
                        id="payment"
                    >
                        <Typography className={classes.heading}>学生会員・支払い</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="other"
                        id="other"
                    >
                        <Typography className={classes.heading}>その他</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Button size="small" variant="contained" color="primary" >サービス情報の追加</Button>
                <Button size="small" variant="contained" color="primary" className={classes.spaceLeft}>接続情報の追加</Button>
                <br/>
                <Button size="small" className={classes.spaceTop}>メール送信</Button>
            </CardContent>
        </Card>
    )
}

export function GroupMainMenu(props: { data: GroupDetailData, reload: Dispatch<SetStateAction<boolean>> }): any {
    const classes = useStyles();
    const {data, reload} = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>Menu</h3>
                <GroupStatusButton data={data} reload={reload}/>
                <GroupLockButton data={data} reload={reload}/>
                <GroupAbolition data={data}/>
            </CardContent>
        </Card>
    )
}

export function GroupStatus(props: { data: GroupDetailData }): any {
    const classes = useStyles();
    const {data} = props;
    const createDate = "作成日: " + data.CreatedAt;
    const updateDate = "更新日: " + data.UpdatedAt;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3>Status</h3>
                        <Chip
                            size="small"
                            color="primary"
                            label={GroupStatusStr(data.status)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Student</h3>
                        <GroupStudent key={data.ID} student={data.student} date={data.student_expired}/>
                    </Grid>
                    <Grid item xs={6}>
                        <h3>Payment</h3>
                        <GroupFee key={data.ID} fee={data.fee}/>
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
