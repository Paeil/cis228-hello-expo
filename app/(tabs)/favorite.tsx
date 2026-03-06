import { ThemedText } from '@/components/themed-text';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FavoritesContext } from '../_layout';

export default function FavoriteScreen() {
  const { favorites, userName } = useContext(FavoritesContext);

  return (
    <View style={styles.mainScreen}>
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <View style={styles.logoCircle}><ThemedText style={styles.logoIcon}>🍴</ThemedText></View>
          <ThemedText style={styles.brandText}>Ham-al</ThemedText>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <ThemedText style={styles.pageTitle}>
            Cookbook
          </ThemedText>
          
          <View style={styles.recipeList}>
            {favorites.length === 0 ? (
              <View style={styles.emptyState}>
                <ThemedText style={styles.emptyText}>Your cookbook is empty.</ThemedText>
                <ThemedText style={styles.emptySubtext}>Heart recipes in Explore to save them here!</ThemedText>
              </View>
            ) : (
              favorites.map((recipe) => (
                <TouchableOpacity key={recipe.id} style={styles.recipeCard} activeOpacity={0.8}>
                  <View style={styles.imagePlaceholder}>
                    <ThemedText style={styles.foodEmoji}>{recipe.emoji}</ThemedText>
                  </View>
                  <View style={styles.recipeInfo}>
                    <View style={styles.tagPill}><ThemedText style={styles.tagText}>{recipe.category}</ThemedText></View>
                    <ThemedText style={styles.recipeTitle}>{recipe.title}</ThemedText>
                    <View style={styles.metaRow}>
                      <ThemedText style={styles.metaText}>🕒 {recipe.time}</ThemedText>
                      <ThemedText style={styles.metaText}>⭐ {recipe.rating}</ThemedText>
                    </View>
                  </View>
                  <ThemedText style={styles.chevronIcon}>❯</ThemedText>
                </TouchableOpacity>
              ))
            )}
          </View>
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: { flex: 1, backgroundColor: '#0A111F' },
  headerRow: { flexDirection: 'row', paddingHorizontal: 25, paddingTop: 60, paddingBottom: 20 },
  leftHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#0047AB', justifyContent: 'center', alignItems: 'center' },
  logoIcon: { fontSize: 14 },
  brandText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  scrollContainer: { flex: 1 },
  contentContainer: { paddingHorizontal: 25 },
  pageTitle: { fontSize: 34, fontWeight: '900', color: '#FFFFFF', marginTop: 15, marginBottom: 30 },
  recipeList: { gap: 15 },
  recipeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#131C2D', borderRadius: 30, padding: 15 },
  imagePlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  foodEmoji: { fontSize: 40 },
  recipeInfo: { flex: 1 },
  tagPill: { alignSelf: 'flex-start', backgroundColor: '#1E293B', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8, marginBottom: 6 },
  tagText: { fontSize: 9, fontWeight: '900', color: '#5C6A82' },
  recipeTitle: { fontSize: 18, fontWeight: '900', color: '#FFFFFF', marginBottom: 8 },
  metaRow: { flexDirection: 'row', gap: 15 },
  metaText: { fontSize: 12, fontWeight: '700', color: '#5C6A82' },
  chevronIcon: { fontSize: 18, color: '#5C6A82' },
  emptyState: { marginTop: 50, alignItems: 'center' },
  emptyText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  emptySubtext: { color: '#5C6A82', fontSize: 14, marginTop: 10 },
});

