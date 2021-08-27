import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close"
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red"
import MiniPalette from './MiniPalette';
import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingPaletteId: ""
        }
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handlePaletteDelete = this.handlePaletteDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }

    openDialog(id) {
        this.setState({ openDeleteDialog: true, deletingPaletteId: id });
    }

    closeDialog() {
        this.setState({ openDeleteDialog: false, deletingPaletteId: "" });
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    handlePaletteDelete() {
        this.props.deletePalette(this.state.deletingPaletteId);
        this.closeDialog();
    }

    render() {
        const { classes, palettes } = this.props;
        const { openDeleteDialog } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames='fade' timeout={500} >
                                <MiniPalette
                                    {...palette}
                                    goToPalette={this.goToPalette}
                                    openDialog={this.openDialog}
                                    key={palette.id}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog
                    open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id="delete-dialog-title">Delete the palette ?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handlePaletteDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }} >
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);