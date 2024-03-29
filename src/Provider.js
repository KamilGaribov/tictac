import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const Context = React.createContext();

class Provider extends Component {
  state = {
    logError: null,
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
      this.setState({ game: null });
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
            this.setState( {gameMessage: null})
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
            this.setState( {gameMessage: null})
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
            this.setState( {gameMessage: null})
            this.setState({ line: null });
          } else {
            this.setState({ gamePlayed: response.board });
            this.setState({ line: null });
            this.setState( {gameMessage: "Game continues"})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    startnewgame: () => {
      console.log("statenewgame");
      this.setState({ gameError: "Start new game" });
    },
    play: (e, func) => {
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
            this.setState( {gameMessage: null})
            func()
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
          } else if (response.result_code === 2) {
            this.setState({ gameResult: "Computer win" });
            this.setState( {gameMessage: null})
            func()
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
          } else if (response.result_code === -1) {
            this.setState({ gameResult: "Draw" });
            this.setState( {gameMessage: null})
            func()
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
          this.setState({ gameMessage: `Game started` });
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
        this.setState({ redirectLogin: false });
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
      this.setState({ gameError: null });
      this.setState({ gameResult: null });
      this.setState({ gameMessage: null });
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
              this.setState({ logError: "An error occured" });
              console.log("error");
            }
          })
          .catch((error) => {
            this.setState({ logError: "An error occured" });
          });
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
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
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
