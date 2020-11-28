import "./Home.css";
import { Consumer } from "./Provider";

function Home({ props }) {
  const stat = props.state.statistics
  const games = props.state.games;
  return (
    <Consumer>
      {({ state }) => (
        <div className="home">
          {props.state.logged ? (
            <div className="home-inner">
              <div className="left">
                <div className="new-game-btn">
                  <button onClick={state.newGame}>new game</button>
                </div>
                <div>
                  <h3>{state.gameMessage ? state.gameMessage : null}</h3>
                  <h3>{state.gameResult ? state.gameResult : null}</h3>
                  <h3>{state.gameError ? state.gameError : null}</h3>
                </div>
                {state.game != null ? (
                  <div className={state.line != null ? `${state.line} game` : "game"}>
                    {state.game.board.map((item, i) => {
                      return (
                        <div
                          key={i}
                          onClick={(e) => {
                            state.play(e);
                          }}
                        >
                          {item === "X" || item === "O" ? (
                            <img
                              src={
                                item === "X"
                                  ? "x.png"
                                  : item === "O"
                                  ? "o.png"
                                  : null
                              }
                              alt={i}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="game" onClick={state.startnewgame}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </div>
              <div className="right">
                <div>History</div>
                {games != null ? (
                  <table>
                    <thead>
                      <tr>
                        <td>date</td>
                        <td>result</td>
                      </tr>
                    </thead>

                    <tbody>
                      {games.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td
                              onClick={() => {
                                state.watchGame(item.id);
                              }}
                            >
                              {item.created_at.split("T")[0]} -{" "}
                              {item.created_at.split("T")[1].split(".")[0]}
                            </td>
                            <td>
                              <img
                                alt="img"
                                src={
                                  item.result === 0
                                    ? "continue.png"
                                    : item.result === 1
                                    ? "win.png"
                                    : item.result === 2
                                    ? "lose.png"
                                    : item.result === -1
                                    ? "equal.png"
                                    : null
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : null}
                <div>
                  {/* {next ? ( */}
                  {props.state.previousUrl ? <span onClick={props.state.previous}>previous</span> : null}
                  {props.state.nextUrl ? <span onClick={props.state.next}>next</span> : null}
                  {/* ) : null} */}
                  {/* <a className="page-active">1</a>
              <a>2</a>
              <a>3</a> */}
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td onClick={() => {props.state.filter(1)}}>win</td>
                      <td>
                        <img alt="img" src="win.png" />
                      </td>
                      <td>{stat ? stat.win : null}</td>
                    </tr>
                    <tr>
                      <td onClick={() => {props.state.filter(2)}}>lose</td>
                      <td>
                        <img alt="img" src="lose.png" />
                      </td>
                      <td>{stat ? stat.lose : null}</td>
                    </tr>
                    <tr>
                      <td onClick={() => {props.state.filter(-1)}}>draw</td>
                      <td>
                        <img alt="img" src="equal.png" />
                      </td>
                      <td>{stat ? stat.draw : null}</td>
                    </tr>
                    <tr>
                      <td onClick={() => {props.state.filter(0)}}>continue</td>
                      <td>
                        <img alt="img" src="continue.png" />
                      </td>
                      <td>{stat ? stat.continue : null}</td>
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
