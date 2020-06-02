At this time this is a simple real-time editor. This was built following the 3-part [tutorial](https://medium.com/@syedsaadh/real-time-code-sharing-application-using-react-and-firebase-part-1-4697483ae3ff) provided by [Saad Hassan](https://medium.com/@syedsaadh) on medium

To note there were a few changes needed to make to make the app operational:

- Grant all anonymous users read/write access to the realtime firebase db

    1. Navigate to [Firbase console](https://console.firebase.google.com)
    2. Click on the project
    3. Navigate to Database > Realtime Database > Rules
    4. Update rules as follows
        
        `"rules": {
            ".read": true,
            ".write": true
        }`
        
- Remove the type aliases defined in the Header component. Header component goes from this
    
        import React from "react";
        import { Link } from "react-router-dom";
        type Props = {
            style: React.CSSProperties,
            extras: React.ReactHTML
        };
        const Header = (props: Props) => {
        return (
            <header style={props.style} className="App-header">
            <Link className="App-title" to="/">Realtime Code Share</Link>
            <div className="extras">{props.extras}</div>
            </header>
        )};
        export default Header;

    to this

            import React from "react";
            const Header = (props) => {
            return (
                <header style={props.style} className="App-header">
                <Link className="App-title" to="/">Realtime Code Share</Link>
                <div className="extras">{props.extras}</div>
                </header>
            )};            
            export default Header;
