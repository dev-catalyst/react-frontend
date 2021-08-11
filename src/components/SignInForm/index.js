import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Link } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { formStyles } from "../../styledComponents/form";
import { apiUserLogin } from "../utility/apiUrls";
import Backdrop from "../Loader";
import { useHistory } from "react-router-dom";
import { authenticateUser } from "../utility/authentication";
import axios from "axios";
import SnackBar from "../SnackBar";

export default function SignIn() {
  const classes = formStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageType] = useState("error");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const onSubmit = (event) => {
    const body = {
      email: email,
      password: password,
    };
    signin(body);
    event.preventDefault();
  };

  async function signin(body) {
    setLoader(true);
    try {
      let res = await axios.post(apiUserLogin, body);
      if (res.data.Success) {
        let token = res.data.data.access_token;
        authenticateUser(token);
        setLoader(false);
        history.push("/");
      } else {
        setOpenSnackBar(true);
        setResponseMessage(res.data.error.errorMessage);
        setLoader(false);
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
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
                  autoFocus
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
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign in
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
