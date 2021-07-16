import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField, LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BASE_URL, schema } from "../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    }
  }),
);

export default function SignUp() {
  const SIGNUP_URL = `${BASE_URL}/auth/signup`

  const history = useHistory();
  const classes = useStyles();

  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<any>('')
  const [confirmPassword, setConfirmPassword] = useState<any>('')
  const [loading, setloading] = useState(false)

  function isFormValid(): boolean {
    const result = schema.validate({
      username: userName,
      password: password
    });
    if (result.error === null || result.error === undefined) {
      return true;
    } else if (result.error.message.includes("username")) {
      alert("Username is invalid. 😭");
    } else {
      alert("Password is invalid. 🙈");
    }
    return false;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (!isFormValid()) { return }
    setloading(true)
    const body = { username: userName, password: password };

    fetch(
      SIGNUP_URL,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "content-type": "application/json", },
      }
    ).then(
      (response) => {
        if (response.ok) return response.json();
        else return response.json()
          .then((error) => {
            throw new Error(error.message);
          });
      }
    ).then(
      (result) => {
        localStorage.token = result.token;
        setloading(false)
        setTimeout(() => { history.push("/dashboard"); }, 1000);
      }
    ).catch(
      (error) => {
        setloading(false)
        alert(error.message);
      }
    );
  }

  return (
    <div>
      {loading && <LinearProgress />}
      <h1>Sign Up form</h1>
      <form className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Username"
          onChange={(e) => { setUserName(e.target.value); }}
          value={userName}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(e) => { setPassword(e.target.value); }}
          value={password}
        />
        <TextField
          id="outlined-password-input-2"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(e) => { setConfirmPassword(e.target.value); }}
          value={confirmPassword}
        />
        <div className={classes.root}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Sign Up
        </Button>
          <Button
            color="inherit"
            variant="contained"
            onClick={() => { history.push('/login'); }}
          >
            Log In
        </Button>
        </div>
      </form>
    </div>
  )
}
