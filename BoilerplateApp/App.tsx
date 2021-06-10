import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import TabNavigator from "./src/navigation/TabNavigator"
import { NavigatorRoutes } from "./src/navigation/routes"

const Stack = createStackNavigator()

const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
}

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions} mode="modal">
        <Stack.Screen
          name={NavigatorRoutes.TabNavigator}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
