import React, {useEffect, useState} from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import useStyles from "../Dashboard/styles"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormControlLabel,
    InputBase,
    Paper, Radio, RadioGroup,
    Typography
} from "@material-ui/core";
import {GetAll} from "../../api/Service";
import {useHistory} from "react-router-dom";
import {DefaultServiceDetailDataArray, ServiceDetailData} from "../../interface";
import {useSnackbar} from "notistack";
import ServiceGetDialogs from "./ServiceDetail/ServiceDialog";


export default function Service() {
    const classes = useStyles();
    const [services, setServices] = useState(DefaultServiceDetailDataArray);
    const [initServices, setInitServices] = useState(DefaultServiceDetailDataArray);
    const history = useHistory();
    const [reload, setReload] = useState(true)
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (reload) {
            GetAll().then(res => {
                if (res.error === "") {
                    console.log(res);
                    setServices(res.data);
                    setInitServices(res.data);
                    setReload(false);
                } else {
                    enqueueSnackbar("" + res.error, {variant: "error"});
                }
            })
        }
    }, []);

    const serviceCode = (groupID: number, type: string, serviceNumber: number) => {
        return groupID + "-" + type + ('000' + serviceNumber).slice(-3)
    }

    const handleFilter = (search: string) => {
        let tmp: ServiceDetailData[];
        if (search === "") {
            tmp = initServices;
        } else {
            tmp = initServices.filter((service: ServiceDetailData) => {
                const code = service.group_id + "-" + service.service_template.type + ('000' + service.service_number).slice(-3)
                return code.toLowerCase().includes(search.toLowerCase())
            });
        }
        setServices(tmp);
    };

    const clickDetailPage = (id: number) => {
        // history.push('/dashboard/support/' + id);
    }

    return (
        <Dashboard title="Service Info">
            <Paper component="form" className={classes.rootInput}>
                <InputBase
                    className={classes.input}
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                    onChange={event => {
                        handleFilter(event.target.value)
                    }}
                />
            </Paper>
            {
                services.map((service: ServiceDetailData) => (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                ID: {service.ID}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {serviceCode(service.group_id, service.service_template.type, service.service_number)}
                            </Typography>
                            <br/>
                            {/*Group: {service.gr?.org}({service.group?.org_en})*/}
                        </CardContent>
                        <CardActions>
                            <ServiceGetDialogs key={service.ID + "Dialog"} service={service} reload={setReload}/>
                        </CardActions>
                    </Card>
                ))
            }
        </Dashboard>
    );
}
