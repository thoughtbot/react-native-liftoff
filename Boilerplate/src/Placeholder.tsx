import React, { FC } from "react"
import { StyleSheet, Text, ScrollView, SafeAreaView } from "react-native"

import { Sizing, Typography } from "../styles"

const Placeholder: FC = () => {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
      >
        <Text style={style.text}>This is a placeholder component</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: Sizing.x20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...Typography.header.x70,
    textAlign: "center",
  },
})

export default Placeholder
