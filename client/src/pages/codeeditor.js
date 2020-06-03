import React, { Component } from 'react';
import CodeEditor from "../components/Editor";
import { database } from "firebase";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

export default class CodeEditorPage extends Component {
  constructor() {
    super();
    this.copy = this.copy.bind(this);
    this.state = {
      name: 'React',
      theme: "monokai",
      mode: "javascript",
      value: "Loading...",
      fontSize: 16,
      wordWrap: false,
      enableLiveAutocompletion: false,
      code: "Loading...",
      cursorPosition: {
        line: 0,
        ch: 0
      },
      copySuccess: '',
      tooltipIsOpen: false,
      sliders: [50, 50],
      slide: 50
    };
  }

  componentDidMount = () => {
    const { params } = this.props.match;
    let self = this;
    console.log("in mount", self)
    database()
      .ref("/codesessions/" + params.sessionid)
      .once("value")
      .then(snapshot => {
        console.log(snapshot, "snapshot here")
        self.setState({ code: snapshot.val().content + "", createdon: snapshot.val().createdon });
        console.log("in staters" , this, snapshot )
        this.codeRef = database().ref("codesessions/" + params.sessionid);
        this.codeRef.on("value", function(snapshot) {
          self.setState({
            value: snapshot.val().content
          });
        });
      })
      .catch(e => {
        self.setState({
          value: "Something went wrong"
        })
      });
  };



  changeTheme(theme) {
    this.setState({theme})
  }

  changeMode(mode) {
    this.setState({mode});
  }
  changeFontsize= (val) => {
      this.setState({fontSize: val})
  }
 

  changeWordwrap(wordWrap){
      this.setState({wordWrap})
  }
 
  changeAutocomplete(enableLiveAutocompletion){
    this.setState({enableLiveAutocompletion})    
  }
  
  onChange = (value) => {
    this.setState({value})
    this.codeRef.child("content").set(value);
  }
  copy() {
    this.elRef.select();
    document.execCommand("copy");
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
    this.setTooltipIsOpen(true)
  };
  setTooltipIsOpen = (val) =>{
    this.setState({ tooltipIsOpen: val });
  }

  


  render() {
    
    return (
      <div className="container">
        <FormControl variant="filled" >
          <InputLabel id="demo-simple-select-filled-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={this.state.mode}
            onChange={(e) => this.changeMode(e.target.value)}
          >
          <MenuItem value="abap">ABAP</MenuItem>
          <MenuItem value="abc">ABC</MenuItem>
          <MenuItem value="actionscript">ActionScript</MenuItem>
          <MenuItem value="ada">ADA</MenuItem>
          <MenuItem value="apache_conf">Apache Conf</MenuItem>
          <MenuItem value="asciidoc">AsciiDoc</MenuItem>
          <MenuItem value="assembly_x86">Assembly x86</MenuItem>
          <MenuItem value="autohotkey">AutoHotKey</MenuItem>
          <MenuItem value="batchfile">BatchFile</MenuItem>
          <MenuItem value="bro">Bro</MenuItem>
          <MenuItem value="c_cpp">C and C++</MenuItem>
          <MenuItem value="c9search">C9Search</MenuItem>
          <MenuItem value="cirru">Cirru</MenuItem>
          <MenuItem value="clojure">Clojure</MenuItem>
          <MenuItem value="cobol">Cobol</MenuItem>
          <MenuItem value="coffee">CoffeeScript</MenuItem>
          <MenuItem value="coldfusion">ColdFusion</MenuItem>
          <MenuItem value="csharp">C#</MenuItem>
          <MenuItem value="css">CSS</MenuItem>
          <MenuItem value="curly">Curly</MenuItem>
          <MenuItem value="d">D</MenuItem>
          <MenuItem value="dart">Dart</MenuItem>
          <MenuItem value="diff">Diff</MenuItem>
          <MenuItem value="dockerfile">Dockerfile</MenuItem>
          <MenuItem value="dot">Dot</MenuItem>
          <MenuItem value="drools">Drools</MenuItem>
          <MenuItem value="eiffel">Eiffel</MenuItem>
          <MenuItem value="ejs">EJS</MenuItem>
          <MenuItem value="elixir">Elixir</MenuItem>
          <MenuItem value="elm">Elm</MenuItem>
          <MenuItem value="erlang">Erlang</MenuItem>
          <MenuItem value="forth">Forth</MenuItem>
          <MenuItem value="fortran">Fortran</MenuItem>
          <MenuItem value="ftl">FreeMarker</MenuItem>
          <MenuItem value="gcode">Gcode</MenuItem>
          <MenuItem value="gherkin">Gherkin</MenuItem>
          <MenuItem value="gitignore">Gitignore</MenuItem>
          <MenuItem value="glsl">Glsl</MenuItem>
          <MenuItem value="gobstones">Gobstones</MenuItem>
          <MenuItem value="golang">Go</MenuItem>
          <MenuItem value="groovy">Groovy</MenuItem>
          <MenuItem value="haml">HAML</MenuItem>
          <MenuItem value="handlebars">Handlebars</MenuItem>
          <MenuItem value="haskell">Haskell</MenuItem>
          <MenuItem value="haskell_cabal">Haskell Cabal</MenuItem>
          <MenuItem value="haxe">haXe</MenuItem>
          <MenuItem value="hjson">Hjson</MenuItem>
          <MenuItem value="html">HTML</MenuItem>
          <MenuItem value="html_elixir">HTML (Elixir)</MenuItem>
          <MenuItem value="html_ruby">HTML (Ruby)</MenuItem>
          <MenuItem value="ini">INI</MenuItem>
          <MenuItem value="io">Io</MenuItem>
          <MenuItem value="jack">Jack</MenuItem>
          <MenuItem value="jade">Jade</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="json">JSON</MenuItem>
          <MenuItem value="jsoniq">JSONiq</MenuItem>
          <MenuItem value="jsp">JSP</MenuItem>
          <MenuItem value="jsx">JSX</MenuItem>
          <MenuItem value="julia">Julia</MenuItem>
          <MenuItem value="kotlin">Kotlin</MenuItem>
          <MenuItem value="latex">LaTeX</MenuItem>
          <MenuItem value="less">LESS</MenuItem>
          <MenuItem value="liquid">Liquid</MenuItem>
          <MenuItem value="lisp">Lisp</MenuItem>
          <MenuItem value="livescript">LiveScript</MenuItem>
          <MenuItem value="logiql">LogiQL</MenuItem>
          <MenuItem value="lsl">LSL</MenuItem>
          <MenuItem value="lua">Lua</MenuItem>
          <MenuItem value="luapage">LuaPage</MenuItem>
          <MenuItem value="lucene">Lucene</MenuItem>
          <MenuItem value="makefile">Makefile</MenuItem>
          <MenuItem value="markdown">Markdown</MenuItem>
          <MenuItem value="mask">Mask</MenuItem>
          <MenuItem value="matlab">MATLAB</MenuItem>
          <MenuItem value="maze">Maze</MenuItem>
          <MenuItem value="mel">MEL</MenuItem>
          <MenuItem value="mushcode">MUSHCode</MenuItem>
          <MenuItem value="mysql">MySQL</MenuItem>
          <MenuItem value="nix">Nix</MenuItem>
          <MenuItem value="nsis">NSIS</MenuItem>
          <MenuItem value="objectivec">Objective-C</MenuItem>
          <MenuItem value="ocaml">OCaml</MenuItem>
          <MenuItem value="pascal">Pascal</MenuItem>
          <MenuItem value="perl">Perl</MenuItem>
          <MenuItem value="pgsql">pgSQL</MenuItem>
          <MenuItem value="php">PHP</MenuItem>
          <MenuItem value="powershell">Powershell</MenuItem>
          <MenuItem value="praat">Praat</MenuItem>
          <MenuItem value="prolog">Prolog</MenuItem>
          <MenuItem value="properties">Properties</MenuItem>
          <MenuItem value="protobuf">Protobuf</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="r">R</MenuItem>
          <MenuItem value="razor">Razor</MenuItem>
          <MenuItem value="rdoc">RDoc</MenuItem>
          <MenuItem value="rhtml">RHTML</MenuItem>
          <MenuItem value="rst">RST</MenuItem>
          <MenuItem value="ruby">Ruby</MenuItem>
          <MenuItem value="rust">Rust</MenuItem>
          <MenuItem value="sass">SASS</MenuItem>
          <MenuItem value="scad">SCAD</MenuItem>
          <MenuItem value="scala">Scala</MenuItem>
          <MenuItem value="scheme">Scheme</MenuItem>
          <MenuItem value="scss">SCSS</MenuItem>
          <MenuItem value="sh">SH</MenuItem>
          <MenuItem value="sjs">SJS</MenuItem>
          <MenuItem value="smarty">Smarty</MenuItem>
          <MenuItem value="snippets">snippets</MenuItem>
          <MenuItem value="soy_template">Soy Template</MenuItem>
          <MenuItem value="space">Space</MenuItem>
          <MenuItem value="sql">SQL</MenuItem>
          <MenuItem value="sqlserver">SQLServer</MenuItem>
          <MenuItem value="stylus">Stylus</MenuItem>
          <MenuItem value="svg">SVG</MenuItem>
          <MenuItem value="swift">Swift</MenuItem>
          <MenuItem value="tcl">Tcl</MenuItem>
          <MenuItem value="tex">Tex</MenuItem>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="textile">Textile</MenuItem>
          <MenuItem value="toml">Toml</MenuItem>
          <MenuItem value="tsx">TSX</MenuItem>
          <MenuItem value="twig">Twig</MenuItem>
          <MenuItem value="typescript">Typescript</MenuItem>
          <MenuItem value="vala">Vala</MenuItem>
          <MenuItem value="vbscript">VBScript</MenuItem>
          <MenuItem value="velocity">Velocity</MenuItem>
          <MenuItem value="verilog">Verilog</MenuItem>
          <MenuItem value="vhdl">VHDL</MenuItem>
          <MenuItem value="wollok">Wollok</MenuItem>
          <MenuItem value="xml">XML</MenuItem>
          <MenuItem value="xquery">XQuery</MenuItem>
          <MenuItem value="yaml">YAML</MenuItem>
          <MenuItem value="django">Django</MenuItem>
        </Select>
      </FormControl>
        
        <FormControl variant="filled" >
          <InputLabel id="demo-simple-select-filled-label">Theme</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={this.state.theme}
            onChange={(e) => this.changeTheme(e.target.value)}
          >
            <ListSubheader  disableSticky={true} color='primary'> Light</ListSubheader>
            <MenuItem value="chrome">Chrome</MenuItem>
            <MenuItem value="clouds">Clouds</MenuItem>
            <MenuItem value="crimson_editor">Crimson Editor</MenuItem>
            <MenuItem value="dawn">Dawn</MenuItem>
            <MenuItem value="dreamweaver">Dreamweaver</MenuItem>
            <MenuItem value="eclipse">Eclipse</MenuItem>
            <MenuItem value="github">GitHub</MenuItem>
            <MenuItem value="iplastic">IPlastic</MenuItem>
            <MenuItem value="solarized_light">Solarized Light</MenuItem>
            <MenuItem value="textmate">TextMate</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
            <MenuItem value="xcode">XCode</MenuItem>
            <MenuItem value="kuroir">Kuroir</MenuItem>
            <MenuItem value="katzenmilch">KatzenMilch</MenuItem>
            <MenuItem value="sqlserver">SQL Server</MenuItem>

            <ListSubheader disableSticky={true} color='primary'>Dark</ListSubheader>

            <MenuItem value="ambiance">Ambiance</MenuItem>
            <MenuItem value="chaos">Chaos</MenuItem>
            <MenuItem value="clouds_midnight">Clouds Midnight</MenuItem>
            <MenuItem value="cobalt">Cobalt</MenuItem>
            <MenuItem value="dracula">Dracula</MenuItem>
            <MenuItem value="gob">Gob</MenuItem>
            <MenuItem value="gruvbox">Gruvbox</MenuItem>
            <MenuItem value="idle_fingers">idle Fingers</MenuItem>
            <MenuItem value="kr_theme">krTheme</MenuItem>
            <MenuItem value="merbivore">Merbivore</MenuItem>
            <MenuItem value="merbivore_soft">Merbivore Soft</MenuItem>
            <MenuItem value="mono_industrial">Mono Industrial</MenuItem>
            <MenuItem value="monokai">Monokai</MenuItem>
            <MenuItem value="pastel_on_dark">Pastel on dark</MenuItem>
            <MenuItem value="solarized_dark">Solarized Dark</MenuItem>
            <MenuItem value="terminal">Terminal</MenuItem>
            <MenuItem value="tomorrow_night">Tomorrow Night</MenuItem>
            <MenuItem value="tomorrow_night_blue">Tomorrow Night Blue</MenuItem>
            <MenuItem value="tomorrow_night_bright">Tomorrow Night Bright</MenuItem>
            <MenuItem value="tomorrow_night_eighties">Tomorrow Night 80s</MenuItem>
            <MenuItem value="twilight">Twilight</MenuItem>
            <MenuItem value="vibrant_ink">Vibrant Ink</MenuItem>
          </Select>
        </FormControl>

      <Typography id="label">Font Size</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <p> 12</p>
          </Grid>
          <Grid item xs>
          <Slider
            min={12}
            max={50}
            value={this.state.fontSize}
            aria-labelledby="label"
            onChange={(event, value) => this.changeFontsize(value)}
          />
          </Grid>
          <Grid item>
            <p> 50</p>
          </Grid>
        </Grid>

        <FormControlLabel
          labelPlacement="start"
          control={
            <Checkbox
              checked={this.state.wordWrap}
              onChange={(e) => this.changeWordwrap(!this.state.wordWrap)}
              name="wordwrap"
              color="primary"
            />
          }
          label="Word Wrap"
        />


        <FormControlLabel
          labelPlacement="start"
          control={
            <Checkbox
              checked={this.state.enableLiveAutocompletion}
              onChange={(e) => this.changeAutocomplete(!this.state.enableLiveAutocompletion)}
              name="enableLiveAutocompletion"
              color="primary"
            />
          }
          label="Auto Complete:"
        />

        <ClickAwayListener onClickAway={() => this.setTooltipIsOpen(false)}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={() => this.setTooltipIsOpen(false)}
            open={this.state.tooltipIsOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement='top'
            title={`Copied ${this.props.match.url.split("/")[2]}`}
          >
            <Button onClick={(e) => this.copyToClipboard(e)} variant="contained">Share code session</Button>
          </Tooltip>
        </ClickAwayListener>
        
        <TextField id="filled-basic" inputProps={{readOnly:true}} value={this.props.match.url.split("/")[2]} readOnly  inputRef={(textarea) => this.textArea = textarea}/>
        <CodeEditor 
            mode={this.state.mode} 
            theme={this.state.theme} 
            onChange={this.onChange} 
            value={this.state.value}
            fontSize={+this.state.fontSize <= 0 ? 1 : +this.state.fontSize}
            wordWrap={this.state.wordWrap}
            enableLiveAutocompletion={this.state.enableLiveAutocompletion}
            optionSetter = {this.state.optionSet}
        />
    </div>
    );
  }
}




