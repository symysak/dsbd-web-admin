import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Dashboard from "../../../components/Dashboard/Dashboard";
import {Get, GetTemplate} from "../../../api/Group";
import useStyles from "./styles";
import Users from "./User";
import {
    CircularProgress, Grid
} from "@material-ui/core";
import {DefaultGroupDetailData, DefaultTemplateData} from "../../../interface";
import Ticket from "./Ticket";
import Service from "./Service";
import {GroupProfileInfo, GroupMainMenu, GroupStatus} from "./Group";
import {useSnackbar} from "notistack";
import {GroupMemo} from "./Memo";


function getTitle(id: number, org: string, org_en: string, loading: boolean): string {
    if (loading) {
        return "Loading...";
    } else if (!loading && org === "" && org_en === "") {
        return "No Data...";
    } else {
        return "id: " + id + " " + org + "(" + org_en + ")";
    }
}

export default function GroupDetail() {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [reload, setReload] = useState(true)
    const [loading, setLoading] = useState(true)
    const [group, setGroup] = useState(DefaultGroupDetailData);
    const [template, setTemplate] = useState(DefaultTemplateData);
    let id: string;
    ({id} = useParams());

    useEffect(() => {
        if (reload) {
            Get(id).then(res => {
                if (res.error === "") {
                    setGroup(res.data);
                    setReload(false);
                } else {
                    enqueueSnackbar("" + res.error, {variant: "error"});
                }
            })
        }
    }, [reload]);

    useEffect(() => {
        Get(id).then(res => {
            if (res.error === "") {
                console.log(res);
                setGroup(res.data);
                setLoading(false);
                setReload(false);
            } else {
                enqueueSnackbar("" + res.error, {variant: "error"});
            }
        })
    }, []);

    useEffect(() => {
        GetTemplate().then(res => {
            if (res.error === "") {
                console.log(res);
                setTemplate(res.data);
                console.log(template);
            } else {
                enqueueSnackbar("" + res.error, {variant: "error"});
            }
        })
    }, []);


    return (
        <Dashboard title={getTitle(group.ID, group.org, group.org_en, loading)}>
            {
                loading ? (
                    <div className={classes.root}>
                        <CircularProgress/>
                        <div>loading</div>
                    </div>
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <GroupStatus key={group.ID} data={group}/>
                        </Grid>
                        <Grid item xs={2}>
                            <GroupMainMenu key={group.ID} data={group} reload={setReload}/>
                        </Grid>
                        <Grid item xs={3}>
                            <GroupMemo key={group.ID} data={group} reload={setReload}/>
                        </Grid>
                        <Grid item xs={4}>
                            <GroupProfileInfo key={group.ID} data={group} template={template} reload={setReload}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Service key={"Service"} data={group} template={template} reload={setReload}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Users key={group.ID} data={group}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Ticket key={group.ID} data={group}/>
                        </Grid>
                    </Grid>
                )
            }
        </Dashboard>
    );
}