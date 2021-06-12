import React, { FC } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Colors, Sizing, Outlines } from "./styles"

const LoadingIndicator: FC = () => {
  return (
    <View style={style.activityIndicatorContainer}>
      <ActivityIndicator
        size="large"
        color={Colors.neutral.s700}
        style={style.activityIndicator}
      />
    </View>
  )
}

const indicatorWidth = 100
const style = StyleSheet.create({
  activityIndicatorContainer: {
    position: "absolute",
    left: Sizing.screen.width / 2,
    top: Sizing.screen.height / 3,
    marginLeft: -(indicatorWidth / 2),
    marginTop: -(indicatorWidth / 2),
  },
  activityIndicator: {
    width: indicatorWidth,
    height: indicatorWidth,
    backgroundColor: Colors.transparent.lightGray,
    borderRadius: Outlines.borderRadius.base,
  },
})

export default LoadingIndicator
