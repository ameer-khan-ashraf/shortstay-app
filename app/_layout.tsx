import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': Montserrat_400Regular,
    'mon-sb':Montserrat_600SemiBold,
    'mon-b':Montserrat_700Bold
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
  const router = useRouter();
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/login" options={{ 
          title:'Log in or sign up',
          headerTitleStyle:{
            fontFamily:'mon-sb'
          },
          presentation:'modal',
          headerLeft:()=>(<TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name='close-outline' size={28}/>
          </TouchableOpacity>)
         }} />
         <Stack.Screen
         name='listing/[id]'
         options={{headerTitle:''}}
         />
         <Stack.Screen
         name='(modals)/booking'
         options={{
          presentation:'transparentModal',
          animation:'fade',
          headerLeft:() =>(
            <TouchableOpacity onPress={()=>router.back()}>
              <Ionicons name='close-outline' size={28}/>
            </TouchableOpacity>
          )
        }}
         />
      </Stack>
  );
}
