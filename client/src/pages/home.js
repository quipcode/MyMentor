import React from "react";
import Header from "../components/Header";
import rand from "random-key";
import { database } from "firebase";

export default class HomePage extends React.Component {
  state = {
    key: rand.generate(5),
    num: null
  };
  componentDidMount = () => {
    database()
      .ref("codesessions")
      .on("value", s => {
        this.setState({ num: s.numChildren() });
      });
  };


  onHighGround = () => {
      console.log("it's over anakin")
      database()
      .ref("codesessions/" + this.state.key)
      .set({
        content: "Happy Coding",
        createdon: Date()
      });
    this.props.history.push("/codesessions/" + this.state.key);
      // this.props.history.push("/codesession/");
  }
  render() {
    return (
      <React.Fragment>
        <Header
          extras={this.state.num ? `Total ${this.state.num}+ Shares` : null}
        />
        <div className="homepage">
          <p className="title">
            <br />
            Share Code in <span className="highlight">Realtime</span>.
            <br />
            Anywhere, Anytime, with <span className="highlight">Anyone</span>
            .
          </p>

          <p className="sub-title">
            Simple Realtime Code Sharing Editor App. Using Firebase Realtime
            Database and Ace editor as Editor.
          </p>
          
          <div>
            <button className="btn" onClick={this.onHighGround} >
              Code Editor
            </button>
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}