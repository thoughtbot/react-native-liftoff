import React, { FC, useRef, ReactNode, useState } from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import TextField from "../TextField"
import { useAuthContext } from "../AuthContext"
import useStatusBar from "../navigation/useStatusBar"
import { UnauthenticatedRoutes } from "../navigation/routes"
import LoadingIndicator from "../LoadingIndicator"

import { Colors, Forms, Sizing, Buttons } from "../styles"
import Logo from "../assets/Logo"

type FormValues = {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
})

const SignIn: FC = () => {
  useStatusBar("dark", Colors.neutral.white)
  const navigation = useNavigation()
  const { setAndStoreCurrentUser } = useAuthContext()

  const [loading, setLoading] = useState(false)

  const initialError = ""
  const [error, setError] = useState("")

  const passwordInputRef = useRef<TextInput>(null)

  const handleOnSignIn = async (): Promise<void> => {
    setLoading(true)

    // This is just a placeholder for simulating a loading state while the sign
    // in request runs.
    setTimeout(() => {
      setLoading(false)
      setAndStoreCurrentUser({ token: "token" })
    }, 1000)
  }

  const handleOnSubmitEmail = (): void => {
    passwordInputRef.current?.focus()
  }

  const handleOnPressSignUp = (): void => {
    navigation.navigate(UnauthenticatedRoutes.SignUp)
  }

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
        extraScrollHeight={-StaticSafeAreaInsets.safeAreaInsetsBottom}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleOnSignIn}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, setFieldValue, values, errors }): ReactNode => {
            const handleOnChangeText =
              (field: string) =>
              (value: string): void => {
                setError(initialError)
                setFieldValue(field, value)
              }
            return (
              <>
                <View style={style.inputsContainer}>
                  <View style={style.logoContainer}>
                    <SvgXml xml={Logo} height="200" width="300" />
                  </View>
                  <TextField
                    label="Email"
                    value={values.email}
                    updateValue={handleOnChangeText("email")}
                    autoCapitalize="none"
                    accessibilityLabel="Enter email"
                    textContentType="username"
                    autoCompleteType="email"
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="email-address"
                    onSubmitEditing={handleOnSubmitEmail}
                    style={style.input}
                    errors={errors.email}
                  />
                  <TextField
                    label="Password"
                    value={values.password}
                    updateValue={handleOnChangeText("password")}
                    secureTextEntry
                    textContentType="password"
                    autoCompleteType="password"
                    accessibilityLabel="Enter password"
                    returnKeyType="done"
                    ref={passwordInputRef}
                    onSubmitEditing={handleSubmit}
                    style={style.input}
                    errors={errors.password}
                  />
                </View>
                <Text style={style.errorText}>{error}</Text>
                <Pressable
                  style={Buttons.applyOpacity(style.button)}
                  onPress={handleSubmit}
                  accessibilityRole="button"
                >
                  <Text style={style.buttonText}>Sign In</Text>
                </Pressable>
              </>
            )
          }}
        </Formik>
        <Pressable
          style={Buttons.applyOpacity(style.secondaryButton)}
          onPress={handleOnPressSignUp}
          accessibilityRole="button"
        >
          <Text style={style.secondaryButtonText}>Sign Up</Text>
        </Pressable>
      </KeyboardAwareScrollView>
      {loading && <LoadingIndicator />}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.neutral.white,
    justifyContent: "space-between",
    paddingTop: Sizing.x20,
    paddingHorizontal: Sizing.x20,
    paddingBottom: Sizing.x70,
  },
  inputsContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    ...Forms.input.primary,
  },
  button: {
    ...Buttons.bar.primary,
    marginBottom: Sizing.x10,
  },
  buttonText: {
    ...Buttons.barText.primary,
  },
  secondaryButton: {
    ...Buttons.bar.secondary,
  },
  secondaryButtonText: {
    ...Buttons.barText.secondary,
  },
  errorText: {
    color: Colors.danger.s400,
    marginBottom: Sizing.x20,
    minHeight: Sizing.x50,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Sizing.x20,
  },
})

export default SignIn
