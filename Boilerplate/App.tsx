import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"

import Placeholder from "./src/Placeholder"

const App: FC = () => {
  return (
    <NavigationContainer>
      <Placeholder />
    </NavigationContainer>
  )
}

export default App
