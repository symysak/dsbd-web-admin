import React, {useEffect, useState} from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import useStyles from "../Dashboard/styles"
import {Button, Card, CardActions, CardContent, InputBase, Paper, Typography} from "@material-ui/core";
import {GetAll} from "../../api/Group";
import {useHistory} from "react-router-dom";
import {DefaultGroupDetailDataArray, GroupDetailData} from "../../interface";
import {useSnackbar} from "notistack";


export default function Group() {
    const classes = useStyles();
    const [groups, setGroups] = useState(DefaultGroupDetailDataArray);
    const [initGroups, setInitGroups] = useState(DefaultGroupDetailDataArray);
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        GetAll().then(res => {
            if (res.error === "") {
                console.log(res);
                setGroups(res.data);
                setInitGroups(res.data);
            } else {
                enqueueSnackbar("" + res.error, {variant: "error"});
            }
        })
    }, []);

    const handleFilter = (search: string) => {
        let tmp: GroupDetailData[];
        if (search === "") {
            tmp = initGroups;
        } else {
            tmp = initGroups.filter((grp: GroupDetailData) => {
                return grp.org_en.toLowerCase().includes(search.toLowerCase())
            });
        }
        setGroups(tmp);
    };

    function clickDetailPage(id: number) {
        history.push('/dashboard/group/' + id);
    }

    return (
        <Dashboard title="Group Info">
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
                groups.map((group: GroupDetailData) => (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                ID: {group.ID}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {group.org} ({group.org_en})
                            </Typography>
                            {/*<Typography className={classes.pos} color="textSecondary">*/}
                            {/*    {group.user}*/}
                            {/*</Typography>*/}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => clickDetailPage(group.ID)}>Detail</Button>
                        </CardActions>
                    </Card>
                ))
            }
        </Dashboard>
    );
}
