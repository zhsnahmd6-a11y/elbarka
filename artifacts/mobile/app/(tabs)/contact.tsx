import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  Animated,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

const isNative = Platform.OS !== "web";

const MAPS_LINK = "https://maps.app.goo.gl/DL9HHqTGCJCQ8eoM8";

function ActionCard({
  icon,
  title,
  subtitle,
  accentColor,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: isNative }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: isNative }).start()}
    >
      <Animated.View style={[styles.actionCard, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={[Colors.navyCard, "#141E30"]}
          style={styles.actionCardInner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.actionIcon, { backgroundColor: accentColor + "22" }]}>
            {icon}
          </View>
          <View style={styles.actionTexts}>
            <Text style={styles.actionTitle}>{title}</Text>
            <Text style={styles.actionSub}>{subtitle}</Text>
          </View>
          <View style={[styles.actionArrow, { backgroundColor: accentColor + "22" }]}>
            <Feather name="arrow-left" size={18} color={accentColor} />
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const handleCall = (num: string) => Linking.openURL(`tel:${num}`);
  const handleWhatsApp = (num: string) => Linking.openURL(`https://wa.me/2${num}`);
  const handleMaps = () => Linking.openURL(MAPS_LINK);

  return (
    <View style={[styles.container, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <LinearGradient
        colors={[Colors.deepNavy, "#0D1525", Colors.navy]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <LinearGradient colors={[Colors.redAccent, "#8B1A12"]} style={styles.headerIconGrad}>
              <Feather name="phone" size={28} color={Colors.white} />
            </LinearGradient>
          </View>
          <Text style={styles.headerTitle}>تواصل معنا</Text>
          <Text style={styles.headerSub}>مطعم البركة · فرع النزهة</Text>
        </View>

        {/* 24h badge */}
        <View style={styles.badge24}>
          <MaterialCommunityIcons name="clock-check-outline" size={18} color={Colors.gold} />
          <Text style={styles.badge24Text}>مفتوح ٢٤ ساعة / ٧ أيام</Text>
        </View>

        {/* WhatsApp */}
        <Text style={styles.sectionLabel}>واتساب وطلبات</Text>
        <ActionCard
          icon={<MaterialCommunityIcons name="whatsapp" size={24} color="#25D366" />}
          title="واتساب"
          subtitle="01001803423"
          accentColor="#25D366"
          onPress={() => handleWhatsApp("01001803423")}
        />

        {/* Delivery */}
        <Text style={styles.sectionLabel}>خدمة التوصيل</Text>
        <ActionCard
          icon={<MaterialCommunityIcons name="moped" size={24} color="#4FC3F7" />}
          title="توصيل الطلبات"
          subtitle="01113179539"
          accentColor="#4FC3F7"
          onPress={() => handleCall("01113179539")}
        />
        <ActionCard
          icon={<Feather name="phone-call" size={22} color="#81C784" />}
          title="اتصال مباشر"
          subtitle="01113179539"
          accentColor="#81C784"
          onPress={() => handleCall("01113179539")}
        />

        {/* Management */}
        <Text style={styles.sectionLabel}>إدارة المطعم</Text>
        <ActionCard
          icon={<Feather name="settings" size={22} color={Colors.gold} />}
          title="الإدارة"
          subtitle="01111145290"
          accentColor={Colors.gold}
          onPress={() => handleCall("01111145290")}
        />

        {/* Maps */}
        <Text style={styles.sectionLabel}>الموقع</Text>
        <Pressable onPress={handleMaps}>
          <View style={styles.mapCard}>
            <LinearGradient
              colors={["#1A2A3A", "#0F1E2A"]}
              style={styles.mapCardInner}
            >
              <View style={styles.mapPlaceholder}>
                <MaterialCommunityIcons name="map-marker-radius" size={40} color={Colors.gold} />
                <Text style={styles.mapTitle}>اضغط لفتح الخريطة</Text>
                <Text style={styles.mapSub}>١٣٢ شارع النزهة · ميدان تريومف · مصر الجديدة</Text>
              </View>
              <View style={styles.mapOpenBtn}>
                <LinearGradient
                  colors={[Colors.gold, "#B8960C"]}
                  style={styles.mapOpenGrad}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <MaterialCommunityIcons name="map-marker" size={18} color={Colors.deepNavy} />
                  <Text style={styles.mapOpenText}>افتح في الخرائط</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          </View>
        </Pressable>

        {/* Address Card */}
        <View style={styles.addressCard}>
          <MaterialCommunityIcons name="map-marker-outline" size={20} color={Colors.gold} />
          <View style={styles.addressTexts}>
            <Text style={styles.addressAr}>١٣٢ شارع النزهة، ميدان تريومف، مصر الجديدة</Text>
            <Text style={styles.addressEn}>132 Al Nozha Street, Triumph Square, New Cairo</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.deepNavy },
  scroll: { paddingHorizontal: 20 },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.gold,
    marginBottom: 14,
  },
  headerIconGrad: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Cairo_900Black",
    color: Colors.white,
    textAlign: "center",
  },
  headerSub: {
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
    textAlign: "center",
    marginTop: 4,
  },
  badge24: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.gold + "22",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.gold + "55",
    marginBottom: 24,
  },
  badge24Text: {
    fontSize: 15,
    fontFamily: "Cairo_700Bold",
    color: Colors.gold,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
    color: Colors.whiteDim,
    textAlign: "right",
    marginBottom: 8,
    marginTop: 4,
  },
  actionCard: {
    marginBottom: 10,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  actionCardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTexts: { flex: 1, alignItems: "flex-end" },
  actionTitle: {
    fontSize: 17,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
  },
  actionSub: {
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
    direction: "ltr",
  },
  actionArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  mapCard: {
    marginBottom: 14,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.gold + "44",
  },
  mapCardInner: { padding: 20 },
  mapPlaceholder: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  mapTitle: {
    fontSize: 18,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
    textAlign: "center",
  },
  mapSub: {
    fontSize: 13,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
    textAlign: "center",
    lineHeight: 20,
  },
  mapOpenBtn: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 8,
  },
  mapOpenGrad: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
  },
  mapOpenText: {
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
    color: Colors.deepNavy,
  },
  addressCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.navyCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.navyBorder,
    alignItems: "flex-start",
  },
  addressTexts: { flex: 1, alignItems: "flex-end" },
  addressAr: {
    fontSize: 14,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.white,
    textAlign: "right",
    lineHeight: 22,
  },
  addressEn: {
    fontSize: 12,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
    textAlign: "right",
    marginTop: 4,
  },
});
