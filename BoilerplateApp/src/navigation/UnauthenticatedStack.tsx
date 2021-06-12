import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import SignIn from "../Auth/SignIn"
import SignUp from "../Auth/SignUp"
import { UnauthenticatedRoutes } from "./routes"

import { Navigation } from "../styles"

const Stack = createStackNavigator()

const UnauthenticatedStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={UnauthenticatedRoutes.SignIn}
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={UnauthenticatedRoutes.SignUp}
        component={SignUp}
        options={{
          ...Navigation.header.base,
          title: "Sign Up",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default UnauthenticatedStack
