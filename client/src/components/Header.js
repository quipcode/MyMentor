import React from "react";
import { Link } from "react-router-dom";


const Header = (props) => {
  return (
    <header style={props.style} className="App-header">
      <Link className="App-title" to="/">Realtime Code Share</Link>
      <div className="extras">{props.extras}</div>
    </header>
  );
};

export default Header;