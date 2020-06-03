import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import { HomePage, CodeEditorPage } from "./pages";
// import AppRouter from './App.router'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          {/* <AppRouter /> */}
          <Route exact path="/" component={HomePage} />
          <Route path="/codesessions/:sessionid" component={CodeEditorPage}/>
        </div>
      </Router>
    );
  }
}

export default App;