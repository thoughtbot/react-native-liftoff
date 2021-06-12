import React, {
  createContext,
  FC,
  useContext,
  useState,
  useCallback,
} from "react"

import EncryptedStorage from "./encryptedStorage"

export type User = {
  token: string
}

type AuthContextState = {
  currentUser: User | null
  setAndStoreCurrentUser: (user: User) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextState | undefined>(undefined)

interface AuthProviderProps {
  initialUser: User | null
}

export const AuthProvider: FC<AuthProviderProps> = ({
  initialUser,
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser)

  const signOut = useCallback(async (): Promise<void> => {
    setCurrentUser(null)
    EncryptedStorage.clearStorage()
  }, [])

  const setAndStoreCurrentUser = async (user: User): Promise<void> => {
    setCurrentUser(user)
    await EncryptedStorage.storeCurrentUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setAndStoreCurrentUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextState => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("AuthContext must be used with a Provider")
  }

  return context
}
