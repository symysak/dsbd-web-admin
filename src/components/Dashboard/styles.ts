import {Container, Drawer, FormControl, ListItem, styled, Toolbar, Typography} from "@mui/material";

const drawerWidth = 240;

export const StyledDivDashboardRoot = styled(FormControl)(({theme}) => ({
    display: 'flex',
}))

export const StyledToolBarDashboardRoot = styled(Toolbar)(({theme}) => ({
    paddingRight: 24,
}))

export const StyledDivDashboardToolBarIcon = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
}))

export const StyledTypographyPageTitle = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(1),
}))

export const StyledMainContent = styled('main')(({theme}) => ({
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
}))

export const StyledDivAppBarShift = styled('div')(({theme}) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
}))

export const StyledContainer1 = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}))

export const StyledListItemSideBarNested = styled(ListItem)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}))

export const StyledDrawer1 = styled(Drawer)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}))

// export default makeStyles(theme => ({
//         appBar: {
//             zIndex: theme.zIndex.drawer + 1,
//             transition: theme.transitions.create(['width', 'margin'], {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//             }),
//         },
//         menuButton: {
//             marginRight: 36,
//         },
//         menuButtonHidden: {
//             display: 'none',
//         },
//         title: {
//             flexGrow: 1,
//         },
//         drawerPaper: {
//             position: 'relative',
//             whiteSpace: 'nowrap',
//             width: drawerWidth,
//             transition: theme.transitions.create('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//         },
//         drawerPaperClose: {
//             overflowX: 'hidden',
//             transition: theme.transitions.create('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen,
//             }),
//             width: theme.spacing(7),
//             [theme.breakpoints.up('sm')]: {
//                 width: theme.spacing(9),
//             },
//         },
//         appBarSpacer: theme.mixins.toolbar,
//         container: {
//             paddingTop: theme.spacing(4),
//             paddingBottom: theme.spacing(4),
//         },
//         paper: {
//             padding: theme.spacing(2),
//             display: 'flex',
//             overflow: 'auto',
//             flexDirection: 'column',
//         },
//         fixedHeight: {
//             height: 240,
//         },
//     }),
// );
