import React, { FC } from "react"
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import { useAuthContext } from "../AuthContext"
import AuthenticatedStack from "./AuthenticatedStack"
import UnauthenticatedStack from "./UnauthenticatedStack"

const Stack = createStackNavigator()

const defaultScreenOptions = {
  headerShown: false,
  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
  gestureEnabled: false,
}

const MainNavigator: FC = () => {
  const { currentUser } = useAuthContext()

  const unauthenticatedStack = (
    <Stack.Screen
      name="UnauthenticatedStack"
      component={UnauthenticatedStack}
      options={{
        animationTypeForReplace: "pop",
      }}
    />
  )

  const authenticatedStack = (
    <Stack.Screen name="AuthenticatedStack" component={AuthenticatedStack} />
  )

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultScreenOptions} mode="modal">
        {currentUser ? authenticatedStack : unauthenticatedStack}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
