import { Redirect } from 'expo-router';

export default function Index() {
  // Always redirect to login screen
  return <Redirect href="/(auth)/login" />;
} 