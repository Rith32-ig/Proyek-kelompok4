import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import PenghuniHomeScreen, { PengumumanScreen } from '../screens/penghuni/PenghuniHomeScreen';
import LaporKeluhanScreen from '../screens/penghuni/LaporKeluhanScreen';
import AdminDashboardScreen from '../screens/pengelola/AdminDashboardScreen';
import DataPenghuniScreen from '../screens/pengelola/DataPenghuniScreen';
import PembayaranScreen from '../screens/pengelola/PembayaranScreen';
import KeluhanAdminScreen from '../screens/pengelola/KeluhanAdminScreen';

const ACC = '#2563EB';
const MUT = '#64748B';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS = {
  Beranda: (f) => (f ? 'home' : 'home-outline'),
  Lapor: (f) => (f ? 'create' : 'create-outline'),
  Info: (f) => (f ? 'megaphone' : 'megaphone-outline'),
  Keluar: () => 'log-out-outline',
  Dashboard: (f) => (f ? 'stats-chart' : 'stats-chart-outline'),
  Penghuni: (f) => (f ? 'people' : 'people-outline'),
  Pembayaran: (f) => (f ? 'wallet' : 'wallet-outline'),
  Keluhan: (f) => (f ? 'construct' : 'construct-outline'),
};

const tabScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: ACC,
  tabBarInactiveTintColor: MUT,
  tabBarLabelStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#E2E8F0', borderTopWidth: 1 },
  tabBarIcon: ({ focused, color }) => <Ionicons name={ICONS[route.name](focused)} size={22} color={color} />,
});

const Kosong = () => null;

/* Area Penghuni: Beranda · Lapor · Info · Keluar */
function PenghuniTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Beranda" component={PenghuniHomeScreen} />
      <Tab.Screen name="Lapor" component={LaporKeluhanScreen} />
      <Tab.Screen name="Info" component={PengumumanScreen} />
      <Tab.Screen
        name="Keluar"
        component={Kosong}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // bukan layar, hanya aksi logout
            navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Landing' }] });
          },
        })}
      />
    </Tab.Navigator>
  );
}

/* Area Pengelola: Dashboard · Penghuni · Pembayaran · Keluhan */
function AdminTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Penghuni" component={DataPenghuniScreen} />
      <Tab.Screen name="Pembayaran" component={PembayaranScreen} />
      <Tab.Screen name="Keluhan" component={KeluhanAdminScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} initialParams={{ role: 'Pengelola' }} />
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="PenghuniTabs" component={PenghuniTabs} />
    </Stack.Navigator>
  );
}
