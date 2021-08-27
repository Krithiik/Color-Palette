import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos"
import Button from "@material-ui/core/Button";
import PaletteMetaForm from './PaletteMetaForm';
import styles from "./styles/PaletteFormNavStyles"

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowingForm: false };
        this.showPaletteForm = this.showPaletteForm.bind(this);
        this.hidePaletteForm = this.hidePaletteForm.bind(this);
    }

    showPaletteForm() {
        if (this.props.colors.length > 0) {
            this.setState({ isShowingForm: true });
        } else {
            alert("No colors in Palette");
        }
    }

    hidePaletteForm() {
        this.setState({ isShowingForm: false });
    }

    render() {
        const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
        const { isShowingForm } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <AddToPhotosIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Pick a Color
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/">
                            <Button variant="contained" className={classes.button} color="secondary" >Go back</Button>
                        </Link>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.showPaletteForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {isShowingForm &&
                    <PaletteMetaForm
                        isShowingForm={isShowingForm}
                        palettes={palettes}
                        hidePaletteForm={this.hidePaletteForm}
                        handleSubmit={handleSubmit}
                    />
                }
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)