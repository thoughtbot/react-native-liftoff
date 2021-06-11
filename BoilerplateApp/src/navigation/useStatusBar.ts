import { useCallback } from "react"
import { StatusBar, StatusBarStyle, Platform, ColorValue } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

type ContentStyle = "light" | "dark"

const useStatusBar = (
  contentStyle: ContentStyle,
  backgroundColor: ColorValue,
): void => {
  const toStatusBarStyle = (contentStyle: ContentStyle): StatusBarStyle => {
    switch (contentStyle) {
      case "dark": {
        return "dark-content"
      }
      case "light": {
        return "light-content"
      }
    }
  }

  const statusBarStyle = toStatusBarStyle(contentStyle)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(statusBarStyle)
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(backgroundColor)
      }
    }, [statusBarStyle, backgroundColor]),
  )
}

export default useStatusBar
