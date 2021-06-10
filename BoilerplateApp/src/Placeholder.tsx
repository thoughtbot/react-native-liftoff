import React, { FC } from "react"
import { StyleSheet, Text, ScrollView, SafeAreaView } from "react-native"

import Icon from "react-native-vector-icons/Feather"
import { Sizing, Typography } from "./styles"

const Placeholder: FC = () => {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
      >
        <Icon name="smile" size={Sizing.icons.x40} style={style.icon} />
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
    ...Typography.bold.x70,
    textAlign: "center",
  },
  icon: {
    marginBottom: Sizing.x30,
  },
})

export default Placeholder
