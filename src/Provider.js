import React, { Component } from "react";
import {Redirect } from "react-router-dom";


const Context = React.createContext();

class Provider extends Component {
  state = {
    redirectLogin: false,
    renderRedirectLogin: () => {
      if (this.state.redirectLogin) {
        return <Redirect to='/login' />
      }
    },
    redirectHome: false,
    renderRedirectHome: () => {
      if (this.state.redirectHome) {
        return <Redirect to='/' />
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
        let url = `http://localhost:8000/api/v1/auth/`;
        fetch(url, form)
          .then((res) => res.json())
          .then((response) => {
            if(response.access){
              localStorage.setItem("username", email);
              localStorage.setItem("access_token", response.access)
              localStorage.setItem("refresh_token", response.refresh)
              func(email)
              this.setState({redirectHome: true})
            }
            else{
              console.log("error")
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
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Authentication": "JWT hda5da7sd6as8d"
          },
        };
        let url = `http://localhost:8000/api/v1/register/`;
        fetch(url, form)
          .then((res) => res.json())
          .then((response) => {
            if(response.id){
              this.setState({redirectLogin: true})
            }
            else{
              console.log("error")
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