import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebase from './firebase.json'

const app = initializeApp(firebase)

export const auth = getAuth(app)
export const firestore = getFirestore(app)