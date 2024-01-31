import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { ImageBackground } from "expo-image/build/ImageBackground";
import { SplashScreen, Stack } from "expo-router";
import LottieView from "lottie-react-native";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { GluestackUIProvider } from "@gluestack-ui/themed";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(auth)/userSelection",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <ImageBackground
        source={require("assets/images/Background2.png")}
        style={{ width: "100%", height: "100%", backgroundPosition: "cover" }}
      >
        <LottieView
          source={require("assets/animations/LoadingSplash.json")}
          style={{ width: "100%", height: "100%", alignSelf: "center" }}
          autoPlay
          loop
        />
      </ImageBackground>
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_API_URL_GRAPHQL,
    headers: {
      apiKey: process.env.EXPO_PUBLIC_API_KEY as string,
    },
    cache: new InMemoryCache(),
  });

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ApolloProvider client={client}>
          <RootSiblingParent>
            <Stack>
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
            </Stack>
          </RootSiblingParent>
        </ApolloProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
