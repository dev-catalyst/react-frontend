import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserInfo from "../UserInfo";
import LogoutButton from "../LogoutButton";
import Cards from "../Cards";

export default function UserDashBoard() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs value={currentTab} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Home" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>
      <LogoutButton />
      {currentTab === 1 ? <UserInfo /> : <Cards />}
    </>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logoutButton: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "40px",
  },
});
