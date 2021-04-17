import {createStyles, makeStyles, Theme} from "@material-ui/core";

const drawerWidth = 240;

// const useDashboardStyles = ;

export default makeStyles(theme => ({
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
