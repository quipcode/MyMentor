const firebase = require('firebase')

const {admin , db} = require('../util/admin')
const config = require('../util/fbconfig')

firebase.initializeApp(config)

exports.getAllUsers = (req,res) => {
    db.collection('users')
    .get()
    .then((data)=> {
        let users = [];
        data.forEach((doc)=> {
            users.push({
                userId: doc.id
            });
        });
        return res.json(users)
    })
    .catch((err)=> {
        console.error(err)
        res.status(500).json({error: err.code})
    })
}


