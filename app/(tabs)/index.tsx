import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Alert, Button, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

// 🌟 Import the Global Context
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FavoritesContext } from '../_layout';

export default function HomeScreen() {
  const { userName, setUserName } = useContext(FavoritesContext);
  const [peopleCount, setPeopleCount] = React.useState(0);

  const handlePress = () => {
    if (userName.trim() === '' || userName === 'Chef') {
      Alert.alert("What's your name?", "Please enter your name to start your culinary journey!");
    } else {
      router.push({
        pathname: '/welcome',
        params: { chefName: userName, people: peopleCount }
      });
    }
  };

  const handleReset = () => {
    setUserName('Chef');
    setPeopleCount(0);
  };

  const increment = () => setPeopleCount(prev => prev + 1);
  const decrement = () => {
    if (peopleCount > 0) {
      setPeopleCount(prev => prev - 1);
    }
  };

  return (
    <View style={styles.mainScreen}>
      
      <Image
        source={require('../../assets/images/background1.jpg')} 
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />

      <View style={styles.backgroundOverlay} />

      <View style={styles.contentContainer}>
        
        <View style={styles.brandingContainer}>
          <View style={styles.logoIconWrapper}>
            <Image
              source={require('../../assets/images/logo.png')} 
              style={styles.logoImage}
              contentFit="contain"
            />
          </View>
          <ThemedText style={styles.appName}>Ham-al</ThemedText>
          <ThemedText style={styles.appTagline}>YOUR PERSONAL SOUS CHEF</ThemedText>
        </View>

        <View style={styles.glassCard}>
          <View style={styles.greetingRow}>
            <ThemedText style={styles.helloText}>Hello, {userName}! </ThemedText>
          </View>
          <ThemedText style={styles.subtitleText}>Let's set up your kitchen</ThemedText>
          
          <ThemedText style={styles.labelSmall}>WHAT SHOULD WE CALL YOU?</ThemedText>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your name..."
            placeholderTextColor="#9CA3AF"
            value={userName === 'Chef' ? '' : userName}
            onChangeText={setUserName} 
          />

          <ThemedText style={styles.labelMedium}>How many people are you cooking for?</ThemedText>
          
          <View style={styles.stepperContainer}>
            <TouchableOpacity onPress={decrement} style={styles.stepperBtnWhite}>
              <ThemedText style={styles.stepperMinus}>-</ThemedText>
            </TouchableOpacity>
            
            <ThemedText style={styles.stepperValue}>{peopleCount}</ThemedText>
            
            <TouchableOpacity onPress={increment} style={styles.stepperBtnBlue}>
              <ThemedText style={styles.stepperPlus}>+</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
              <ThemedText style={styles.resetBtnText}>Reset</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handlePress} style={styles.startBtn}>
              <ThemedText style={styles.startBtnText}>Start ➔</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={{ display: 'none' }}>
            <Button title="Hidden" onPress={() => {}} />
          </View>
        </View>

      </View>

      <ThemedText style={styles.footerText}>EST. 2026 • MINIMALIST KITCHEN</ThemedText>

      <View style={{ display: 'none' }}>
        <ParallaxScrollView headerBackgroundColor={{ light: '#000', dark: '#000' }} headerImage={<View />}>
          <ThemedView />
        </ParallaxScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.1)', 
    zIndex: 0,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 35,
    zIndex: 1,
    marginTop: -40, 
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  logoIconWrapper: {
    width: 64, 
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.49)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgb(255, 255, 255)',
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 18,
  },
  appName: {
    fontSize: 28, 
    fontWeight: '900',
    color: '#011f4e', 
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 9, 
    fontWeight: '800',
    color: '#041a69', 
    letterSpacing: 1.5,
    marginTop: 2,
  },
  glassCard: {
    width: '100%',
    backgroundColor: 'rgba(248, 250, 252, 0.51)', 
    borderRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 20, 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    alignSelf: 'center',
  },
  helloText: {
    fontSize: 22, 
    fontWeight: '900',
    color: '#1F2937',
  },
  subtitleText: {
    fontSize: 12, 
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 20,
    alignSelf: 'center',
  },
  labelSmall: {
    alignSelf: 'flex-start',
    fontSize: 9,
    fontWeight: '800',
    color: '#4B5563',
    marginBottom: 6,
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  inputField: {
    width: '100%',
    height: 50, 
    backgroundColor: '#F3F4F6', 
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  labelMedium: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 10,
    marginTop: 0,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 30,
    padding: 6,
    width: '100%',
    marginBottom: 20,
  },
  stepperBtnWhite: {
    width: 40, 
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  stepperMinus: {
    fontSize: 20,
    fontWeight: '800',
    color: '#007AFF',
  },
  stepperValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F2937',
  },
  stepperBtnBlue: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepperPlus: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  resetBtn: {
    flex: 0.35,
    backgroundColor: '#E5E7EB', 
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '800',
  },
  startBtn: {
    flex: 0.65,
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  footerText: {
    position: 'absolute',
    bottom: 105,
    fontSize: 9,
    fontWeight: '900',
    color: '#ffffff', 
    opacity: 0.7,
    letterSpacing: 2,
    zIndex: 1,
  }
});

