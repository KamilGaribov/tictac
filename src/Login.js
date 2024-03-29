import "./Registration.css";
import { Consumer } from "./Provider";

export default function Login({ props }) {
  return (
    <Consumer>
      {({ state }) => (
        <div className="registration">
          <form>
            <h3>Login</h3>
            {state.logError ? (<span>{state.logError}</span>) : null}
            <input name="email" placeholder="email" type="email" />
            <input name="password" placeholder="password" type="password" />
            {state.renderRedirectHome()}
            <button
              type="button"
              onClick={(e) => state.login(e, props.state.setLogged)}
            >
              login
            </button>
          </form>
        </div>
      )}
    </Consumer>
  );
}
