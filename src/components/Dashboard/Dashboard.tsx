import React from 'react';
import {
    Badge, Collapse,
    ThemeProvider,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List, ListItem, ListItemIcon, ListItemText,
    MenuItem, Menu, Fade, styled
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import ClassIcon from '@mui/icons-material/Class';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
    StyledDivDashboardToolBarIcon,
    StyledDivDashboardRoot,
    StyledToolBarDashboardRoot,
    StyledTypographyPageTitle, StyledMainContent, StyledDivAppBarShift, StyledContainer1, StyledListItemSideBarNested
} from "./styles";
import {useNavigate} from "react-router-dom";
import {Logout} from "../../api/Auth";
import {muiColorTheme} from "../Theme";
import {StyledTypographyTitle} from "../../style";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Dashboard(props: any) {
    // Menu Bar
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpenOther(false);
        setOpen(false);
    };
    // Menu Bar (Other Button)
    const [openOther, setOpenOther] = React.useState(false);
    const handleClick = () => {
        setOpenOther(!openOther);
        // Menu Bar is not opened...
        if (!open) {
            setOpen(true);
        }
    };

    const navigate = useNavigate();

    const DashboardPage = () => {
        navigate("/dashboard");
    }
    const NoticePage = () => {
        navigate("/dashboard/notice");
    }
    const GroupPage = () => {
        navigate("/dashboard/group");
    }
    const JPNICPage = () => {
        navigate("/dashboard/jpnic");
    }
    const OrderPage = () => {
        navigate("/dashboard/order");
    }
    const SupportPage = () => {
        navigate("/dashboard/support");
    }
    const ServicePage = () => {
        navigate("/dashboard/service");
    }
    const ConnectionPage = () => {
        navigate("/dashboard/connection");
    }
    const UserPage = () => {
        navigate("/dashboard/user");
    }
    const TokenPage = () => {
        navigate("/dashboard/token");
    }

    return (
        <ThemeProvider theme={muiColorTheme}>
            <StyledDivDashboardRoot>
                <CssBaseline/>
                <AppBar position="fixed" open={open}>
                    <StyledToolBarDashboardRoot>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            // className={clsx(classesDashboard.menuButton, open && classesDashboard.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <StyledTypographyTitle variant="h6" color="inherit" noWrap>
                            AS59105 Admin Page
                        </StyledTypographyTitle>
                        <IconButton color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <UserMenu key={"user_menu"}/>
                    </StyledToolBarDashboardRoot>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    // classes={{paper: clsx(classesDashboard.drawerPaper, !open && classesDashboard.drawerPaperClose),}}
                    open={open}
                >
                    <StyledDivDashboardToolBarIcon>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </StyledDivDashboardToolBarIcon>
                    <Divider/>
                    <ListItem button onClick={DashboardPage}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button onClick={NoticePage}>
                        <ListItemIcon>
                            <NotificationsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Notice"/>
                    </ListItem>
                    <ListItem button onClick={GroupPage}>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Group"/>
                    </ListItem>
                    <ListItem button onClick={JPNICPage}>
                        <ListItemIcon>
                            <PeopleAltIcon/>
                        </ListItemIcon>
                        <ListItemText primary="JPNIC"/>
                    </ListItem>
                    <ListItem button onClick={OrderPage}>
                        <ListItemIcon>
                            <ShoppingCartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Orders"/>
                    </ListItem>
                    <ListItem button onClick={SupportPage}>
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
                            <StyledListItemSideBarNested onClick={UserPage}>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="User"/>
                            </StyledListItemSideBarNested>
                            <StyledListItemSideBarNested onClick={ServicePage}>
                                <ListItemIcon>
                                    <ClassIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Service"/>
                            </StyledListItemSideBarNested>
                            <StyledListItemSideBarNested onClick={ConnectionPage}>
                                <ListItemIcon>
                                    <AccountTreeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Connection"/>
                            </StyledListItemSideBarNested>
                            <StyledListItemSideBarNested onClick={TokenPage}>
                                <ListItemIcon>
                                    <VpnKeyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Token"/>
                            </StyledListItemSideBarNested>
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
                <StyledMainContent>
                    <StyledDivAppBarShift/>
                    <StyledContainer1 maxWidth="lg">
                        <StyledTypographyPageTitle
                            // component="h2"
                            variant="h5"
                            color="inherit"
                            noWrap
                        >
                            {props.title}
                        </StyledTypographyPageTitle>
                        {props.children}
                    </StyledContainer1>
                </StyledMainContent>
            </StyledDivDashboardRoot>
        </ThemeProvider>
    );
}

export function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickLogout = () => {
        Logout().then(res => {
                sessionStorage.removeItem('ACCESS_TOKEN');
                navigate('/login');
                console.log(res)
                if (res === "") {
                } else {

                }
            }
        );
    }

    return (
        <StyledDivDashboardRoot>
            <IconButton
                color="inherit"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <PermIdentityIcon/>
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                <MenuItem onClick={clickLogout}>Logout</MenuItem>
            </Menu>
        </StyledDivDashboardRoot>
    );
}

