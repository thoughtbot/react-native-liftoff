import React, { FC } from "react"
import { FlatList } from "react-native-gesture-handler"
import { StyleSheet, Text, SafeAreaView, View, Pressable, Linking } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import useSWR from "swr"

import LoadingIndicator from "./LoadingIndicator"

import { Buttons, Colors, Outlines, Sizing, Typography } from "./styles"

const GithubRepos: FC = () => {
  const githubData = {
    "organization": {
      "name": "thoughtbot, inc.",
      "repositories": {
        "nodes": [
          {
            "name": "react-native-code-input-example",
            "stargazerCount": 8,
            "url": "https://github.com/thoughtbot/react-native-code-input-example"
          },
          {
            "name": "bamboo_phoenix",
            "stargazerCount": 3,
            "url": "https://github.com/thoughtbot/bamboo_phoenix"
          },
          {
            "name": "react-native-media-controls",
            "stargazerCount": 0,
            "url": "https://github.com/thoughtbot/react-native-media-controls"
          },
          {
            "name": "react-native-liftoff",
            "stargazerCount": 48,
            "url": "https://github.com/thoughtbot/react-native-liftoff"
          },
          {
            "name": "props_template",
            "stargazerCount": 1,
            "url": "https://github.com/thoughtbot/props_template"
          },
          {
            "name": "terraform-route-53-delegated-subdomain",
            "stargazerCount": 0,
            "url": "https://github.com/thoughtbot/terraform-route-53-delegated-subdomain"
          },
          {
            "name": "react-rails",
            "stargazerCount": 0,
            "url": "https://github.com/thoughtbot/react-rails"
          },
          {
            "name": "humid",
            "stargazerCount": 0,
            "url": "https://github.com/thoughtbot/humid"
          },
          {
            "name": "prometheus_exporter",
            "stargazerCount": 0,
            "url": "https://github.com/thoughtbot/prometheus_exporter"
          },
          {
            "name": "cloudformation-terraform-state-backend",
            "stargazerCount": 0,
            "url": "https://github.com/thoughtbot/cloudformation-terraform-state-backend"
          }
        ]
      }
    }
  }

  const fetcher = (_key: string) => Promise.resolve(githubData)
  const { data } = useSWR(
    'put your query here',
    fetcher
  )

  if (data === undefined) {
    return <LoadingIndicator />
  }

  const { nodes } = data.organization.repositories;

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>thoughtbot repositories</Text>
      <FlatList
        contentContainerStyle={style.listContainer}
        data={nodes}
        renderItem={({ item }) => (
          <Pressable
            style={Buttons.applyOpacity(style.item)}
            onPress={() => Linking.openURL(item.url)}
            accessibilityRole="button"
          >
            <Text>{item.name}</Text>
            <View style={style.itemDetail}>
              <View style={style.itemDetailCount}>
                <Icon name="star" size={Sizing.icons.x10} color={Colors.neutral.black} />
                <Text style={style.itemDetailCountNumber}>{item.stargazerCount}</Text>
              </View>
              <Icon name="external-link" size={Sizing.icons.x10} color={Colors.neutral.black} />
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.white,
    flex: 1,
  },
  title: {
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.semibold,
    marginVertical: Sizing.x10,
    paddingHorizontal: Sizing.x20,
  },
  listContainer: {
    paddingHorizontal: Sizing.x20,
  },
  item: {
    borderColor: Colors.neutral.s200,
    borderRadius: Outlines.borderRadius.small,
    borderWidth: Outlines.borderWidth.thin,
    flex: 1,
    marginVertical: Sizing.x7,
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x20,
  },
  itemDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Sizing.x7,
  },
  itemDetailCount: {
    flex: 1,
    flexDirection: 'row',
  },
  itemDetailCountNumber: {
    marginLeft: Sizing.x2,
  }
})

export default GithubRepos
