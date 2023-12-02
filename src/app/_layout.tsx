import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
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
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    uri: 'https://isciuaavizjxyezatfvj.supabase.co/graphql/v1',
    headers: {
      "apiKey": "sbp_764f2eaada024526612e3f490e8183dfebfa60c2",
    },
    cache: new InMemoryCache()
  });

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>
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
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
        </ApolloProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
