import React, { FC } from "react"
import { Text, SafeAreaView } from "react-native"

import { NavigationContainer } from "@react-navigation/native"

const App: FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <Text>Boilerplate</Text>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
