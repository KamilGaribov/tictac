import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const Context = React.createContext();

class Provider extends Component {
  state = {
    regError: null,
    line: null,
    gameMessage: null,
    gameWatch: false,
    gameResult: null,
    gameError: null,
    gameId: null,
    gamePlayed: false,
    game: null,
    watchGame: (id) => {
      this.setState({ gameResult: null });
      this.setState({ gameMessage: null });
      this.setState({ gameError: null });
      let form = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };
      let url = `http://localhost:8000/api/v1/games/${id}/`;
      fetch(url, form)
        .then((res) => res.json())
        .then((response) => {
          this.setState({ game: response });
          this.setState({ gameId: id });
          if (response.result === 1) {
            this.setState({ gameResult: "You win!" });
            if (
              response.board[0] === "X" &&
              response.board[1] === "X" &&
              response.board[2] === "X"
            ) {
              this.setState({ line: "one" });
            } else if (
              response.board[3] === "X" &&
              response.board[4] === "X" &&
              response.board[5] === "X"
            ) {
              this.setState({ line: "two" });
            } else if (
              response.board[6] === "X" &&
              response.board[7] === "X" &&
              response.board[8] === "X"
            ) {
              this.setState({ line: "three" });
            } else if (
              response.board[0] === "X" &&
              response.board[3] === "X" &&
              response.board[6] === "X"
            ) {
              this.setState({ line: "four" });
            } else if (
              response.board[1] === "X" &&
              response.board[4] === "X" &&
              response.board[7] === "X"
            ) {
              this.setState({ line: "five" });
            } else if (
              response.board[2] === "X" &&
              response.board[5] === "X" &&
              response.board[8] === "X"
            ) {
              this.setState({ line: "six" });
            } else if (
              response.board[0] === "X" &&
              response.board[4] === "X" &&
              response.board[8] === "X"
            ) {
              this.setState({ line: "seven" });
            } else if (
              response.board[2] === "X" &&
              response.board[4] === "X" &&
              response.board[6] === "X"
            ) {
              this.setState({ line: "eight" });
            }
          } else if (response.result === 2) {
            this.setState({ gameResult: "Computer win" });
            if (
              response.board[0] === "O" &&
              response.board[1] === "O" &&
              response.board[2] === "O"
            ) {
              this.setState({ line: "one" });
            } else if (
              response.board[3] === "O" &&
              response.board[4] === "O" &&
              response.board[5] === "O"
            ) {
              this.setState({ line: "two" });
            } else if (
              response.board[6] === "O" &&
              response.board[7] === "O" &&
              response.board[8] === "O"
            ) {
              this.setState({ line: "three" });
            } else if (
              response.board[0] === "O" &&
              response.board[3] === "O" &&
              response.board[6] === "O"
            ) {
              this.setState({ line: "four" });
            } else if (
              response.board[1] === "O" &&
              response.board[4] === "O" &&
              response.board[7] === "O"
            ) {
              this.setState({ line: "five" });
            } else if (
              response.board[2] === "O" &&
              response.board[5] === "O" &&
              response.board[8] === "O"
            ) {
              this.setState({ line: "six" });
            } else if (
              response.board[0] === "O" &&
              response.board[4] === "O" &&
              response.board[8] === "O"
            ) {
              this.setState({ line: "seven" });
            } else if (
              response.board[2] === "O" &&
              response.board[4] === "O" &&
              response.board[6] === "O"
            ) {
              this.setState({ line: "eight" });
            }
          } else if (response.result === -1) {
            this.setState({ gameResult: "Draw" });
            this.setState({ line: null });
          } else {
            this.setState({ gamePlayed: response.board });
            this.setState({ line: null });
          }
        })
        .catch((error) => {
          console.log(error);
          // this.setState({ logged: false });
          // this.setState({ username: null });
        });
    },
    startnewgame: () => {
      this.setState({ gameError: "Start new game" });
    },
    play: (e) => {
      if (this.state.gameWatch) {
        return this.setState({ gameError: "Game has finished" });
      }
      if (this.state.gameResult != null) {
        return this.setState({ gameError: "Game has finished" });
      }
      let nodelist = e.target.parentElement.querySelectorAll("div");
      let array = [...nodelist];
      let num = array.indexOf(e.target) + 1;
      if (
        this.state.gamePlayed !== false &&
        this.state.gamePlayed[num - 1] !== "-"
      ) {
        return this.setState({ gameError: "Play another" });
      }
      this.setState({ gameError: null });
      let form = {
        body: JSON.stringify({
          number: num,
        }),
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };
      let url = `http://localhost:8000/api/v1/games/${this.state.gameId}/check/`;
      fetch(url, form)
        .then((res) => res.json())
        .then((response) => {
          this.setState({ game: response });
          if (response.result_code === 1) {
            this.setState({ gameResult: "You win!" });
          } else if (response.result_code === 2) {
            this.setState({ gameResult: "Computer win" });
          } else if (response.result_code === -1) {
            this.setState({ gameResult: "Draw" });
          } else {
            this.setState({ gamePlayed: response.board });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newGame: () => {
      this.setState({ line: null });
      this.setState({ gameWatch: false });
      this.setState({ gameResult: null });
      this.setState({ gameError: null });
      this.setState({ gamePlayed: false });
      let form = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };
      let url = `http://localhost:8000/api/v1/games/create/`;
      fetch(url, form)
        .then((res) => res.json())
        .then((response) => {
          this.setState({ game: response });
          this.setState({ gameMessage: `Game id:${response.id} started` });
          this.setState({ gameId: response.id });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    nextPage: () => {
      let form = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };
      let url = `http://localhost:8000/api/v1/games/?limit=5&offset=5`;
      fetch(url, form)
        .then((res) => res.json())
        .then((response) => {
          this.setState({ games: response.results });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    redirectLogin: false,
    renderRedirectLogin: () => {
      if (this.state.redirectLogin) {
        this.setState({redirectLogin: false})
        return <Redirect to="/login" />;
      }
    },
    redirectHome: false,
    renderRedirectHome: () => {
      if (this.state.redirectHome) {
        this.setState({ redirectHome: false });
        return <Redirect to="/" />;
      }
    },
    login: (e, func) => {
      const email = e.target.parentElement.querySelector("input[type=email]")
        .value;
      const password = e.target.parentElement.querySelector(
        "input[type=password]"
      ).value;
      if (password && email) {
        let form = {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Authentication": "JWT hda5da7sd6as8d"
          },
        };
        let url = `http://localhost:8000/api/v1/login/`;
        fetch(url, form)
          .then((res) => res.json())
          .then((response) => {
            if (response.email) {
              localStorage.setItem("email", email);
              localStorage.setItem("token", response.token);
              func(email);
              this.setState({ redirectHome: true });
            } else {
              console.log("error");
            }
          })
          .catch((error) => console.log("error: ", error));
      }
    },
    register: (e) => {
      const email = e.target.parentElement.querySelector("input[type=email]")
        .value;
      const password = e.target.parentElement.querySelector(
        "input[type=password]"
      ).value;
      if (password && email) {
        let form = {
          method: "POST",
          // parses: "application/json application/x-www-form-urlencoded multipart/form-data",
          body: JSON.stringify({
            email: email,
            password: password,
            // email: "root@gmail.com",
            // password: "root",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Authorization": localStorage.getItem("token"),
          },
        };
        let url = `http://localhost:8000/api/v1/register/`;
        fetch(url, form)
          .then((res) => res.json())
          .then((response) => {
            if (
              response.email[0] ===
              "This email has already registered. Choose another one, please"
            ) {
              return this.setState({
                regError:
                  "This email has already registered. Choose another one, please",
              });
            } else {
              this.setState({ redirectLogin: true });
            }
          })
          .catch((error) => console.log("error: ", error));
      }
    },
  };
  render() {
    return (
      <Context.Provider value={{ state: this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const Consumer = Context.Consumer;
export default Provider;
export { Consumer };

// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA2NTAxNDkwLCJqdGkiOiJjMzcyOTZjMzY2NTA0NmE2YWJhNTAxY2VlNTQ3OTJkZSIsInVzZXJfaWQiOjE1fQ.52r7P0TYK0LUg3ZEWW7DZ7PY_b_TPQ31to07RAztZKA"
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYwNzcxMDc5MCwianRpIjoiNmRhOWNiYjA4Y2QyNGQ0MWFhMTA1NDQ2ZDIzM2QwYTkiLCJ1c2VyX2lkIjoxNX0.vkMm9G5aae_FhAcXLFSh7u0V5PaVytm7j5IZgG7gS-0"
