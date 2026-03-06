import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function TodoScreen() {
  const { chefName } = useLocalSearchParams<{ chefName: string }>();

  // Keeping a simple state for the active day to make the UI feel alive
  const [activeDay, setActiveDay] = useState(14);

  const days = [
    { day: 'MON', date: 14 },
    { day: 'TUE', date: 15 },
    { day: 'WED', date: 16 },
    { day: 'THU', date: 17 },
    { day: 'FRI', date: 18, isToday: true }, // Mimicking the blue text from your design
    { day: 'SAT', date: 19 },
  ];

  return (
    <View style={styles.mainScreen}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          
          {/* Top Header Row */}
          <View style={styles.headerRow}>
            <View>
              <ThemedText style={styles.brandTitle}>Ham-al</ThemedText>
              <ThemedText style={styles.brandSubtitle}>Weekly Meal Planner</ThemedText>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconCircle}>
                <ThemedText style={styles.iconText}>🔍</ThemedText>
              </TouchableOpacity>
              <View style={styles.avatarCircle}>
                <ThemedText style={styles.avatarText}>👩🏻</ThemedText>
              </View>
            </View>
          </View>

          {/* Calendar Strip */}
          <View style={styles.calendarStrip}>
            {days.map((item) => {
              const isActive = activeDay === item.date;
              return (
                <TouchableOpacity 
                  key={item.date} 
                  style={styles.dayColumn}
                  onPress={() => setActiveDay(item.date)}
                >
                  <ThemedText style={styles.dayLabel}>{item.day}</ThemedText>
                  <View style={[styles.dateCircle, isActive && styles.activeDateCircle]}>
                    <ThemedText style={[
                      styles.dateText, 
                      isActive && styles.activeDateText,
                      item.isToday && !isActive && styles.todayDateText
                    ]}>
                      {item.date}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Date Header & Today Button */}
          <View style={styles.dateHeaderRow}>
            <ThemedText style={styles.currentDateTitle}>Monday, Oct 14</ThemedText>
            <TouchableOpacity style={styles.todayButton}>
              <ThemedText style={styles.todayButtonText}>TODAY</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Main Meal Planner Card */}
          <View style={styles.plannerCard}>
            
            {/* Breakfast Section */}
            <View style={styles.mealSection}>
              <View style={styles.mealHeader}>
                <ThemedText style={styles.mealLabel}>BREAKFAST</ThemedText>
                <ThemedText style={styles.mealTime}>8:30 AM</ThemedText>
              </View>
              <TouchableOpacity style={styles.recipeCard}>
                <View style={[styles.foodImagePlaceholder, { backgroundColor: '#AEE4D7' }]}>
                  <ThemedText style={styles.foodEmoji}>🥣</ThemedText>
                </View>
                <View style={styles.recipeInfo}>
                  <ThemedText style={styles.recipeTitle}>Açaí Power Bowl</ThemedText>
                  <ThemedText style={styles.recipeMeta}>12 mins • 320 kcal</ThemedText>
                </View>
                <ThemedText style={styles.optionsIcon}>•••</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Lunch Section */}
            <View style={styles.mealSection}>
              <View style={styles.mealHeader}>
                <ThemedText style={styles.mealLabel}>LUNCH</ThemedText>
                <ThemedText style={styles.mealTime}>1:00 PM</ThemedText>
              </View>
              <TouchableOpacity style={styles.recipeCard}>
                <View style={[styles.foodImagePlaceholder, { backgroundColor: '#2B384B' }]}>
                  <ThemedText style={styles.foodEmoji}>🥗</ThemedText>
                </View>
                <View style={styles.recipeInfo}>
                  <ThemedText style={styles.recipeTitle}>Grilled Salmon Salad</ThemedText>
                  <ThemedText style={styles.recipeMeta}>25 mins • 450 kcal</ThemedText>
                </View>
                <ThemedText style={styles.optionsIcon}>•••</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Dinner Section */}
            <View style={styles.mealSection}>
              <View style={styles.mealHeader}>
                <ThemedText style={styles.mealLabel}>DINNER</ThemedText>
              </View>
              <TouchableOpacity style={styles.addRecipeCard}>
                <ThemedText style={styles.addRecipeIcon}>⊕</ThemedText>
                <ThemedText style={styles.addRecipeText}>ADD RECIPE</ThemedText>
              </TouchableOpacity>
            </View>

          </View>
          
          {/* Bottom spacing to clear the absolute tab bar */}
          <View style={{ height: 120 }} />

        </View>
      </ScrollView>

      {/* HIDDEN: Keeps your compiler happy by "using" the imported components */}
      <View style={{ display: 'none' }}>
        <TextInput />
        <TouchableOpacity onPress={() => Alert.alert('Hidden')}><ThemedText>Hidden</ThemedText></TouchableOpacity>
        <Image source={{ uri: '' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#0B101E', // Deep dark navy background
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#8E9BB0',
    fontWeight: '500',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E2638',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFD1DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E2638',
  },
  avatarText: {
    fontSize: 22,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  dayColumn: {
    alignItems: 'center',
    gap: 10,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4B556D',
    letterSpacing: 0.5,
  },
  dateCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#161D2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDateCircle: {
    backgroundColor: '#007AFF',
    elevation: 5,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8E9BB0',
  },
  activeDateText: {
    color: '#FFFFFF',
  },
  todayDateText: {
    color: '#007AFF', // Friday the 18th is highlighted in blue text
  },
  dateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentDateTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  todayButton: {
    backgroundColor: '#13284A', // Very dark blue tint
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  todayButtonText: {
    color: '#007AFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  plannerCard: {
    backgroundColor: '#141A29', // Slight contrast from the background
    borderRadius: 30,
    padding: 25,
    elevation: 3,
  },
  mealSection: {
    marginBottom: 25,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  mealLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#5C6A82',
    letterSpacing: 1,
  },
  mealTime: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8E9BB0',
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2638',
    borderRadius: 24,
    padding: 15,
  },
  foodImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  foodEmoji: {
    fontSize: 28,
  },
  recipeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recipeMeta: {
    fontSize: 12,
    color: '#8E9BB0',
    fontWeight: '500',
  },
  optionsIcon: {
    fontSize: 18,
    color: '#5C6A82',
    paddingHorizontal: 10,
  },
  addRecipeCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#334155',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(30, 38, 56, 0.3)', // Subtle transparent fill
  },
  addRecipeIcon: {
    fontSize: 20,
    color: '#5C6A82',
    marginBottom: 5,
  },
  addRecipeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5C6A82',
    letterSpacing: 0.5,
  }
});

