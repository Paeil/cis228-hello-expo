import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function WelcomeScreen() {
  // Captures the name passed from your HomeScreen
  const { chefName } = useLocalSearchParams<{ chefName: string }>();

  return (
    <View style={styles.mainScreen}>
      
      {/* Central Floating Card */}
      <View style={styles.glassCard}>
        
        {/* Top Pan Icon */}
        <View style={styles.topIconCircle}>
          <ThemedText style={styles.topIcon}>🍳</ThemedText>
        </View>

        {/* Welcome Headers */}
        <ThemedText style={styles.titleText}>
          Welcome, Chef{'\n'}{chefName || 'Alex'}!
        </ThemedText>
        <ThemedText style={styles.subtitleText}>
          Let's start your culinary journey.
        </ThemedText>

        {/* 3 Circular Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionCircle}>
              <ThemedText style={styles.actionIconBlue}>⚡</ThemedText>
            </View>
            <ThemedText style={styles.actionLabel}>QUICK{'\n'}RECIPES</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionCircle}>
              <ThemedText style={styles.actionIconBlue}>📅</ThemedText>
            </View>
            <ThemedText style={styles.actionLabel}>MEAL{'\n'}PLANNING</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionCircle}>
              <ThemedText style={styles.actionIconBlue}>📖</ThemedText>
            </View>
            <ThemedText style={styles.actionLabel}>MY{'\n'}COOKBOOK</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Main Glowing Button */}
        <TouchableOpacity 
          style={styles.glowButton} 
          onPress={() => router.push('/todo')} // Or wherever you want this to go!
        >
          <ThemedText style={styles.glowButtonText}>Enter the Kitchen ➔</ThemedText>
        </TouchableOpacity>

      </View>

      {/* Footer */}
      <ThemedText style={styles.footerText}>
        DESIGNED FOR THE MODERN KITCHEN
      </ThemedText>

    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep dark navy background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  glassCard: {
    width: '100%',
    backgroundColor: '#1E293B', // Slightly lighter dark blue for the card
    borderRadius: 35,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)', // Extremely subtle border for depth
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  topIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  topIcon: {
    fontSize: 24,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: '#94A3B8', // Slate grey
    marginBottom: 35,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#273549', // Mid-tone grey/blue
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconBlue: {
    fontSize: 22,
    color: '#007AFF', // Vibrant blue to match your theme
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 14,
  },
  glowButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    // Faux-glow effect
    elevation: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  glowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 10,
    fontWeight: '800',
    color: '#475569', // Dark muted grey
    letterSpacing: 2,
  }
});





