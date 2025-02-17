import { useColorScheme } from "react-native";

import { Tabs } from "expo-router";

import Colors from "../../constants/Colors";

import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,

        tabBarStyle: { display: "none" },
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: "none" },

          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/loginScreen" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      /> */}

      {/* <Tabs.Screen
        name="register"
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}

      <Tabs.Screen
        name="loginScreen"
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      {/* <Tabs.Screen
        name="userSelector"
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
