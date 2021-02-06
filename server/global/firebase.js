import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAW4XYKvHlGB2n85IrI311kXrFp-S_11YM',
  authDomain: 'celenganku-app.firebaseapp.com',
  databaseURL: 'https://celenganku-app.firebaseio.com',
  projectId: 'celenganku-app',
  storageBucket: 'celenganku-app.appspot.com',
  messagingSenderId: '414105942761',
  appId: '1:414105942761:web:f68bc17372af32cf848e78',
  measurementId: 'G-QQ3YEP9ZCT',
}

const firebaseInit = firebase.initializeApp(firebaseConfig)
const db = firebaseInit.firestore()
export default db
