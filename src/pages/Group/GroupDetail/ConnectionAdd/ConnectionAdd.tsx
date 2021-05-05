import React, {Dispatch, SetStateAction} from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from "@material-ui/core";
import {
    ConnectionAddData,
    DefaultConnectionAddData,
    GroupDetailData, ServiceDetailData,
    TemplateData,
} from "../../../../interface";
import useStyles from "../styles";

export default function ConnectionAddDialogs(props: {
    template: TemplateData,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    baseData: GroupDetailData
    reload: Dispatch<SetStateAction<boolean>>
}) {
    const {template, open, setOpen, baseData, reload} = props
    const [data, setData] = React.useState(DefaultConnectionAddData);
    const [internet, setInternet] = React.useState(false);
    const [serviceID, setServiceID] = React.useState(0);
    const [serviceCode, setServiceCode] = React.useState("");

    const request = () => {
        console.log(data);
        reload(true);
    }

    return (
        <div>
            <Dialog onClose={() => setOpen(false)} fullScreen={true} aria-labelledby="customized-dialog-title"
                    open={open}
                    PaperProps={{
                        style: {
                            backgroundColor: "#2b2a2a",
                        },
                    }}>
                <DialogTitle id="customized-dialog-title">
                    接続情報の追加
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ConnectionAddServiceSelect key={"connection_add_service_select"} baseData={baseData}
                                                        data={serviceID} setData={setServiceID}
                                                        setServiceCode={setServiceCode}/>
                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            <ConnectionAddType key={"connection_add_type"} template={template}
                                               data={data} setData={setData} serviceCode={serviceCode}
                                               setInternet={setInternet}/>
                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            <ConnectionAddNOC key={"connection_add_noc"} template={template}
                                              data={data} setData={setData}/>
                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            {
                                internet &&
                                <ConnectionAddTermIP key={"connection_term_ip"} template={template} data={data}
                                                     setData={setData}/>
                            }
                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            {
                                internet &&
                                <ConnectionAddAddress key={"connection_add_address"} data={data} setData={setData}/>
                            }
                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            <ConnectionAddMonitor key={"connection_add_monitor"} data={data} setData={setData}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpen(false)} color="secondary">
                        Close
                    </Button>
                    <Button autoFocus onClick={() => request()} color="primary">
                        登録
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export function ConnectionAddServiceSelect(props: {
    baseData: GroupDetailData
    data: number,
    setData: Dispatch<SetStateAction<number>>
    setServiceCode: Dispatch<SetStateAction<string>>
}) {
    const {baseData, data, setData, setServiceCode} = props;
    const classes = useStyles();

    const serviceCode = (service: ServiceDetailData) => {
        setServiceCode(service.service_template.type);
        return baseData.ID + "-" + service.service_template.type + ('000' + service.service_number).slice(-3)
    };

    return (
        <div>
            <FormLabel component="legend">1. 接続情報を登録するサービスコードを選択してください。</FormLabel>
            <br/>
            <InputLabel>接続情報を登録するサービスコードを以下からお選びください。</InputLabel>
            <FormControl className={classes.formSelect}>
                <InputLabel>Service Code</InputLabel>
                <Select
                    labelId="service_code"
                    id="service_code"
                    value={data}
                    onChange={(event) => {
                        setData(Number(event.target.value))
                    }}
                >
                    {
                        baseData.services?.map((row, index) => (
                            <MenuItem key={index} value={row.ID}>{serviceCode(row)}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export function ConnectionAddType(props: {
    template: TemplateData,
    data: ConnectionAddData,
    setData: Dispatch<SetStateAction<ConnectionAddData>>
    setInternet: Dispatch<SetStateAction<boolean>>
    serviceCode: string
}) {
    const {template, data, setData, setInternet, serviceCode} = props
    const [comment, setComment] = React.useState(false);
    const classes = useStyles();

    const getComment = (templateID: number) => {
        const con = template.connections?.filter(item => item.ID === templateID)
        setComment(!(con === undefined || con.length !== 1 || !con[0].need_comment));
        setInternet(!(con === undefined || con.length !== 1 || !con[0].need_internet));
    }

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">2. 接続方式をお選びください</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={data.connection_template_id}
                            onChange={(event) => {
                                setData({
                                    ...DefaultConnectionAddData,
                                    connection_template_id: parseInt(event.target.value)
                                })
                                getComment(parseInt(event.target.value));
                            }}>
                    {
                        template.connections?.map(map =>
                            ((~serviceCode.indexOf("2") && map.l2) || (~serviceCode.indexOf("3") && map.l3)) &&
                            <FormControlLabel key={map.ID} value={map.ID} control={<Radio/>}
                                              label={(map.name) + ": (" + (map.comment) + ")"}/>
                        )

                    }
                </RadioGroup>
                {
                    comment &&
                    <div>
                        <br/>
                        <FormLabel component="legend">2.1. その他</FormLabel>
                        <div> Cross Connectを選択された方は以下のフォームに詳しい情報(ラック情報など)をご記入ください。</div>
                        <TextField
                            className={classes.formLong}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="ご希望の接続方式をご記入ください"
                            label="ご希望の接続方式をご記入ください"
                            id="comment"
                            value={data.connection_comment}
                            onChange={event => setData({...data, connection_comment: event.target.value})}
                        />
                    </div>
                }
            </FormControl>
        </div>
    )
}


export function ConnectionAddNOC(props: {
    template: TemplateData,
    data: ConnectionAddData,
    setData: Dispatch<SetStateAction<ConnectionAddData>>
}) {
    const {template, data, setData} = props;
    const classes = useStyles();

    return (
        <div>
            <FormLabel component="legend">3.1. 接続終端NOCをお選びください</FormLabel>
            <br/>
            <div>当団体のNOC一覧は https://www.homenoc.ad.jp/en/tech/backbone/ をご覧ください</div>
            <br/>
            <FormControl className={classes.formSelect}>
                <InputLabel>NOC</InputLabel>
                <Select
                    labelId="service_code"
                    id="service_code"
                    value={data.noc_id}
                    onChange={(event) => {
                        setData({...data, noc_id: Number(event.target.value)})
                    }}
                >
                    {
                        template.nocs?.map((row, index) => (
                            <MenuItem key={index} value={row.ID}>{row.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <br/>
        </div>
    )
}

export function ConnectionAddAddress(props: {
    data: ConnectionAddData,
    setData: Dispatch<SetStateAction<ConnectionAddData>>
}) {
    const {data, setData} = props;
    const classes = useStyles();

    return (
        <div>
            <FormLabel component="legend">3.2. 終端先ユーザの都道府県市町村</FormLabel>
            <br/>
            <div>都道府県と市町村のみ記入してください。例) 大阪府貝塚市</div>
            <br/>
            <TextField
                className={classes.formLong}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="終端先ユーザの都道府県市町村"
                label="終端先ユーザの都道府県市町村"
                id="address"
                value={data.address}
                onChange={event => setData({...data, address: event.target.value})}
            />
            <br/>
        </div>
    )
}

export function ConnectionAddTermIP(props: {
    template: TemplateData,
    data: ConnectionAddData,
    setData: Dispatch<SetStateAction<ConnectionAddData>>
}) {
    const {template, data, setData} = props;
    const classes = useStyles();

    return (
        <div>
            <FormLabel component="legend">3.1. トンネル終端IPアドレス</FormLabel>
            <br/>
            <div>トンネル接続をご希望の方はトンネル終端先のIPv6アドレスをご記入ください</div>
            <br/>
            <TextField
                className={classes.formLong}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="終端IPアドレス"
                label="終端IPアドレス"
                id="term_ip"
                value={data.term_ip}
                onChange={event => setData({...data, term_ip: event.target.value})}
            />
            <br/>
            <FormLabel component="legend">3.2. 接続終端場所にNTTフレッツ光が利用可能かをお知らせください</FormLabel>
            <br/>
            <div>接続方式に構内接続をご希望の方は何も選択せず次の項目に進んでください</div>
            <br/>
            <div>当団体ではトンネル接続を利用する場合、フレッツのIPoE(IPv6)接続をご利用頂くことを推奨しております。</div>
            <br/>
            <FormControl className={classes.formSelect}>
                <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={data.ntt_template_id}
                    onChange={(event) => {
                        setData({...data, ntt_template_id: Number(event.target.value)})
                    }}
                >
                    {
                        template.ntts?.map((row) => (
                                <FormControlLabel key={row.ID} value={row.ID} control={<Radio/>}
                                                  label={(row.name) + ": (" + (row.comment) + ")"}/>
                            )
                        )
                    }
                </RadioGroup>
            </FormControl>
            <br/>
        </div>
    )
}

export function ConnectionAddMonitor(props: {
    data: ConnectionAddData,
    setData: Dispatch<SetStateAction<ConnectionAddData>>
}) {
    const {data, setData} = props;
    const [checkBox, setCheckBox] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckBox(event.target.checked);
        setData({...data, monitor: event.target.checked});
    }

    return (
        <div>
            <FormLabel component="legend">4. ネットワーク監視</FormLabel>
            <br/>
            <div>当団体によるネットワーク監視をご希望の場合はチェックを入れて下さい</div>
            <div>検証用などで頻繁に接続断が発生する予定の場合は当団体からの監視はお断りいたします</div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checkBox}
                        onChange={handleChange}
                        name="monitor"
                        color="primary"
                    />
                }
                label="希望する"
            />
        </div>
    )
}
