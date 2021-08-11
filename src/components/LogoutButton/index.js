import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

export default function LogoutButton() {
  const classes = useStyles();
  const cookie = new Cookies();
  const history = useHistory();

  return (
    <>
      <div className={classes.logoutButton}>
        <Button
          onClick={() => {
            cookie.remove("token");
            history.push("/signin");
          }}
        >
          <p>
            <ExitToAppIcon />
          </p>
          <p>Logout</p>
        </Button>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  logoutButton: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "40px",
  },
});
