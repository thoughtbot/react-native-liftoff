import React, { FC, ReactNode } from "react"
import { Text, Pressable, View, StyleSheet } from "react-native"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { TabLabels, TabRoutes, TabRoute } from "../navigation/routes"
import Placeholder from "../Placeholder"

import Icon from "react-native-vector-icons/Feather"
import { Colors, Sizing, Outlines, Typography, Buttons } from "../styles"

type TabButtonConfig = {
  label: string
  iconName: string
}

const determineConfig = (tab: Tab): TabButtonConfig => {
  switch (tab.name) {
    case "Tab1": {
      return {
        label: TabLabels.Tab1,
        iconName: "hexagon",
      }
    }
    case "Tab2": {
      return {
        label: TabLabels.Tab2,
        iconName: "square",
      }
    }
    case "Tab3": {
      return {
        label: TabLabels.Tab3,
        iconName: "triangle",
      }
    }
  }
}

type Tab = {
  name: TabRoute
  component: FC
}

const TabNavigator: FC = () => {
  const documentsTab = {
    name: TabRoutes.Tab1,
    component: Placeholder,
  }
  const shareTab = {
    name: TabRoutes.Tab2,
    component: Placeholder,
  }
  const settingsTab = {
    name: TabRoutes.Tab3,
    component: Placeholder,
  }

  const tabs = [documentsTab, shareTab, settingsTab]

  const TabNavigator = createBottomTabNavigator()

  return (
    <TabNavigator.Navigator
      tabBar={(props): ReactNode => <TabBar {...props} tabs={tabs} />}
    >
      {tabs.map(({ name, component }) => {
        return (
          <TabNavigator.Screen name={name} component={component} key={name} />
        )
      })}
    </TabNavigator.Navigator>
  )
}

type TabBarProps = BottomTabBarProps & { tabs: Tab[] }

const TabBar: FC<TabBarProps> = ({
  state,
  navigation: tabNavigation,
  tabs,
}) => {
  const stackNavigation =
    useNavigation<StackNavigationProp<{ undefined: undefined }>>()

  const toTabButton = (tab: Tab, index: number): ReactNode => {
    const focusedRouteName = state.routeNames[state.index]

    const isTabFocused = (tab: Tab): boolean => {
      return tab.name === focusedRouteName
    }

    const currentRoute = state.routes.find(
      (route) => route.name === focusedRouteName,
    )

    const indexInCurrentRoute = currentRoute?.state?.index

    const isOnRootOfCurrentRoute =
      indexInCurrentRoute === 0 || indexInCurrentRoute === undefined

    const isFocused = isTabFocused(tab)

    const handleOnPress = (): void => {
      if (!isFocused) {
        tabNavigation.navigate(tab.name)
      } else if (!isOnRootOfCurrentRoute) {
        stackNavigation.popToTop()
      }
    }

    const textColor = isFocused ? Colors.primary.brand : Colors.neutral.black

    const { label, iconName } = determineConfig(tab)
    const widthScaleFactor = 0.9

    const tabButtonStyle = {
      ...style.tabButton,
      width: (Sizing.screen.width / tabs.length) * widthScaleFactor,
    }

    return (
      <Pressable
        onPress={handleOnPress}
        style={Buttons.applyOpacity(tabButtonStyle)}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        key={index}
        testID={`${label}Tab`}
      >
        <TabIcon isFocused={isFocused} iconName={iconName} />
        <Text
          allowFontScaling={false}
          numberOfLines={2}
          ellipsizeMode="middle"
          style={{ ...style.tabLabelText, color: textColor }}
        >
          {label}
        </Text>
      </Pressable>
    )
  }

  return <View style={style.tabBarContainer}>{tabs.map(toTabButton)}</View>
}

interface TabIconProps {
  isFocused: boolean
  iconName: string
}

const TabIcon: FC<TabIconProps> = ({ isFocused, iconName }) => {
  const iconSize = 22

  return (
    <View style={style.tabIconContainer}>
      <Icon
        name={iconName}
        color={isFocused ? Colors.primary.brand : Colors.neutral.black}
        size={iconSize}
      />
    </View>
  )
}

const style = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Sizing.x10,
    paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom + Sizing.x10,
    paddingHorizontal: Sizing.x10,
    backgroundColor: Colors.neutral.s100,
    borderTopWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
  },
  tabButton: {
    alignItems: "center",
  },
  tabIconContainer: {
    marginBottom: Sizing.x10,
  },
  tabLabelText: {
    ...Typography.regular.x10,
    textAlign: "center",
    maxWidth: Sizing.x80,
  },
})

export default TabNavigator
