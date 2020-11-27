import React from "react";
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import Provider from "./Provider";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      logged: false,
      setLogged: (val) => {
        this.setState({ username: val });
        this.setState({ logged: true });
      },
    };
  }
  login = () => {
    localStorage.setItem("username", "Aydin");
    this.setState({ logged: true });
  };
  logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    this.setState({ logged: false });
    this.setState({ username: null });
  };
  componentDidMount() {
    let form = {
      method: "POST",
      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // "Device": "device",
        // "Token": localStorage.getItem("access_token"),
        // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        // "Access-Control-Allow-Origin": "localhost:3000"
      },
      // redirect: "follow",
      // referrer: "no-referrer",
      body: JSON.stringify({
        refresh: localStorage.getItem("refresh_token"),
      }),
    };
    let url = `http://localhost:8000/api/v1/refresh/`;
    fetch(url, form)
      .then((res) => res.json())
      .then((response) => {
        console.log("response: ", response);
        if (response.refresh && response.access) {
          this.setState({ logged: true });
          this.setState({ username: localStorage.getItem("username") });
        } else {
          this.setState({ logged: false });
          this.setState({ username: null });
        }
      })
      .catch((error) => {
        this.setState({ logged: false });
        this.setState({ username: null });
      });

    // if (localStorage.getItem("username")) {
    //   this.setState({ logged: true });
    //   this.setState({ username: localStorage.getItem("username") });
    // } else {
    //   this.setState({ logged: false });
    //   this.setState({ username: null });
    // }
  }
  render() {
    return (
      <Provider>
        <Router>
          <div>
            {this.state.logged ? (
              <nav>
                <div>
                  <Link exact="true" to="/">
                    <img src="logo.png" alt="logo" />
                  </Link>
                </div>
                <div>
                  <Link
                    exact="true"
                    to="/registration"
                    style={{ textDecoration: "none", color: "whitesmoke" }}
                  >
                    <span>{this.state.username}</span>
                  </Link>
                  <span onClick={this.logout}>logout</span>
                </div>
              </nav>
            ) : (
              <nav>
                <div>
                  <Link exact="true" to="/">
                    <img src="logo.png" alt="logo" />
                  </Link>
                </div>
                <div>
                  <Link
                    exact="true"
                    to="/registration"
                    style={{ textDecoration: "none", color: "whitesmoke" }}
                  >
                    <span>registration</span>
                  </Link>
                  <Link
                    exact="true"
                    to="/login"
                    style={{ textDecoration: "none", color: "whitesmoke" }}
                  >
                    <span>login</span>
                  </Link>
                </div>
              </nav>
            )}
            <Switch>
              <Route exact path="/">
                <Home props={{ state: this.state }} />
              </Route>
              <Route exact path="/registration">
                <Registration props={{ state: this.state }} />
              </Route>
              <Route exact path="/login">
                <Login props={{ state: this.state }} />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
