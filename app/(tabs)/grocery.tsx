import { ThemedText } from '@/components/themed-text';
import React, { useState } from 'react';
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Define the Grocery Item type
interface GroceryItem {
  id: string;
  text: string;
  category: string;
  completed: boolean;
}

export default function GroceryScreen() {
  const [inputText, setInputText] = useState('');
  
  // 🌟 Starts empty to showcase the Creative Empty State
  const [items, setItems] = useState<GroceryItem[]>([]);

  // Function to Add a new grocery item
  const addItem = () => {
    if (inputText.trim() === '') return;
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      text: inputText.trim(),
      category: 'SHOPPING LIST', 
      completed: false,
    };
    
    setItems([newItem, ...items]);
    setInputText('');
    Keyboard.dismiss(); // 🌟 Better UX: Closes keyboard after adding
  };

  // Function to Toggle completion status
  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Function to Delete an item
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Helper function to group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  return (
    <View style={styles.mainScreen}>
      
      {/* Top Header */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.headerTitle}>Groceries</ThemedText>
        <TouchableOpacity style={styles.optionsButton}>
          <ThemedText style={styles.optionsIcon}>•••</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>

          {/* Input & Add Button Row */}
          <View style={styles.inputRow}>
            <View style={styles.searchContainer}>
              <ThemedText style={styles.searchIcon}>🔍</ThemedText>
              <TextInput
                style={styles.searchInput}
                placeholder="What's missing, Chef?"
                placeholderTextColor="#5C6A82"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={addItem}
                returnKeyType="done"
              />
            </View>
            <TouchableOpacity 
                style={[styles.addButton, !inputText.trim() && { opacity: 0.6 }]} 
                onPress={addItem}
                disabled={!inputText.trim()}
            >
              <ThemedText style={styles.addButtonText}>+</ThemedText>
            </TouchableOpacity>
          </View>

          {items.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyIconCircle}>
                <ThemedText style={styles.emptyEmoji}>🛒</ThemedText>
              </View>
              <ThemedText style={styles.emptyTitle} numberOfLines={0}>
                It's empty
              </ThemedText>
              <ThemedText style={styles.emptySubtitle}>
                Add ingredients manually above, Chef!
              </ThemedText>
            </View>
          ) : (
            Object.keys(groupedItems).map((category) => (
              <View key={category} style={styles.categorySection}>
                <ThemedText style={styles.categoryHeader}>
                  {category.toUpperCase()}
                </ThemedText>

                {groupedItems[category].map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.groceryCard}
                    onPress={() => toggleItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, item.completed && styles.checkboxActive]}>
                      {item.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
                    </View>
                    
                    <ThemedText style={[styles.itemText, item.completed && styles.itemTextCompleted]}>
                      {item.text}
                    </ThemedText>

                    <TouchableOpacity 
                      style={styles.deleteArea} 
                      onPress={() => deleteItem(item.id)}
                    >
                      <ThemedText style={styles.deleteIcon}>✕</ThemedText>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          )}

          <View style={{ height: 120 }} />

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#0A111F',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 65,
    paddingBottom: 20,
    backgroundColor: '#0A111F',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  optionsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#131C2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsIcon: {
    color: '#5C6A82',
    fontSize: 18,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131C2D',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 55,
  },
  searchIcon: {
    fontSize: 16,
    color: '#5C6A82',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  addButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  emptyStateContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  emptyEmoji: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 28, //
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#5C6A82',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
    maxWidth: '85%',
  },

  categorySection: {
    marginBottom: 10,
  },
  categoryHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5C6A82',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  groceryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131C2D',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkboxActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemTextCompleted: {
    color: '#5C6A82',
    textDecorationLine: 'line-through',
  },
  deleteArea: {
    padding: 5,
  },
  deleteIcon: {
    fontSize: 16,
    color: '#5C6A82',
  },
});

