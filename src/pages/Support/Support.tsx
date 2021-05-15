import React, {useEffect, useState} from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import useStyles from "../Dashboard/styles"
import {Button, Card, CardActions, CardContent, InputBase, Paper, Typography} from "@material-ui/core";
import {GetAll} from "../../api/Support";
import {useHistory} from "react-router-dom";
import {DefaultTicketDataArray, TicketDetailData} from "../../interface";
import {useSnackbar} from "notistack";
import {Solved} from "../../components/Dashboard/Solved/Open";


export default function Support() {
    const classes = useStyles();
    const [tickets, setTickets] = useState(DefaultTicketDataArray);
    const [initTickets, setInitTickets] = useState(DefaultTicketDataArray);
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        GetAll().then(res => {
            if (res.error === "") {
                console.log(res);
                setTickets(res.data);
                setInitTickets(res.data);
            } else {
                enqueueSnackbar("" + res.error, {variant: "error"});
            }
        })
    }, []);

    const handleFilter = (search: string) => {
        let tmp: TicketDetailData[];
        if (search === "") {
            tmp = initTickets;
        } else {
            tmp = initTickets.filter((grp: TicketDetailData) => {
                return grp.title.toLowerCase().includes(search.toLowerCase())
            });
        }
        setTickets(tmp);
    };

    const clickDetailPage = (id: number) => {
        history.push('/dashboard/support/' + id);
    }

    return (
        <Dashboard title="Ticket Info">
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
                tickets.map((ticket: TicketDetailData, index) => (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                ID: {ticket.ID}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {ticket.title}
                            </Typography>
                            <br/>
                            <Solved key={index} solved={ticket.solved}/>
                            <br/>
                            Group: {ticket.group?.org}({ticket.group?.org_en})
                            <br/>
                            作成者: {ticket.user?.name}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => clickDetailPage(ticket.ID)}>Detail</Button>
                        </CardActions>
                    </Card>
                ))
            }
        </Dashboard>
    );
}
