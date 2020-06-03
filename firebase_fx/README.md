# Firebase Functions

The firebase functions seen here were created after following along the excellent tutorial, [Full Stack React & Firebase](https://www.youtube.com/watch?v=RkBfu-W7tt0&list=PLMhAeHCz8S38ryyeMiBPPUnFAiWnoPvWP&index=1) created by [Ahmed Hadjou](https://github.com/hidjou). 

If you're new to firebase and/or react definitely recommend consuming the tutorials: its streamlined, efficient and fast. If you want to dive into the code see the **[tutorial code here](https://github.com/hidjou/classsed-react-firebase-functions)**

Somethings to note, I encountered issues initializing my firebase SDK without passing along credentials see [functions/util/admin.js](functions/util/admin.js) line 5. The key required is a private key obtained from the project's settings page in firebase console. 

The error observed without providing credentials were along the lines of:
 `Error: Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information...`

Shout out to these stackoverflow posts:

- [Confirmed that credentials were needed ](https://stackoverflow.com/questions/58127896/error-could-not-load-the-default-credentials-firebase-function-to-firestore)
- [Showed me how to get the credentials](https://stackoverflow.com/questions/40799258/where-can-i-get-serviceaccountcredentials-json-for-firebase-admin)

To generate your own private key:

1. Navigate to https://console.firebase.google.com/
2. Click on your project
3. Navigate to Prject Settings > Service Accounts
4. Click on *Generate new private key*

The fbconfig.js file reference in [functions/util/admin.js](functions/util/admin.js) line 2 is the Firebase SDK snippet. This can be seen in your project's firebse console under the general tab of the project setting's page