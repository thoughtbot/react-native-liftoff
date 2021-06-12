import EncryptedStorage from "react-native-encrypted-storage"

import { User } from "./AuthContext"

const USER_STORAGE_KEY = "userStorageKey"

const storeCurrentUser = async (user: User): Promise<void> => {
  const stringifiedUser = JSON.stringify(user)
  await EncryptedStorage.setItem(USER_STORAGE_KEY, stringifiedUser)
}

const fetchCurrentUser = async (): Promise<User | null> => {
  const stringifiedUser = await EncryptedStorage.getItem(USER_STORAGE_KEY)

  return stringifiedUser ? JSON.parse(stringifiedUser) : null
}

const clearStorage = async (): Promise<void> => {
  await EncryptedStorage.clear()
}

export default { storeCurrentUser, fetchCurrentUser, clearStorage }
