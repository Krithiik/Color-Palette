import sizes from "./Sizes"
const styles = {
    root: {
        width: "100%",
        [sizes.down("xs")]: {
            width: "90%",
        }
    },
    picker: {
        width: "100% !important",
        marginTop: "2rem"
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput: {
        width: "100%",
        height: "70px",
        marginTop: "1rem"
    }
};

export default styles;