import { createContext, useContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import { auth, firestore } from '../config/firebase'
import { User } from '../types'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();
const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser (null)
      if (user && user.email.match("@.*ngorder.id|@smartseller.co.id|@.*bukalapak.com")) {
        setUser ({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          image: user.photoURL,
        })
        setDoc(doc(firestore, "users", user.uid), {
          email: user.email,
          displayName: user.displayName,
          image: user.photoURL,
        }, {
          merge: true
        });
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async () => {
    return signInWithPopup(auth, provider)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}