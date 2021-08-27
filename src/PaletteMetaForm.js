import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: "", showFormOf: "paletteName", emoji: "" };
    this.handleChange = this.handleChange.bind(this);
    this.nextStage = this.nextStage.bind(this);
    this.storeEmoji = this.storeEmoji.bind(this);
    this.passPalette = this.passPalette.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  nextStage() {
    this.setState({ showFormOf: "emoji" });
  }

  storeEmoji(emoji) {
    console.log(emoji);
    this.setState({ emoji: emoji.native });
  }

  passPalette() {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: this.state.emoji,
    };
    this.props.handleSubmit(newPalette);
    this.setState({ showFormOf: "" });
  }

  render() {
    const { newPaletteName, showFormOf } = this.state;
    const { isShowingForm, hidePaletteForm } = this.props;
    return (
      <div>
        <Dialog
          open={isShowingForm && showFormOf === "emoji"}
          onClose={hidePaletteForm}
        >
          <DialogContent>
            <Picker title="Pick an emoji" onSelect={this.storeEmoji} />
            <DialogContentText style={{ fontSize: "2.5rem", color: "black" }}>
              Emoji - {this.state.emoji}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.passPalette}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isShowingForm && showFormOf === "paletteName"}
          onClose={hidePaletteForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a palette name
          </DialogTitle>
          <ValidatorForm onSubmit={this.nextStage} autoComplete="off">
            <DialogContent>
              <DialogContentText style={{ fontWeight: "bolder" }}>
                Please enter the name for the Palette to be saved and make sure
                its unique
              </DialogContentText>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter palette name", "Name already used"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hidePaletteForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Next
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
