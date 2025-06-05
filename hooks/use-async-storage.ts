import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = () => {
  const getItem = async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      return null;
    }
  };

  const setItem = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
    }
  };

  const removeItem = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  };

  return { getItem, setItem, removeItem };
};
