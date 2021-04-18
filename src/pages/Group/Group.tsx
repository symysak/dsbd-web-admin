import React, {useEffect, useState} from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import useStyles from "./styles"
import {Button, Card, CardActions, CardContent, InputBase, Paper, Typography} from "@material-ui/core";
import {GetAll} from "../../api/Group";


export default function Group() {
    const classes = useStyles();
    const [groups, setGroups] = useState([]);
    const [initGroups, setInitGroups] = useState([]);

    useEffect(() => {
        GetAll().then(res => {
            if (res.error === "") {
                console.log(res);
                setGroups(res.data);
                setInitGroups(res.data);
            } else {
                //TODO: エラー処理が必要
            }
        })
    }, []);

    const handleFilter = (search: string) => {
        let tmp: any;
        if (search === "") {
            tmp = initGroups;
        } else {
            tmp = initGroups.filter((grp: any) => {
                return grp.org.toLowerCase().indexOf(search.toLowerCase()) === 0
            });
        }
        setGroups(tmp);
    };


    return (
        <Dashboard title="Group Info">
            <Paper component="form" className={classes.rootInput}>
                <InputBase
                    className={classes.input}
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                    onChange={event => {
                        // setSearch(event.target.value)
                        handleFilter(event.target.value)
                    }}
                />
            </Paper>
            {
                groups.map((group: any) =>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                ID: {group.ID}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {group.org} ({group.org_en})
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {group.user}
                            </Typography>
                            {/*<Typography variant="body2" component="p">*/}
                            {/*    well meaning and kindly.*/}
                            {/*    <br/>*/}
                            {/*    {'"a benevolent smile"'}*/}
                            {/*</Typography>*/}
                        </CardContent>
                        <CardActions>
                            <Button size="small">Detail</Button>
                        </CardActions>
                    </Card>
                )
            }
        </Dashboard>
    );
}
