const functions = require('firebase-functions');
const app = require('express')();

const {db} = require('./util/admin')

const  {getAllUsers} = require('./handlers/users')

app.get('/users', getAllUsers);


exports.api = functions.https.onRequest(app);