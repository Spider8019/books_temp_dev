const firebase = require('firebase-admin')

const credentials = require('./credentials.json')

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: 'https://paperpantry-e3c6e.firebaseio.com',
})

module.exports = firebase
