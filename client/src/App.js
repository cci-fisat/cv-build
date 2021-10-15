import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import UserDetails from './components/user-details'
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Result from "./components/Result";
import Skills from "./components/skills";
import Download from './components/download';
import "./css/styles.css";

createStore({
  yourDetails: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    email: "",
    phone: "",
  }
});

const Pages = () => {
  const location = useLocation();
  return (
    <>
      <Route exact path="/" component={UserDetails} />
      <Route exact path="/step1" component={Step1} />
      <Route path="/step2" component={Step2} />
      <Route path="/skills" component={Skills} />
      <Route path="/download" component={Download} />
      <Route path="/result" component={Result} />
    </>
  );
};

function App() {
  return (
    <StateMachineProvider>
      <div className="container">

        <Router>
          <Pages />
        </Router>
      </div>
    </StateMachineProvider>
  );
}

export default App;