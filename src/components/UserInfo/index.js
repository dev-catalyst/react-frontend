import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Button, CssBaseline, TextField, Grid, Container } from "@material-ui/core";
import { apiUpdateUser } from "../utility/apiUrls";
import Backdrop from "../Loader";
import SnackBar from "../SnackBar";

export default function UserInfo() {
  const classes = userInfoStyles();
  const cookie = new Cookies();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageType, setResponseMessageType] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [token] = useState(cookie.get("token"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    const userInfo = jwtDecode(token);
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [token]);

  const onSubmit = (event) => {
    const body = {
      name: name,
      email: email,
    };
    updateInfo(body);
    event.preventDefault();
  };

  async function updateInfo(body) {
    setLoader(true);
    try {
      let res = await axios.post(apiUpdateUser, body, config);
      if (res.data.Success) {
        setLoader(false);
        cookie.set("token", res.data.data.access_token, { path: "/" });
        setOpenSnackBar(true);
        setResponseMessage("User info updated");
        setResponseMessageType("success");
      } else {
        setLoader(false);
        setOpenSnackBar(true);
        setResponseMessage(res.data.error.errorMessage);
        setResponseMessageType("error");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <SnackBar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        responseMessage={responseMessage}
        responseMessageType={responseMessageType}
      />
      <Backdrop open={loader} />
      <h2 className={classes.infoHeading}>User Info</h2>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  id="Name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Save
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

const userInfoStyles = makeStyles((theme) => ({
  infoHeading: {
    textAlign: "center",
    marginTop: "50px",
    marginBottom: "50px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "10px",
  },
}));
