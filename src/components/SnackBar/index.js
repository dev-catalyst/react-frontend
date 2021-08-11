import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackBarSettings: {
        vertical: "bottom",
        horizontal: "center",
      },
    };
  }
  render() {
    const { vertical, horizontal } = this.state.snackBarSettings;
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.props.setOpenSnackBar(false);
    };
    return (
      <>
        <Snackbar
          open={this.props.openSnackBar}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity={this.props.responseMessageType}>
            {this.props.responseMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default SnackBar;
