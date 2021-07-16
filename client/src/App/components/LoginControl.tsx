import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Dashboard from "../views/Dashboard";

function LoginControl(props: any) {
  return (
    <>
      {/* <MyAppBar isLoggedIn={isloggedIn} /> */}
      <Switch>
        <Route path="/signup"><Signup /></Route>
        <Route path="/dashboard"><Dashboard /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
    </>
  );
}
export { LoginControl };
