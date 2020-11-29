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
      getGames: () => {
        let form2 = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        };
        let url2 = `http://localhost:8000/api/v1/games/`;
        fetch(url2, form2)
          .then((res) => res.json())
          .then((response) => {
            this.setState({ games: response.results });
            this.setState({ nextUrl: response.next });
          })
          .catch((error) => {
            console.log(error);
          });

        let form3 = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        };
        let url3 = `http://localhost:8000/api/v1/games/statistic/`;
        fetch(url3, form3)
          .then((res) => res.json())
          .then((response) => {
            this.setState({ statistics: response.data });
            console.log("succes stat: ", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      newgame: () => {
        this.setState({ currentGame: true });
        this.state.getGames();
      },
      filter: (n) => {
        let form = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        };
        let url = `http://localhost:8000/api/v1/games/?result=${n}`;
        fetch(url, form)
          .then((res) => res.json())
          .then((response) => {
            this.setState({ games: response.results });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      statistics: null,
      games: null,
      username: null,
      logged: false,
      setLogged: (val) => {
        this.setState({ username: val });
        this.setState({ logged: true });
        this.state.getGames();
      },
      previousUrl: null,
      nextUrl: null,
      next: () => {
        let form = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        };
        fetch(this.state.nextUrl, form)
          .then((res) => res.json())
          .then((response) => {
            this.setState({ games: response.results });
            this.setState({ nextUrl: response.next });
            this.setState({ previousUrl: response.previous });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      previous: () => {
        let form = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        };
        fetch(this.state.previousUrl, form)
          .then((res) => res.json())
          .then((response) => {
            this.setState({ games: response.results });
            this.setState({ nextUrl: response.next });
            this.setState({ previousUrl: response.previous });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      currentGame: false,
    };
  }
  logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    this.setState({ logged: false });
    this.setState({ username: null });
    this.setState({ currentGame: false });
  };
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.setState({ logged: false });
      return this.setState({ username: null });
    }
    let form = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    let url = `http://localhost:8000/api/v1/user`;
    fetch(url, form)
      .then((res) => res.json())
      .then((response) => {
        if (response.email) {
          this.setState({ logged: true });
          this.setState({ username: localStorage.getItem("email") });
        } else {
          this.setState({ logged: false });
          this.setState({ username: null });
        }
      })
      .catch((error) => {
        this.setState({ logged: false });
        this.setState({ username: null });
      });

    this.state.getGames();
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
                  <span>{this.state.username}</span>
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
