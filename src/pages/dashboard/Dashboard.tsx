import React, {ReactNode} from 'react';
import clsx from 'clsx';
import {
    AppBar,
    Badge, Box, Collapse, colors,
    Container, createMuiTheme, createStyles, ThemeProvider,
    CssBaseline,
    Divider,
    Drawer, Grid,
    IconButton,
    List, ListItem, ListItemIcon, ListItemText,
    makeStyles, Paper, Theme, Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Copyright, ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LayersIcon from "@material-ui/icons/Layers";
import ClassIcon from '@material-ui/icons/Class';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import {purple} from "@material-ui/core/colors";

type Props = {}

const drawerWidth = 240;

const useDashboardStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const useListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export default function Dashboard() {
    const classesDashboard = useDashboardStyles();
    const classesMenu = useListStyles();
    // Menu Bar
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
        setOpenOther(false);
    };
    // Menu Bar (Other Button)
    const fixedHeightPaper = clsx(classesDashboard.paper, classesDashboard.fixedHeight);
    const [openOther, setOpenOther] = React.useState(true);
    const handleClick = () => {
        setOpenOther(!openOther);
        // Menu Bar is not opened...
        if (!open) {
            setOpen(true);
        }
    };
    // Change color button
    const [darkMode, setDarkMode] = React.useState(true);
    const changeColorClick = () => {
        setDarkMode(!darkMode);
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: colors.blue[800],
            },
            type: darkMode ? "dark" : "light",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className={classesDashboard.root}>
                <CssBaseline/>
                <AppBar position="absolute"
                        className={clsx(classesDashboard.appBar, open && classesDashboard.appBarShift)}>
                    <Toolbar className={classesDashboard.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classesDashboard.menuButton, open && classesDashboard.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap
                                    className={classesDashboard.title}>
                            Dashboard
                        </Typography>
                        <IconButton color="inherit" onClick={changeColorClick}>
                            <InvertColorsIcon/>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{paper: clsx(classesDashboard.drawerPaper, !open && classesDashboard.drawerPaperClose),}}
                    open={open}
                >
                    <div className={classesDashboard.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <NotificationsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Notice"/>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Group"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Orders"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ChatIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Chat"/>
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <LayersIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Other"/>
                        {openOther ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={openOther} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classesMenu.nested}>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="User"/>
                            </ListItem>
                            <ListItem button className={classesMenu.nested}>
                                <ListItemIcon>
                                    <ClassIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Service"/>
                            </ListItem>
                            <ListItem button className={classesMenu.nested}>
                                <ListItemIcon>
                                    <AccountTreeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Connection"/>
                            </ListItem>
                            <ListItem button className={classesMenu.nested}>
                                <ListItemIcon>
                                    <VpnKeyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Token"/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Setting"/>
                    </ListItem>
                    <Divider/>
                    {/*<List>{secondaryList}</List>*/}
                </Drawer>
                <main className={classesDashboard.content}>
                    <div className={classesDashboard.appBarSpacer}/>
                    <Container maxWidth="lg" className={classesDashboard.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    {/*<Chart/>*/}
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    {/*<Deposits/>*/}
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classesDashboard.paper}>
                                    {/*<Orders/>*/}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </ThemeProvider>
    );
}
