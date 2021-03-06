import { DRAWER_WIDTH } from "../constants";
import sizes from "./Sizes";
const drawerWidth = DRAWER_WIDTH;
const styles = theme => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        [sizes.down("sm")]: {
            height: "55px"
        }
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: "none"
    },
    navBtns: {
        marginRight: "1rem",
        "& a": {
            textDecoration: "none"
        }
    },
    button: {
        margin: "0 0.5rem",
        [sizes.down("sm")]: {
            margin: "0 0.4rem",
            padding: "1px"
        }
    },
});

export default styles;