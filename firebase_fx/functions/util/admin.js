const admin = require('firebase-admin');
const fbconfig = require('./fbconfig')

admin.initializeApp({
    credential: admin.credential.cert(require('../key/admin.json')),
    storageBucket: fbconfig.storageBucket,
})

const db = admin.firestore();

module.exports = { admin, db };