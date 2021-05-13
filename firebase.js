import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyAw9ya5Qipojih5VSII74nDqJ7N1ap9VUc',
    authDomain: 'discord-clone-507c4.firebaseapp.com',
    projectId: 'discord-clone-507c4',
    storageBucket: 'discord-clone-507c4.appspot.com',
    messagingSenderId: '974457055854',
    appId: '1:974457055854:web:a56f4d4e9c50b339d9147f',
}

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, db }
