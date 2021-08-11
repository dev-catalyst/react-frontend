import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Link } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { formStyles } from "../../styledComponents/form";
import axios from "axios";
import { apiCreateAccount } from "../utility/apiUrls";
import Backdrop from "../Loader";
import SnackBar from "../SnackBar";

export default function SignUp() {
  const classes = formStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageType, setResponseMessageType] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const onSubmit = (event) => {
    setLoader(true);
    const body = {
      name: name,
      email: email.toLowerCase(),
      password: password,
    };
    signup(body);
    event.preventDefault();
  };

  async function signup(body) {
    try {
      let res = await axios.post(apiCreateAccount, body);
      if (res.data.Success) {
        setLoader(false);
        setOpenSnackBar(true);
        setResponseMessage("Account Created Successfully!");
        setResponseMessageType("success");
      } else {
        setOpenSnackBar(true);
        setResponseMessage(res.data.error.errorMessage);
        setResponseMessageType("error");
        setLoader(false);
      }
      setName("");
      setEmail("");
      setPassword("");
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
      <div className={classes.wrapper}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
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
                    autoFocus
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
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.already}>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign Up
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
}
