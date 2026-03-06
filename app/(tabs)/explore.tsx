import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { FavoritesContext } from '../_layout';

export default function TabTwoScreen() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [searchText, setSearchText] = useState('');

  const recipes = [
    { id: 1, title: 'Chicken Adobo', category: 'CLASSIC', time: '40 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '5.0', emoji: '🍗' },
    { id: 2, title: 'Beef Kaldereta', category: 'FIESTA', time: '1.5 hrs', level: 'INTERMEDIATE', levelColor: '#F5A623', rating: '4.9', emoji: '🥘' },
    { id: 3, title: 'Sinigang na Hipon', category: 'SOUP', time: '35 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '4.8', emoji: '🦐' },
    { id: 4, title: 'Pork Sisig', category: 'PULUTAN', time: '50 mins', level: 'ADVANCED', levelColor: '#E74C3C', rating: '5.0', emoji: '🍳' },
    { id: 5, title: 'Kare-Kare', category: 'STEW', time: '2 hrs', level: 'INTERMEDIATE', levelColor: '#F5A623', rating: '4.7', emoji: '🥜' },
    { id: 6, title: 'Lechon Kawali', category: 'CRISPY', time: '1 hr', level: 'INTERMEDIATE', levelColor: '#F5A623', rating: '4.9', emoji: '🥓' },
    { id: 7, title: 'Pancit Bihon', category: 'NOODLES', time: '30 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '4.6', emoji: '🍝' },
    { id: 8, title: 'Bulalo', category: 'SOUP', time: '3 hrs', level: 'INTERMEDIATE', levelColor: '#F5A623', rating: '5.0', emoji: '🥣' },
    { id: 9, title: 'Lumpiang Shanghai', category: 'SNACK', time: '45 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '4.9', emoji: '🌯' },
    { id: 10, title: 'Bicol Express', category: 'SPICY', time: '40 mins', level: 'INTERMEDIATE', levelColor: '#F5A623', rating: '4.8', emoji: '🌶️' },
    { id: 11, title: 'Tapsilog', category: 'BREAKFAST', time: '20 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '4.7', emoji: '🍳' },
    { id: 12, title: 'Arroz Caldo', category: 'COMFORT', time: '45 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '4.5', emoji: '🍲' },
    { id: 13, title: 'Leche Flan', category: 'DESSERT', time: '1 hr', level: 'INTERMEDIATE', levelColor: '#F5A623', rating: '5.0', emoji: '🍮' },
    { id: 14, title: 'Halo-Halo', category: 'DESSERT', time: '15 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '4.9', emoji: '🍧' },
    { id: 15, title: 'Pinakbet', category: 'VEGGIE', time: '30 mins', level: 'BEGINNER', levelColor: '#2ECC71', rating: '4.4', emoji: '🥗' },
  ];

  return (
    <View style={styles.mainScreen}>
      <View style={styles.headerRow}>
        <View style={styles.headerCenter}>
          <ThemedText style={styles.headerTitle}>LUTONG BAHAY</ThemedText>
          <ThemedText style={styles.headerSubtitle}>PHILIPPINE GOURMET</ThemedText>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            <TextInput
              style={styles.searchInput}
              placeholder="Look for recipe..."
              placeholderTextColor="#5C6A82"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <View style={styles.recipeList}>
            {recipes.map((recipe) => {
              const isFavorite = favorites.some(fav => fav.id === recipe.id);
              return (
                <View key={recipe.id} style={styles.recipeCard}>
                  <View style={styles.imagePlaceholder}><ThemedText style={styles.foodEmoji}>{recipe.emoji}</ThemedText></View>
                  <View style={styles.cardContent}>
                    <View style={styles.cardTopRow}>
                      <ThemedText style={styles.recipeTitle}>{recipe.title}</ThemedText>
                      <TouchableOpacity onPress={() => toggleFavorite(recipe)} style={styles.heartButton}>
                        <IconSymbol size={22} name={isFavorite ? "heart.fill" : "heart"} color={isFavorite ? '#FF3B30' : '#5C6A82'} />
                      </TouchableOpacity>
                    </View>
                    <ThemedText style={styles.recipeSubtitle}>{recipe.category} • {recipe.time}</ThemedText>
                    <View style={styles.cardBottomRow}>
                       <View style={[styles.tagPill, { borderColor: recipe.levelColor }]}><ThemedText style={[styles.tagText, { color: recipe.levelColor }]}>{recipe.level}</ThemedText></View>
                       <ThemedText style={styles.ratingText}>⭐ {recipe.rating}</ThemedText>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{ height: 110 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: { flex: 1, backgroundColor: '#0A111F' },
  headerRow: { 
    paddingTop: 60, 
    paddingBottom: 20, 
    alignItems: 'center',
    backgroundColor: '#0A111F' 
  },
  headerCenter: { 
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 10, fontWeight: '800', color: '#5C6A82', letterSpacing: 1 },
  scrollContainer: { flex: 1 },
  contentContainer: { paddingHorizontal: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#131C2D', borderRadius: 20, paddingHorizontal: 20, height: 55, marginBottom: 20 },
  searchIcon: { fontSize: 18, color: '#5C6A82', marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#FFFFFF' },
  recipeList: { gap: 15 },
  recipeCard: { flexDirection: 'row', backgroundColor: '#131C2D', borderRadius: 24, padding: 15, alignItems: 'center' },
  imagePlaceholder: { width: 80, height: 80, borderRadius: 18, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center' },
  foodEmoji: { fontSize: 40 },
  cardContent: { flex: 1, marginLeft: 15 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recipeTitle: { fontSize: 16, fontWeight: '900', color: '#FFFFFF' },
  heartButton: { padding: 5 },
  recipeSubtitle: { fontSize: 13, color: '#5C6A82', marginBottom: 10 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagPill: { borderWidth: 1, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10 },
  tagText: { fontSize: 9, fontWeight: '900' },
  ratingText: { fontSize: 12, color: '#8E9BB0' },
});

