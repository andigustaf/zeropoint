import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbDqPM80e74I8qkRavtb4aABzt_g3DmjY",
  authDomain: "zeropoint-226b9.firebaseapp.com",
  databaseURL: "https://zeropoint-226b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zeropoint-226b9",
  storageBucket: "zeropoint-226b9.appspot.com",
  messagingSenderId: "379212878726",
  appId: "1:379212878726:web:53e9d1e97c8cebedb39207",
  measurementId: "G-P2KZ10HHQ8"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const firestore = getFirestore(app);