import React, { FC, ReactNode, useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import { SvgXml } from "react-native-svg"

import TextField from "../TextField"
import { useAuthContext } from "../AuthContext"
import useStatusBar from "../navigation/useStatusBar"
import LoadingIndicator from "../LoadingIndicator"

import { Colors, Sizing, Buttons } from "../styles"
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

const SignUp: FC = () => {
  useStatusBar("light", Colors.primary.brand)
  const { setAndStoreCurrentUser } = useAuthContext()

  const [loading, setLoading] = useState(false)

  const initialError = ""
  const [error, setError] = useState("")

  const handleOnSignUp = async (): Promise<void> => {
    setLoading(true)

    // This is just a placeholder for simulating a loading state while the sign
    // in request runs.
    setTimeout(() => {
      setLoading(false)
      setAndStoreCurrentUser({ token: "token" })
    }, 1000)
  }

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        extraScrollHeight={-StaticSafeAreaInsets.safeAreaInsetsBottom}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleOnSignUp}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            setFieldValue,
            values,
            errors,
            isValid,
          }): ReactNode => {
            const handleOnChangeText =
              (field: string) =>
              (value: string): void => {
                setError(initialError)
                setFieldValue(field, value)
              }

            const buttonStyle = {
              ...style.button,
              ...(isValid && {
                backgroundColor: Colors.neutral.s300,
                borderColor: Colors.neutral.s300,
              }),
            }

            const handleOnSubmitEditing = (): void => {
              isValid && handleSubmit()
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
                    returnKeyType="done"
                    keyboardType="email-address"
                    errors={errors.email}
                  />
                  <TextField
                    label="Password"
                    value={values.password}
                    updateValue={handleOnChangeText("password")}
                    secureTextEntry
                    textContentType="newPassword"
                    autoCompleteType="password"
                    accessibilityLabel="Enter password"
                    returnKeyType="done"
                    onSubmitEditing={handleOnSubmitEditing}
                    errors={errors.password}
                    noMarginBottom
                  />
                </View>
                <Text style={style.errorText}>{error}</Text>
                <Pressable
                  style={Buttons.applyOpacity(buttonStyle)}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  accessibilityState={{ disabled: !isValid }}
                  accessibilityRole="button"
                >
                  <Text style={style.buttonText}>Sign Up</Text>
                </Pressable>
              </>
            )
          }}
        </Formik>
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
  button: {
    ...Buttons.bar.primary,
  },
  buttonText: {
    ...Buttons.barText.primary,
  },
  errorText: {
    color: Colors.danger.s400,
    marginBottom: Sizing.x20,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Sizing.x20,
  },
})

export default SignUp
