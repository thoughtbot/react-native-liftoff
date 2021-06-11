import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import TabNavigator from "./TabNavigator"
import { NavigatorRoutes } from "./routes"

const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
}

const Stack = createStackNavigator()

const AuthenticatedStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions} mode="modal">
      <Stack.Screen
        name={NavigatorRoutes.TabNavigator}
        component={TabNavigator}
      />
    </Stack.Navigator>
  )
}

export default AuthenticatedStack
