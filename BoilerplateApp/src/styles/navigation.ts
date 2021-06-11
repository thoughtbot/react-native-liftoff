import { StackNavigationOptions } from "@react-navigation/stack"

import * as Colors from "./colors"

type Header = "base"
export const header: Record<Header, Partial<StackNavigationOptions>> = {
  base: {
    headerStyle: {
      shadowColor: Colors.transparent.clear,
      backgroundColor: Colors.primary.brand,
    },
    headerTintColor: Colors.neutral.white,
    headerTitleAllowFontScaling: false,
  },
}
