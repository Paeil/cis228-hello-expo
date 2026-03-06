import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { createContext, useState } from 'react';

// 🌟 Expanded Context to include userName
export const FavoritesContext = createContext<{
  favorites: any[];
  toggleFavorite: (recipe: any) => void;
  userName: string;
  setUserName: (name: string) => void;
}>({ 
  favorites: [], 
  toggleFavorite: () => {}, 
  userName: 'Chef', // Default name
  setUserName: () => {} 
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [userName, setUserName] = useState('Chef'); // 🌟 Global Name State

  const toggleFavorite = (recipe: any) => {
    setFavorites((prev) => 
      prev.find(item => item.id === recipe.id) 
        ? prev.filter(item => item.id !== recipe.id) 
        : [...prev, recipe]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, userName, setUserName }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </FavoritesContext.Provider>
  );
}

