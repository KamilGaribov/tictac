import "./Registration.css";
import { Consumer } from "./Provider";

export default function Registration() {
  return (
    <Consumer>
      {({ state }) => (
        <div className="registration">
          <form>
            <h3>Registration</h3>
            <input name="email" placeholder="email" type="email" />
            <input name="password" placeholder="password" type="password" />
            {state.renderRedirectLogin()}
            <button type="button" onClick={state.register}>
              register
            </button>
          </form>
        </div>
      )}
    </Consumer>
  );
}
