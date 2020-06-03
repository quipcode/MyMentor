# MyMentor 
*A platform that allows users to edit code together*

This app has been changed to utilize the Ace Editor([react-ace](https://www.npmjs.com/package/react-ace)) as opposed to [react-codemirror](https://www.npmjs.com/package/react-codemirror)

In addition, form selectors from the [Material-UI](https://material-ui.com/) library was utilized

## Roadblocks
 - A major roadblock was figuring out how and where the editors various states would be updated. Success was achieved by having the state maintained on the [codeeditor](client/src/pages/codeeditor.js) page and the state then passed to the [Editor](client/src/components/Editor.js)

## Up Next
 - Start fleshing out a backend to allow user access
