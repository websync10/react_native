import AsyncStorage from '@react-native-async-storage/async-storage';

export const resetSplashScreen = async () => {
  try {
    await AsyncStorage.removeItem('hasLaunched');
    console.log('Splash screen reset successfully');
  } catch (error) {
    console.error('Error resetting splash screen:', error);
  }
};

export const checkSplashScreenStatus = async () => {
  try {
    const hasLaunched = await AsyncStorage.getItem('hasLaunched');
    return hasLaunched === 'true';
  } catch (error) {
    console.error('Error checking splash screen status:', error);
    return false;
  }
};
