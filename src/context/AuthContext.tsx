import { createContext, useContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider, 
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
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
      if (user) {
        setUser({
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
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async () => {
    return signInWithRedirect(auth, provider)
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