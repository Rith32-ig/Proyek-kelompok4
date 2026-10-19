<<<<<<< HEAD
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
=======
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
>>>>>>> 1f3ea7cbe1eb5646f2608a717413a5712edbd56f
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

<<<<<<< HEAD
import RootNavigator from './src/navigation/RootNavigator';

const BG = '#F8FAFC';
const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: BG, card: '#FFFFFF', text: '#1E293B', border: '#E2E8F0', primary: '#2563EB' },
};

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
=======
import AdminDashboardScreen from './src/screens/pengelola/AdminDashboardScreen';
import DataPenghuniScreen from './src/screens/pengelola/DataPenghuniScreen';

const BG = '#F8FAFC';

export default function App() {
  // State untuk ganti layar: 'dashboard' atau 'dataPenghuni'
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
>>>>>>> 1f3ea7cbe1eb5646f2608a717413a5712edbd56f

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: BG }}>
        <ActivityIndicator color="#2563EB" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
<<<<<<< HEAD
      <NavigationContainer theme={navTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
=======
      <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
        {/* Tombol Switcher Halaman Khusus Testing Tugas Kamu */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeScreen === 'dashboard' && styles.tabActive]}
            onPress={() => setActiveScreen('dashboard')}
          >
            <Text style={[styles.tabText, activeScreen === 'dashboard' && styles.tabTextActive]}>
              1. Admin Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeScreen === 'dataPenghuni' && styles.tabActive]}
            onPress={() => setActiveScreen('dataPenghuni')}
          >
            <Text style={[styles.tabText, activeScreen === 'dataPenghuni' && styles.tabTextActive]}>
              2. Data Penghuni
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tampilkan Layar Sesuai Tombol yang Ditekan */}
        <View style={{ flex: 1 }}>
          {activeScreen === 'dashboard' ? <AdminDashboardScreen /> : <DataPenghuniScreen />}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    padding: 6,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});
>>>>>>> 1f3ea7cbe1eb5646f2608a717413a5712edbd56f
