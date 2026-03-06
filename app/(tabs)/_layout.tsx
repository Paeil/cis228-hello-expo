import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
// 🌟 Using ComponentProps to handle icon name types automatically
import type { ComponentProps } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

// 🌟 Grabs the valid icon names from your IconSymbol component
type IconName = ComponentProps<typeof IconSymbol>['name'];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Helper for the standard tabs (Home, Planner, Favorites, Grocery)
  const renderTabIcon = (name: IconName, color: string, focused: boolean) => {
    if (focused) {
      return (
        <View style={styles.activeIndicator}>
          <IconSymbol size={24} name={name} color="#FFFFFF" />
        </View>
      );
    }
    return <IconSymbol size={24} name={name} color={color} />;
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // Vibrant Blue
        tabBarInactiveTintColor: '#5C6A82', // Muted Slate
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => renderTabIcon("house.fill", color, focused),
        }}
      />

      <Tabs.Screen
        name="todo"
        options={{
          title: 'Planner',
          // 🌟 Using "calendar" to match the Android mapping
          tabBarIcon: ({ color, focused }) => renderTabIcon("calendar", color, focused),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore', 
          tabBarIcon: ({ focused }) => (
            // 🌟 FIXED: centerInactive is now defined in the StyleSheet
            <View style={focused ? styles.centerFloatingActive : styles.centerInactive}>
              <IconSymbol 
                size={28} 
                name={focused ? "plus" : "safari.fill"} 
                color={focused ? "#FFFFFF" : "#5C6A82"} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => renderTabIcon("heart.fill", color, focused), 
        }}
      />

      <Tabs.Screen
        name="grocery"
        options={{
          title: 'Grocery',
          tabBarIcon: ({ color, focused }) => renderTabIcon("bag.fill", color, focused),
        }}
      />

      {/* Hidden route for onboarding */}
      <Tabs.Screen name="welcome" options={{ href: null }} />
      
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0A111F', // Deep Navy
    borderTopWidth: 0,
    elevation: 10,
    height: 90, 
    paddingTop: 12,
    paddingBottom: 25,
    position: 'absolute', 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  activeIndicator: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // 🌟 Creates the floating effect
    elevation: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  centerFloatingActive: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35, 
    elevation: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
  },
  // 🌟 FIXED: Added this missing style to clear the error
  centerInactive: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0, 
  }
});

