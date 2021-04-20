import useStyles from "./styles";
import {GroupDetailData} from "./interface";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button, Card,
    CardContent, Chip, Menu, MenuItem,
    TextField, Typography
} from "@material-ui/core";
import React, {useState} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

export function GroupProfileInfo(props: { data: GroupDetailData }): any {
    const {data} = props;
    const classes = useStyles();
    const [lockPersonalInformation, setLockPersonalInformation] = React.useState(true);
    const [group, setGroup] = useState(data);

    const clickPersonalInfoLock = () => {
        setLockPersonalInformation(!lockPersonalInformation);
    }

    // Update Group Information
    const update = () => {

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
                            <Button size="small" color="primary" disabled={lockPersonalInformation} onClick={update}>
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
                            <ChipAgree agree={data.agree}></ChipAgree>
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
                <Button size="small" color="secondary" disabled={!lockPersonalInformation}
                        onClick={clickPersonalInfoLock}>ロック解除</Button>
                <Button size="small">メール送信</Button>
                <Button size="small" color="primary" onClick={update}>
                    メール送信
                </Button>
            </CardContent>
        </Card>
    )
};

export function GroupMainMenu(props: { data: GroupDetailData }): any {
    const classes = useStyles();
    const {data} = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>Menu</h3>
                <Button
                    className={classes.button1}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    color={"primary"}
                    variant="contained"
                >
                    審査合格
                </Button>
                <Button
                    className={classes.button1}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    color={"primary"}
                    variant="outlined"
                >
                    変更を許可
                </Button>
                <Button
                    className={classes.button1}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    color={"secondary"}
                    variant="outlined"
                >
                    廃止処理
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </CardContent>
        </Card>
    )
};

export function GroupMemo(props: { data: GroupDetailData }): any {
    const classes = useStyles();
    const {data} = props;

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>Memo</h3>
                <div className={classes.memo}>
                    <Chip
                        label="Memo1"
                        clickable
                        color="primary"
                        onDelete={handleDelete}
                    />
                    <Chip
                        label="Memo2"
                        clickable
                        color="primary"
                        onDelete={handleDelete}
                    />
                    <Chip label="Memo3" onDelete={handleDelete} color="primary"/>
                    <Chip
                        label="Memo4Memo"
                        onDelete={handleDelete}
                        color="secondary"
                    />
                </div>
                <Button
                    className={classes.button1}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    color={"primary"}
                    variant="outlined"
                >
                    Memoの追加
                </Button>
            </CardContent>
        </Card>
    );
};

export function GroupImportant(props: { data: GroupDetailData }): any {
    const classes = useStyles();
    const {data} = props;
    const createDate = "作成日: " + data.CreatedAt;
    const updateDate = "更新日: " + data.UpdatedAt;

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <h3>Status</h3>
                <Chip
                    size="small"
                    color="primary"
                    label="接続情報　記入段階"
                />
                <h3>Student Status</h3>
                <Chip
                    size="small"
                    color="primary"
                    label="2021/01/20まで"
                />
                <h3>Payment</h3>
                <Chip
                    size="small"
                    color="primary"
                    label="Free"
                />
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
            </CardContent>
        </Card>
    )
        ;
};