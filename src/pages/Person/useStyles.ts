import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    marginIcon: {
        margin: theme.spacing(1),
    },
    fab: {
        position: "fixed",
        [theme.breakpoints.up("md")]: {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        [theme.breakpoints.down("sm")]: {
            bottom: "2px",
            right: "2px"
        }
    },
    centered: {
        margin: theme.spacing(2, 0, 2),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: "100%"
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export default useStyles;