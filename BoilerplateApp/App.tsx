import React, { FC, useState, useEffect } from "react"

import EncryptedStorage from "./src/encryptedStorage"
import MainNavigator from "./src/navigation/MainNavigator"
import { AuthProvider, User } from "./src/AuthContext"

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const initCurrentUser = async (): Promise<void> => {
    const result = await EncryptedStorage.fetchCurrentUser()
    setCurrentUser(result)
  }

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      await initCurrentUser()
      setIsLoading(false)
    }
    initialize()
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <AuthProvider initialUser={currentUser}>
      <MainNavigator />
    </AuthProvider>
  )
}

export default App
