import {
  BrowserRouter,
} from 'react-router-dom';

import { LoginControl } from "./components/LoginControl";

function App() {
  return (
    <BrowserRouter>
      <div style={{ textAlign: "center" }}><h1>Authentication Project</h1>
        <p>By Atharva Upadhye</p></div>
      <LoginControl />
    </BrowserRouter>
  );
}

export default App;
