import React, { useState } from 'react';
import { View, Pressable, SectionList, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import Txt from '../components/Txt';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import CustomInput from '../components/CustomInput';
import Badge from '../components/Badge';
import Select from '../components/Select';
import Popup from '../components/Popup';
import { CardHead, CardRow } from '../components/ListCardParts';
import { BILLS, ANNOUNCEMENTS, RULES } from '../data/dummy';
import { useAppData } from '../context/AppDataContext';
import { useToast } from '../context/ToastContext';
import { colors, gradients, gradStart, gradEnd } from '../theme';

/* ---------- Pop-up fitur penghuni (izin malam, pengumuman, aturan, bukti bayar) ---------- */
const QUICK = [
  { key: 'izin', icon: 'moon', label: 'Izin Malam' },
  { key: 'info', icon: 'megaphone', label: 'Pengumuman' },
  { key: 'aturan', icon: 'list', label: 'Aturan' },
  { key: 'bayar', icon: 'receipt', label: 'Bukti Bayar' },
];

function SheetTitle({ icon, title, onClose }) {
  return (
    <View style={styles.sheetHead}>
      <Ionicons name={icon} size={18} color={colors.navy} style={{ marginRight: 8 }} />
      <Txt style={{ flex: 1, fontSize: 16, fontWeight: '700' }}>{title}</Txt>
      <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
        <Ionicons name="close" size={16} color={colors.acc} />
      </Pressable>
    </View>
  );
}

function IzinSheet({ onClose }) {
  const toast = useToast();
  const [jam, setJam] = useState('23:00');
  const [alasan, setAlasan] = useState('Kuliah / tugas kelompok');
  const [catatan, setCatatan] = useState('');
  return (
    <View>
      <SheetTitle icon="moon" title="Izin Pulang Malam" onClose={onClose} />
      <Txt style={styles.sheetSub}>Gerbang dikunci pukul 22.00. Konfirmasi dulu agar pengelola tidak menunggu.</Txt>
      <CustomInput label="Perkiraan jam tiba" value={jam} onChangeText={setJam} keyboardType="numbers-and-punctuation" placeholder="23:00" />
      <Select
        label="Alasan"
        value={alasan}
        onChange={setAlasan}
        options={['Kuliah / tugas kelompok', 'Bekerja', 'Kegiatan organisasi', 'Lainnya']}
      />
      <CustomInput label="Catatan (opsional)" placeholder="Contoh: pulang dijemput teman" value={catatan} onChangeText={setCatatan} />
      <CustomButton
        title="Kirim Izin"
        block
        style={{ marginTop: 16 }}
        onPress={() => { toast('Izin terkirim ke pengelola ✓'); onClose(); }}
      />
    </View>
  );
}

function AnnouncementRows() {
  return ANNOUNCEMENTS.map((a, i) => (
    <View key={a.id} style={[styles.li, i < ANNOUNCEMENTS.length - 1 && styles.liSep]}>
      <View style={{ flex: 1 }}>
        <Txt style={{ fontWeight: '700' }}>{a.judul}</Txt>
        <Txt style={styles.small}>{a.ket}</Txt>
      </View>
      <Badge text={a.label} tone={a.tone} />
    </View>
  ));
}

function InfoSheet({ onClose }) {
  return (
    <View>
      <SheetTitle icon="megaphone" title="Pengumuman" onClose={onClose} />
      <Txt style={styles.sheetSub}>Dari pengelola kos · contoh data</Txt>
      <View style={{ marginTop: 6 }}>
        <AnnouncementRows />
      </View>
    </View>
  );
}

function AturanSheet({ onClose }) {
  const toast = useToast();
  return (
    <View>
      <SheetTitle icon="list" title="Aturan & Kontak Darurat" onClose={onClose} />
      <View style={{ marginVertical: 12 }}>
        {RULES.map((r) => (
          <View key={r} style={{ flexDirection: 'row', marginBottom: 6 }}>
            <Txt style={{ width: 16 }}>•</Txt>
            <Txt style={{ flex: 1, lineHeight: 22 }}>{r}</Txt>
          </View>
        ))}
      </View>
      <View style={styles.contact}>
        <View style={{ flex: 1 }}>
          <Txt style={{ fontWeight: '700' }}>Ibu Peni Azzam</Txt>
          <Txt style={styles.small}>Pengelola kos</Txt>
        </View>
        <CustomButton
          title="Hubungi"
          icon="logo-whatsapp"
          type="wa"
          size="sm"
          onPress={() => { toast('Membuka WhatsApp pengelola…'); onClose(); }}
        />
      </View>
    </View>
  );
}

function BayarSheet({ onClose }) {
  const toast = useToast();
  const [periode, setPeriode] = useState('November 2026');
  const [nominal, setNominal] = useState('1200000');
  const [foto, setFoto] = useState(null);
  return (
    <View>
      <SheetTitle icon="receipt" title="Unggah Bukti Bayar" onClose={onClose} />
      <Select label="Periode" value={periode} onChange={setPeriode} options={['November 2026', 'Oktober 2026']} />
      <CustomInput label="Nominal (Rp)" value={nominal} onChangeText={setNominal} keyboardType="numeric" />
      <Txt style={[styles.label, { marginTop: 12 }]}>Foto bukti transfer</Txt>
      <Pressable style={styles.drop} onPress={() => setFoto('bukti-transfer.jpg')}>
        <Ionicons name={foto ? 'checkmark-circle' : 'camera'} size={26} color={foto ? colors.ok : colors.mut} />
        <Txt style={{ fontWeight: '700', color: colors.mut, marginTop: 4 }}>
          {foto ? `✓ ${foto}` : 'Ketuk untuk pilih foto'}
        </Txt>
      </Pressable>
      <CustomButton
        title="Kirim Bukti"
        block
        style={{ marginTop: 16 }}
        onPress={() => { toast('Bukti dikirim, menunggu konfirmasi pengelola ✓'); onClose(); }}
      />
    </View>
  );
}

const SHEETS = { izin: IzinSheet, info: InfoSheet, aturan: AturanSheet, bayar: BayarSheet };

/* ---------- Screen 3 ---------- */
export default function PenghuniHomeScreen({ navigation }) {
  const toast = useToast();
  const { ownComplaints } = useAppData();
  const [sheet, setSheet] = useState(null);
  const Sheet = sheet ? SHEETS[sheet] : null;

  const header = (
    <View style={{ gap: 14, marginBottom: 14 }}>
      {/* sapaan */}
      <View>
        <Txt style={{ color: colors.mut, fontSize: 12 }}>Halo 👋</Txt>
        <Txt style={styles.h1}>Andi Pratama</Txt>
      </View>

      {/* .banner : status sewa pribadi */}
      <LinearGradient colors={gradients.primary} start={gradStart} end={gradEnd} style={styles.banner}>
        <View style={styles.circleA} />
        <View style={styles.circleB} />
        <Txt style={styles.bannerSmall}>Sisa masa sewa · Kamar A-03</Txt>
        <Txt style={styles.big}>
          47 <Txt style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>hari</Txt>
        </Txt>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: '48%' }]} />
        </View>
        <Txt style={[styles.bannerSmall, { marginTop: 8 }]}>Berakhir 4 Des 2026</Txt>
        {/* status pembayaran bulan ini */}
        <View style={styles.payRow}>
          <Ionicons name="card" size={15} color="#fff" />
          <Txt style={{ color: '#fff', fontSize: 12, marginLeft: 6, flex: 1 }}>Pembayaran Oktober 2026</Txt>
          <View style={styles.payChip}>
            <View style={styles.payDot} />
            <Txt style={{ color: colors.ok, fontSize: 12, fontWeight: '700' }}>Lunas</Txt>
          </View>
        </View>
      </LinearGradient>

      {/* tombol gabung grup WhatsApp */}
      <CustomButton
        title="Gabung Grup WhatsApp Koordinasi"
        icon="logo-whatsapp"
        type="wa"
        size="lg"
        block
        onPress={() => toast('Membuka Grup WhatsApp Koordinasi…')}
      />

      {/* shortcut Lapor Keluhan */}
      <CustomButton
        title="Laporkan Masalah / Keluhan Kos"
        icon="construct"
        type="report"
        block
        onPress={() => navigation.navigate('Lapor')}
      />

      {/* .qa : aksi cepat */}
      <View style={styles.qa}>
        {QUICK.map((q) => (
          <Pressable key={q.key} style={styles.qaBtn} onPress={() => setSheet(q.key)}>
            <View style={styles.qaIcon}>
              <Ionicons name={q.icon} size={20} color={colors.acc} />
            </View>
            <Txt style={{ fontSize: 11, fontWeight: '600' }}>{q.label}</Txt>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const sections = [
    { key: 'keluhan', title: 'Keluhan Saya', data: ownComplaints },
    { key: 'tagihan', title: 'Riwayat Tagihan', data: BILLS },
  ];

  return (
    <Screen>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 18, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={header}
        renderSectionHeader={({ section }) => (
          <CardHead>
            <Txt style={{ fontSize: 16, fontWeight: '700' }}>{section.title}</Txt>
          </CardHead>
        )}
        renderSectionFooter={() => <View style={{ height: 14 }} />}
        renderItem={({ item, index, section }) => {
          const isLast = index === section.data.length - 1;
          if (section.key === 'keluhan') {
            return (
              <CardRow isLast={isLast}>
                <View style={styles.rowBetween}>
                  <Txt style={{ flex: 1, fontWeight: '700' }}>{item.judul}</Txt>
                  <Badge text={item.status} tone={item.tone} />
                </View>
                <Txt style={styles.small}>{item.tanggal}</Txt>
                <View style={styles.steps}>
                  {[0, 1, 2, 3].map((n) => (
                    <View key={n} style={[styles.step, n < item.step && { backgroundColor: colors.acc }]} />
                  ))}
                </View>
              </CardRow>
            );
          }
          return (
            <CardRow isLast={isLast}>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1 }}>
                  <Txt>{item.bulan}</Txt>
                  <Txt style={styles.small}>{item.ket}</Txt>
                </View>
                <Badge text={item.status} tone={item.tone} />
              </View>
            </CardRow>
          );
        }}
      />

      <Popup visible={!!sheet} onClose={() => setSheet(null)}>
        {Sheet ? <Sheet onClose={() => setSheet(null)} /> : null}
      </Popup>
    </Screen>
  );
}

/* ---------- Tab "Info" (bottom navigation penghuni) : daftar pengumuman ---------- */
export function PengumumanScreen() {
  return (
    <Screen>
      <FlatList
        data={ANNOUNCEMENTS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 18, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ marginBottom: 14 }}>
            <Txt style={styles.h1}>Pengumuman</Txt>
            <Txt style={{ color: colors.mut, fontSize: 12 }}>Dari pengelola kos · contoh data</Txt>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <CustomCard>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Txt style={{ fontWeight: '700' }}>{item.judul}</Txt>
                <Txt style={styles.small}>{item.ket}</Txt>
              </View>
              <Badge text={item.label} tone={item.tone} />
            </View>
          </CustomCard>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 22, fontWeight: '700', letterSpacing: -0.4 },
  small: { color: colors.mut, fontSize: 12, marginTop: 2 },
  label: { fontSize: 12, fontWeight: '600', color: colors.mut, marginBottom: 4 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  li: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  liSep: { borderBottomWidth: 1, borderBottomColor: colors.bd },

  /* banner */
  banner: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#2563EB',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  circleA: { position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.12)' },
  circleB: { position: 'absolute', right: 40, bottom: -50, width: 110, height: 110, borderRadius: 55, backgroundColor: 'rgba(255,255,255,0.08)' },
  bannerSmall: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  big: { color: '#fff', fontSize: 42, lineHeight: 48, fontWeight: '700' },
  bar: { height: 8, borderRadius: 9, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden', marginTop: 14 },
  barFill: { height: '100%', backgroundColor: '#fff' },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  payChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.okb,
    borderRadius: 99,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  payDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.ok, marginRight: 5 },

  /* aksi cepat */
  qa: { flexDirection: 'row', gap: 8 },
  qaBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 2,
    backgroundColor: colors.surf,
    borderWidth: 1,
    borderColor: colors.bd,
    borderRadius: 16,
  },
  qaIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.accb, alignItems: 'center', justifyContent: 'center' },

  /* progres keluhan */
  steps: { flexDirection: 'row', gap: 4, marginTop: 8 },
  step: { flex: 1, height: 5, borderRadius: 9, backgroundColor: colors.bd },

  /* pop-up */
  sheetHead: { flexDirection: 'row', alignItems: 'center' },
  sheetSub: { color: colors.mut, fontSize: 12, marginTop: 6, lineHeight: 18 },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.acc,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.bg,
    borderRadius: 12,
    padding: 12,
  },
  drop: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.bd,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
  },
});
