import React, { FC } from "react"
import { StyleSheet, Text } from "react-native"
import { FormikErrors } from "formik"

import { Colors, Sizing } from "./styles"

interface FieldErrorsProps {
  errors: FormikErrors<Date> | string | undefined
}

const FieldErrors: FC<FieldErrorsProps> = ({ errors }) => {
  return <Text style={style.errorText}>{errors || " "}</Text>
}

const style = StyleSheet.create({
  errorText: {
    marginTop: Sizing.x5,
    color: Colors.danger.s400,
  },
})

export default FieldErrors
