type Routes<T extends string> = Record<T, T>

export type NavigatorRoute = "TabNavigator"

export const NavigatorRoutes: Routes<NavigatorRoute> = {
  TabNavigator: "TabNavigator",
}

export type TabRoute = "Tab1" | "Tab2" | "Tab3"

export const TabLabels: Record<TabRoute, string> = {
  Tab1: "Tab 1",
  Tab2: "Tab 2",
  Tab3: "Tab 3",
}

export const TabRoutes: Routes<TabRoute> = {
  Tab1: "Tab1",
  Tab2: "Tab2",
  Tab3: "Tab3",
}

type UnauthenticatedRoute = "SignIn" | "SignUp"

export const UnauthenticatedRoutes: Routes<UnauthenticatedRoute> = {
  SignIn: "SignIn",
  SignUp: "SignUp",
}
