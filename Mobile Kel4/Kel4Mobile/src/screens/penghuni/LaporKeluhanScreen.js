import React, { useState } from 'react';
import { View, Pressable, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import Txt from '../components/Txt';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { colors } from '../theme';

// .cats pada form-keluhan.html (urutan sama dengan web)
const KATEGORI = [
  { key: 'Wi-Fi', icon: 'wifi' },
  { key: 'Fasilitas', icon: 'bed' },
  { key: 'Air', icon: 'water' },
  { key: 'Listrik', icon: 'bulb' },
];

export default function LaporKeluhanScreen({ navigation }) {
  const toast = useToast();
  const { addComplaint } = useAppData();
  const [kategori, setKategori] = useState('Wi-Fi');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState(null);
  const [err, setErr] = useState(null);

  const kirim = () => {
    if (!deskripsi.trim()) {
      setErr('Deskripsi masalah wajib diisi');
      return;
    }
    addComplaint({ kategori, deskripsi: deskripsi.trim() });
    setDeskripsi('');
    setFoto(null);
    setErr(null);
    toast('Keluhan terkirim ke pengelola ✓');
    navigation.navigate('Beranda');
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* header: tombol kembali + judul */}
          <View style={styles.head}>
            <CustomButton title="" icon="arrow-back" type="ghost" size="sm" onPress={() => navigation.navigate('Beranda')} />
            <Txt style={styles.h1}>Keluhan Baru</Txt>
          </View>

          {/* kategori */}
          <View>
            <Txt style={styles.label}>Pilih kategori</Txt>
            <View style={styles.cats}>
              {KATEGORI.map((k) => {
                const on = k.key === kategori;
                return (
                  <Pressable key={k.key} onPress={() => setKategori(k.key)} style={[styles.cat, on && styles.catOn]}>
                    <Ionicons name={k.icon} size={30} color={on ? colors.acc : colors.mut} />
                    <Txt style={{ fontWeight: '600', color: on ? colors.acc : colors.txt, marginTop: 4 }}>{k.key}</Txt>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* deskripsi */}
          <CustomInput
            label="Ceritakan masalahnya"
            placeholder="Contoh: Air di kamar mandi mati sejak pagi…"
            value={deskripsi}
            onChangeText={(t) => { setDeskripsi(t); setErr(null); }}
            error={err}
            multiline
            numberOfLines={4}
            style={{ marginTop: 0 }}
          />

          {/* foto bukti (placeholder upload) */}
          <View>
            <Txt style={styles.label}>Foto bukti</Txt>
            <Pressable
              style={[styles.drop, foto && { borderColor: colors.acc, backgroundColor: colors.accb }]}
              onPress={() => { setFoto('foto-bukti-keluhan.jpg'); toast('Foto dipilih (simulasi)'); }}
            >
              <Ionicons name={foto ? 'checkmark-circle' : 'camera'} size={28} color={foto ? colors.ok : colors.mut} />
              <Txt style={{ fontWeight: '700', color: colors.mut, marginTop: 4 }}>Ketuk untuk memilih foto</Txt>
              <Txt style={{ fontSize: 12, color: colors.mut, marginTop: 4 }}>
                {foto ? `✓ ${foto}` : 'JPG/PNG, maks 5 MB'}
              </Txt>
            </Pressable>
          </View>

          <CustomButton
            title="Kirim Laporan"
            icon="paper-plane"
            size="lg"
            block
            style={{ borderRadius: 14, marginTop: 'auto' }}
            onPress={kirim}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flexGrow: 1, padding: 18, gap: 14 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  h1: { fontSize: 22, fontWeight: '700', letterSpacing: -0.4 },
  label: { fontSize: 12, fontWeight: '600', color: colors.mut, marginBottom: 4 },
  cats: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 6 },
  cat: {
    width: '47.5%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.surf,
    borderWidth: 2,
    borderColor: colors.bd,
    borderRadius: 16,
  },
  catOn: {
    borderColor: colors.acc,
    backgroundColor: colors.accb,
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  drop: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.bd,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    marginTop: 6,
  },
});
