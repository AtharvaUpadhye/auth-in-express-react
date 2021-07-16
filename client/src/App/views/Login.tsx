import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField, LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BASE_URL, schema } from '../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function Login() {

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

  const LOGIN_URL = `${BASE_URL}/auth/login`

  const history = useHistory();
  const classes = useStyles();
  const [userName, setUserName] = useState<any>('')
  const [password, setPassword] = useState<any>('')
  const [loading, setloading] = useState(false)

  function handleSubmit(event: any) {
    event.preventDefault();
    if (!isFormValid) return;
    setloading(true)
    const body = { username: userName, password: password };
    fetch(
      LOGIN_URL,
      {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(body),
      }
    ).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((error) => {
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
        console.error(error.message);
      }
    );
  }
  return (
    <div>
      {loading && <LinearProgress />}
      <h1>Log In form</h1>
      <form
        className={classes.root}
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
        <div className={classes.root}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Log In
        </Button>
          <Button
            color="inherit"
            variant="contained"
            onClick={() => { history.push('/signup'); }}
          >
            Sign Up
      </Button>
        </div>
      </form>
    </div>
  )
}
