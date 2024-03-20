/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import DialogModal from "components/Dialog";
import { useFonts } from "expo-font";
import { router, SplashScreen, Stack } from "expo-router";
import { signOut } from "firebase/auth";

import { auth, getUserAuth } from "../config/firebaseConfig";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { GluestackUIProvider } from "@gluestack-ui/themed";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const user = getUserAuth();
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  // improve this when the teacher page is ready
  useEffect(() => {
    if (loaded && auth?.currentUser) {
      router.push("/teacherPage");
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const authUser = auth;
  const colorScheme = useColorScheme();
  const [dialog, setDialog] = useState(false);
  const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_API_URL_GRAPHQL,
    headers: {
      apiKey: process.env.EXPO_PUBLIC_API_KEY as string,
    },
    cache: new InMemoryCache(),
  });

  // ...
  const handleSignout = async () => {
    signOut(authUser)
      .then(() => {
        AsyncStorage.clear()
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            console.error("Failed to clear AsyncStorage:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };
  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ApolloProvider client={client}>
          <RootSiblingParent>
            <Stack>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="index"
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, presentation: "modal" }}
              />
              <Stack.Screen
                name="Activities/[slug]"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="createActivity"
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="createStudent"
              />
              <Stack.Screen
                options={{
                  headerTransparent: true,
                  headerTitle: "",
                  headerLeft: () => <></>,

                  headerRight: () => (
                    <DialogModal
                      isOpen={dialog}
                      bodyText="Tem certeza que deseja sair:"
                      title="Tem certeza que deseja sair:"
                      onCancel={() => setDialog(false)}
                      onConfirm={() => handleSignout()}
                    />
                  ),
                }}
                name="teacherPage"
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="studentSchedule"
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="userSelector"
              />
            </Stack>
          </RootSiblingParent>
        </ApolloProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
