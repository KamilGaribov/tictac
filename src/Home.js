import "./Home.css";
import { Consumer } from "./Provider";

function Home({ props }) {
  return (
    <Consumer>
      {({ state }) => (
        <div className="home">
          {props.state.logged ? (
            <div className="home-inner">
              <div className="left">
                <div className="new-game-btn">
                  <button>new game</button>
                </div>
                <div className="game">
                  <div>
                    <img alt="img" src="x.png" />
                  </div>
                  <div>
                    <img alt="img" src="o.png" />
                  </div>
                  <div></div>
                  <div></div>
                  <div>
                    <img alt="img" src="o.png" />
                  </div>
                  <div></div>
                  <div>
                    <img alt="img" src="x.png" />
                  </div>
                  <div>
                    <img alt="img" src="x.png" />
                  </div>
                  <div>
                    <img alt="img" src="x.png" />
                  </div>
                </div>
              </div>
              <div className="right">
                <div>History</div>
                <table>
                  <thead>
                    <tr>
                      <td>date</td>
                      <td>result</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>28.11.2020</td>
                      <td>
                        <img alt="img" src="win.png" />
                      </td>
                    </tr>
                    <tr>
                      <td>28.11.2020</td>
                      <td>
                        <img alt="img" src="lose.png" />
                      </td>
                    </tr>
                    <tr>
                      <td>28.11.2020</td>
                      <td>
                        <img alt="img" src="equal.png" />
                      </td>
                    </tr>
                    <tr>
                      <td>28.11.2020</td>
                      <td>
                        <img alt="img" src="continue.png" />
                      </td>
                    </tr>
                    <tr>
                      <td>28.11.2020</td>
                      <td>
                        <img alt="img" src="win.png" />
                      </td>
                    </tr>
                    <tr>
                      <td>28.11.2020</td>
                      <td>
                        <img alt="img" src="lose.png" />
                      </td>
                    </tr>
                    <tr>
                      <td>28.11.2020</td>
                      <td>
                        <img alt="img" src="win.png" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  {/* <a className="page-active">1</a>
              <a>2</a>
              <a>3</a> */}
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>win</td>
                      <td>
                        <img alt="img" src="win.png" />
                      </td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>lose</td>
                      <td>
                        <img alt="img" src="lose.png" />
                      </td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>draw</td>
                      <td>
                        <img alt="img" src="equal.png" />
                      </td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>continue</td>
                      <td>
                        <img alt="img" src="continue.png" />
                      </td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1>You must logged in</h1>
          )}
        </div>
      )}
    </Consumer>
  );
}

export default Home;
